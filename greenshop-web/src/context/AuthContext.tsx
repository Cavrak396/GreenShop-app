import { createContext, useState, useContext, useEffect } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  deleteUser,
  getCurrentUser,
  updateUser,
} from "../services/auth/auth";
import {
  AuthContextProps,
  LoginDTO,
  RegisterDTO,
  User,
  UserDto,
} from "./types/authTypes";
import { ApiError } from "../services/reusable/reusableTypes";

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

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await getCurrentUser();

      if ("message" in response) {
        const error: ApiError = { message: response.message };
        setError(error.message);
      } else {
        setUser(response as User);
        console.log(response);
      }
    } catch (err: any) {
      const error: ApiError = {
        message: err.message || "Failed to fetch current user.",
      };
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (dto: LoginDTO) => {
    try {
      setLoading(true);
      const response = await loginUser(dto);
      if (response.jwt) {
        setToken(response.jwt);
        localStorage.setItem("token", response.jwt);
        return response;
      } else {
        const error: ApiError = { message: "Login failed." };
        setError(error.message);
        return error;
      }
    } catch (err: any) {
      const error: ApiError = { message: err.message || "Login error." };
      setError(error.message);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (dto: RegisterDTO) => {
    try {
      setLoading(true);
      const response = await registerUser(dto);
      if (response.jwt) {
        setToken(response.jwt);
        localStorage.setItem("token", response.jwt);
        return response;
      } else {
        const error: ApiError = { message: "Registration failed." };
        setError(error.message);
        return error;
      }
    } catch (err: any) {
      const error: ApiError = { message: err.message || "Registration failed" };
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } catch (err: any) {
      const error: ApiError = { message: err.message || "Logout failed." };
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!token) {
      const error: ApiError = { message: "User not authenticated." };
      setError(error.message);
      return error;
    }

    try {
      setLoading(true);
      const response = await deleteUser();
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      return response;
    } catch (err: any) {
      const error: ApiError = {
        message: err.message || "Account deletion failed.",
      };
      setError(error.message);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserDetails = async (dto: UserDto) => {
    if (!token) {
      const error: ApiError = { message: "User not authenticated." };
      setError(error.message);
      return error;
    }

    try {
      setLoading(true);
      const response = await updateUser(dto);
      console.log(response);

      if (!response) {
        setError("No data returned from the server.");
        return { message: "No data returned from the server." } as ApiError;
      }

      if ("message" in response) {
        setError(response.message);
        return response;
      } else {
        setUser(response);
        return response;
      }
    } catch (err: any) {
      const error: ApiError = {
        message: err.message || "Failed to update user.",
      };
      setError(error.message);
      return error;
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
        updateUserDetails,
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