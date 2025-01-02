import React, { createContext, useState, useContext } from "react";
import { loginUser, registerUser } from "../services/auth/auth";
import {
  AuthContextProps,
  LoginDTO,
  RegisterDTO,
  AuthResponse,
  User,
  ApiError,
} from "./types/authTypes";

const AuthContext = createContext<AuthContextProps | null>(null);

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (dto: LoginDTO): Promise<AuthResponse | ApiError> => {
    try {
      setLoading(true);
      const response = await loginUser(dto);
      setToken(response.jwt);
      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
      return { message: err.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    dto: RegisterDTO
  ): Promise<AuthResponse | ApiError> => {
    try {
      setLoading(true);
      const response = await registerUser(dto);
      return response;
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
      return { message: err.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        setUser,
        setToken,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
