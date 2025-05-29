import axios from 'axios';
import {
    LoginDTO,
    RegisterDTO,
    UserDTO,
    AuthResponse,
    ApiError,
    User,
} from './authTypes';
import { BASE_URL } from '../reusable/baseUrl';

const APPLICATION_KEY = import.meta.env.VITE_APPLICATION_KEY;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        ApplicationKey: APPLICATION_KEY,
    },
    withCredentials: true,
});

const handleApiError = (error: any): ApiError => {
    if (error.response) {
        return error.response.data as ApiError;
    }
    return { message: error.message } as ApiError;
};

export const loginUser = async (dto: LoginDTO): Promise<AuthResponse | ApiError> => {
    try {
        const response = await axiosInstance.post<AuthResponse>(
            '/users/login',
            dto,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const registerUser = async (dto: RegisterDTO): Promise<AuthResponse | ApiError> => {
    try {
        const response = await axiosInstance.post<AuthResponse>(
            '/users/register',
            dto,
            {
                withCredentials: false,
            }
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post(
            '/users/logout',
            null,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get<User>(
            '/users'
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteUser = async () => {
    try {
        const response = await axiosInstance.delete<{ message: string }>(
            '/users'
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getUsers = async (): Promise<User[] | ApiError> => {
    try {
        const response = await axiosInstance.get<User[]>(
            '/users/all',
            {
                withCredentials: false,
            }
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateUser = async (dto: UserDTO): Promise<void | ApiError> => {
    try {
        const response = await axiosInstance.put(
            `/users/${dto.isSubscribed}`,
            null,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};
