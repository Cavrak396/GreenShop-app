export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    createdAt?: string;
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
