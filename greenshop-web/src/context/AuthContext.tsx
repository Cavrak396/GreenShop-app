import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../services/auth/auth";
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
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (dto: LoginDTO): Promise<AuthResponse | ApiError> => {
    try {
      setLoading(true);
      const response = await loginUser(dto);
      setToken(response.jwt);
      setUser(response.user);
      localStorage.setItem("token", response.jwt);
      return response;
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
      return { message: err.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } catch (err: any) {
      setError(err.message || "An error occurred during logout.");
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

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout, // Dodato
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
