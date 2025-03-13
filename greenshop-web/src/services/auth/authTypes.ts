export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    isSubscribed?: boolean;
}

export interface UserDTO {
    userName?: string;
    userEmail?: string;
    isSubscribed?: boolean;
}

export interface User {
    userName: string;
    userEmail: string;
    avatarUrl?: string;
    createdAt?: string;
    isSubscribed: boolean;
}

export interface AuthResponse {
    jwt: string;
    user: User;
}

export interface ApiError {
    message: string;
    code?: number;
    details?: string;
    [key: string]: any;
}
