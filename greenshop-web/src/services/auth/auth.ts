import axios from 'axios';
import {
    LoginDTO,
    RegisterDTO,
    AuthResponse,
    ApiError,
    User,
} from './authTypes';

const API_BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const handleApiError = (error: any): ApiError => {
    if (error.response) {
        return error.response.data as ApiError;
    }
    return { message: error.message } as ApiError;
};

export const loginUser = async (dto: LoginDTO): Promise<AuthResponse | ApiError> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', dto);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const registerUser = async (dto: RegisterDTO): Promise<AuthResponse | ApiError> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/auth/register', dto);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};


export const logoutUser = async (): Promise<{ message: string } | ApiError> => {
    try {
        const response = await axiosInstance.post<{ message: string }>('/auth/logout');
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getCurrentUser = async (): Promise<User | ApiError> => {
    try {
        const response = await axiosInstance.get<User>('/auth/users');
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getAllUsers = async (): Promise<User[] | ApiError> => {
    try {
        const response = await axiosInstance.get<User[]>('/auth/users');
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getUserById = async (id: string): Promise<User | ApiError> => {
    if (!id) {
        throw new Error('ID is required');
    }
    try {
        const response = await axiosInstance.get<User>(`/auth/users/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
    if (!id) {
        throw new Error('ID is required');
    }
    try {
        const response = await axiosInstance.delete<{ message: string }>(`/auth/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteAllUsers = async (): Promise<{ message: string }> => {
    try {
        const response = await axiosInstance.delete<{ message: string }>('/auth/users');
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
    return passwordRegex.test(password);
};

export default axiosInstance;

