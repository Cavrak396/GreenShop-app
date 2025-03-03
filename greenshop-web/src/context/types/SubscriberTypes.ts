import { ApiError } from "../../services/reusable/reusableTypes";

export interface SubscriberContextType {
    subscribe: (email: string) => Promise<any>;
    unsubscribe: () => void;
    loading: boolean;
    error: ApiError | null;
    fetchSubscribers: () => void;
}