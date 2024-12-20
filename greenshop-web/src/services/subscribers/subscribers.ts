import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SubscribeResponseType, SubscriberType } from "./subscribersTypes";

export const subscribeToNewsletter = async (email: string): Promise<SubscribeResponseType> => {
    try {
        const subscriberId = uuidv4();

        const existingSubscribers = await axios.get("http://localhost:8080/Subscribers", {
            withCredentials: false,
        });

        const isEmailAlreadySubscribed = existingSubscribers.data.some((subscriber: SubscriberType) => subscriber.subscriberEmail === email);

        if (isEmailAlreadySubscribed) {
            return {
                success: false,
                message: "This email is already subscribed.",
            };
        }

        const response = await axios.post(
            "http://localhost:8080/Subscribers",
            {
                subscriberId,
                subscriberEmail: email
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: false,
            }
        );

        return {
            success: true,
            message: `Subscription successful! Welcome, ${response.data.subscriberEmail}`,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 409) {
                    return {
                        success: false,
                        message: "This email is already subscribed.",
                    };
                }
                return {
                    success: false,
                    message: error.response.data.message || "An error occurred. Please try again.",
                };
            } else if (error.request) {
                return {
                    success: false,
                    message: "No response from server. Please try again later.",
                };
            }
        }

        return {
            success: false,
            message: "Failed to connect to the server. Please try again later.",
        };
    }
};