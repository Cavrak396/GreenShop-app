import { CartApiItemDto, CartDto } from "./cartTypes";
import { ApiError } from "../reusable/reusableTypes";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const handleApiError = (error: any): ApiError => {
    if (error.response) {
        console.error("API Error Response:", error.response.data);
        return error.response.data as ApiError;
    }
    console.error("Unexpected Error:", error.message);
    return { message: error.message } as ApiError;
};

export const syncCart = async (cartItems: CartApiItemDto[]): Promise<CartDto | ApiError> => {
    try {
        const response = await axiosInstance.post<CartDto>("/carts/sync", cartItems);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateCart = async (): Promise<CartDto | ApiError> => {
    try {
        const response = await axiosInstance.put<CartDto>("/carts");
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export default axiosInstance;