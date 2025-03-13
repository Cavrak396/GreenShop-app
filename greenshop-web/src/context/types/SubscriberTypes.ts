import { ApiError } from "../../services/reusable/reusableTypes";

export interface SubscriberContextType {
    subscribe: (email: string) => Promise<any>;
    loading: boolean;
    error: ApiError | null;
}