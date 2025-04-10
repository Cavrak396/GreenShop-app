import { ApiError } from "../../services/reusable/reusableTypes";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    isSubscribed: boolean;
}

export interface AuthResponse {
    jwt: string | null;
    user: User | null;
}

export interface User {
    id?: string;
    name?: string;
    email?: string;
    profilePhoto?: string;
    userName?: string;
    userEmail?: string;
    isSubscribed?: boolean;
}

export interface UserDto {
    name?: string;
    email?: string;
    userName?: string;
    isSubscribed?: boolean;
}

export type UpdateUserResult =
    | { success: true }
    | { success: false; message: string };

export interface AuthContextProps {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (dto: LoginDTO) => Promise<AuthResponse | ApiError>;
    register: (dto: RegisterDTO) => Promise<AuthResponse | ApiError>;
    logout: () => void;
    deleteAccount: () => Promise<ApiError | { message: string }>;
    updateUserDetails: (dto: UserDto) => Promise<UpdateUserResult>;

    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
