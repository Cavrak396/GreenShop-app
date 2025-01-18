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
        const response = await axiosInstance.post<AuthResponse>('/auth/login', dto, {
            withCredentials: false,
        });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const registerUser = async (dto: RegisterDTO): Promise<AuthResponse | ApiError> => {
    try {
        console.log('Registering user with data:', dto);
        const response = await axiosInstance.post<AuthResponse>('/auth/register', dto, {
            withCredentials: false,
        });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        return handleApiError(error);
    }
};

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post('/auth/logout', null, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getCurrentUser = async (): Promise<User | ApiError> => {
    try {
        const response = await axiosInstance.get<User>('/auth/user', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteUser = async (): Promise<{ message: string } | ApiError> => {
    try {
        const response = await axiosInstance.delete<{ message: string }>('/auth/user', {
            withCredentials: true,
        });
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

export const getUsers = async (): Promise<User[] | ApiError> => {
    try {
        const response = await axiosInstance.get<User[]>('/auth/users', {
            withCredentials: false,
        });
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
