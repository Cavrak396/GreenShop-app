import { createContext, useState, useContext, ReactNode } from "react";
import { subscribeToNewsletter } from "../services/subscribers/subscribers";
import { SubscriberContextType } from "./types/SubscriberTypes";
import { ApiError } from "../services/reusable/reusableTypes";

const SubscriberContext = createContext<SubscriberContextType | undefined>(
  undefined
);

export function SubscriberProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const subscribe = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await subscribeToNewsletter(email);

      if ("success" in response && response.success !== undefined) {
        return response;
      }

      return {
        success: false,
        message: response.message || "Something went wrong.",
      };
    } catch (err: any) {
      setError({ message: err.message });
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscriberContext.Provider
      value={{
        subscribe,
        loading,
        error,
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
}

export function useSubscriber() {
  const context = useContext(SubscriberContext);
  if (!context) {
    throw new Error(
      "useSubscriberContext must be used within a SubscriberProvider"
    );
  }
  return context;
}
