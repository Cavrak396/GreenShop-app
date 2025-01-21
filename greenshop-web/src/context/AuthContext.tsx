import { createContext, useState, useContext, useEffect } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  deleteUser,
  getCurrentUser,
} from "../services/auth/auth";
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
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await getCurrentUser();
      console.log(response);

      if (response.message) {
        setError(response.message);
      } else {
        setUser(response);
      }
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (dto: LoginDTO): Promise<AuthResponse | ApiError> => {
    try {
      setLoading(true);
      const response = await loginUser(dto);
      if (response.jwt) {
        setToken(response.jwt);
        localStorage.setItem("token", response.jwt);
        fetchCurrentUser();
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

  const deleteAccount = async (): Promise<{ message: string } | ApiError> => {
    if (!token) {
      setError("User not authenticated.");
      return { message: "User not authenticated" };
    }

    try {
      setLoading(true);
      const response = await deleteUser(token);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      return response;
    } catch (err: any) {
      setError(err.message || "Account deletion failed.");
      return { message: err.message || "Account deletion failed" };
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
        deleteAccount,
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
