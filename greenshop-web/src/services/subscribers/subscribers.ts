import axios from "axios";
import { SubscribeApiResponse, SubscribeSuccessResponse } from "./subscribersTypes";
import { ApiError } from "../reusable/reusableTypes";

const API_BASE_URL = "https://localhost:7178";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

const handleApiError = (error: any): ApiError => {
    if (error.response) {
        if (error.response.status === 409) {
            return {
                message: "This account is already subscribed to our newsletter.",
            };
        }
        console.error("API Error Response:", error.response.data);
        return {
            message: error.response.data?.message || "Unexpected error from server.",
        };
    } else if (error.request) {
        console.error("No response received from server:", error.request);
        return { message: "No response from the server. Please try again later." };
    } else {
        console.error("Unexpected Error:", error.message);
        return { message: error.message };
    }
};

export const subscribeToNewsletter = async (
    email: string
): Promise<SubscribeSuccessResponse | ApiError> => {
    try {
        await axiosInstance.post<SubscribeApiResponse>("/subscribers", {
            subscriberEmail: email,
        });

        return {
            success: true,
            message: "Thanks for subscribing to our newsletter! 🎉",
        };

    } catch (error) {
        const apiError = handleApiError(error);
        console.error("Error during subscription:", apiError);
        return apiError;
    }
};