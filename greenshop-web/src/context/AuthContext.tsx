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
    const savedToken = sessionStorage.getItem("token");
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
      console.log(response);
      if (response.jwt) {
        setToken(response.jwt);
        sessionStorage.setItem("token", response.jwt);
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
        sessionStorage.setItem("token", response.jwt);
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
      sessionStorage.removeItem("token");
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
      sessionStorage.removeItem("token");
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

  const updateUserDetails = async (
    dto: UserDto
  ): Promise<{ success: true } | { success: false; message: string }> => {
    if (!token) {
      const message = "User not authenticated.";
      setError(message);
      return { success: false, message };
    }

    try {
      setLoading(true);
      const response = await updateUser(dto);

      if (response && "message" in response) {
        setError(response.message);
        return { success: false, message: response.message };
      }

      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          isSubscribed: dto.isSubscribed,
        };
      });

      return { success: true };
    } catch (err: any) {
      const message = err.message || "Failed to update user.";
      setError(message);
      return { success: false, message };
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
