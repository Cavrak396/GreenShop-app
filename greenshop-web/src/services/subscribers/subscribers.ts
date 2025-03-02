import axios from "axios";
import { ApiError } from "../reusable/reusableTypes";

const API_BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

const handleApiError = (error: any): ApiError => {
    if (error.response) {
        console.error("API Error Response:", error.response.data);
        return error.response.data as ApiError;
    } else if (error.request) {
        console.error("No response received from server:", error.request);
        return { message: "No response from the server. Please try again later." };
    } else {
        console.error("Unexpected Error:", error.message);
        return { message: error.message };
    }
};

export const getSubscribers = async (): Promise<any[] | ApiError> => {
    try {
        const response = await axiosInstance.get("/subscribers");
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const subscribeToNewsletter = async (
    email: string
): Promise<{ success: boolean; message: string } | ApiError> => {
    try {
        const response = await axiosInstance.post("/subscribers", {
            subscriberEmail: email,
        });

        console.log("Subscription response:", response);

        return {
            success: true,
            message: `Subscription successful! Welcome, ${response.data.subscriberEmail}`,
        };
    } catch (error) {
        const apiError = handleApiError(error);
        console.log("Error during subscription:", apiError);
        return apiError;
    }
};


export const deleteAllSubscribers = async (): Promise<ApiError | void> => {
    try {
        await axiosInstance.delete("/subscribers");
    } catch (error) {
        return handleApiError(error);
    }
};

export const deleteSubscriberById = async (
    subscriberId: string
): Promise<ApiError | void> => {
    try {
        if (!subscriberId) {
            return {
                message: "Bad Request: Subscriber ID is required.",
            } as ApiError;
        }

        await axiosInstance.delete(`/subscribers/${subscriberId}`);
    } catch (error) {
        return handleApiError(error);
    }
};

export default axiosInstance;
