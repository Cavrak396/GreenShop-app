import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../services/auth/auth";
import {
  AuthContextProps,
  LoginDTO,
  RegisterDTO,
  AuthResponse,
  ApiError,
  User,
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
      if (response.jwt) {
        setToken(response.jwt);
        localStorage.setItem("token", response.jwt);
        return response;
      } else {
        setError("Login failed.");
        return { message: "Login failed" };
      }
    } catch (err: any) {
      setError(err.message || "Login error.");
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
      if (response.jwt) {
        setToken(response.jwt);
        localStorage.setItem("token", response.jwt);
        return response;
      } else {
        setError("Registration failed.");
        return { message: "Registration failed" };
      }
    } catch (err: any) {
      setError(err.message || "Registration error.");
      return { message: err.message || "Registration failed" };
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
      setError(err.message || "Logout failed.");
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
