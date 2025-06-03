import { CartApiItemDto, CartDto } from "./cartTypes";
import { ApiError } from "../reusable/reusableTypes";
import { BASE_URL } from "../reusable/baseUrl";
import axios from "axios";

const APPLICATION_KEY = import.meta.env.VITE_APPLICATION_KEY;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        ApplicationKey: APPLICATION_KEY,
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
        const response = await axiosInstance.post<CartDto>("/carts", cartItems);
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

export const addCartItem = async (item: CartApiItemDto): Promise<null | ApiError> => {
    try {
        await axiosInstance.post("/cartitems", item);
        return null;
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteCartItem = async (plantId: string): Promise<null | ApiError> => {
    try {
        await axiosInstance.delete(`/cartitems/${plantId}`);
        return null;
    } catch (error) {
        return handleApiError(error);
    }
};

export default axiosInstance;
