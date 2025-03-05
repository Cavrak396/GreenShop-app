import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  getSubscribers,
  subscribeToNewsletter,
  deleteSubscriberById,
} from "../services/subscribers/subscribers";
import { SubscriberContextType } from "./types/SubscriberTypes";
import { ApiError } from "../services/reusable/reusableTypes";
import { useUser } from "./AuthContext";

const SubscriberContext = createContext<SubscriberContextType | undefined>(
  undefined
);

export function SubscriberProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);
  const [subscriberId, setSubscriberId] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user?.userEmail) {
      fetchSubscribers();
    }
  }, [user]);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSubscribers();
      console.log(response);
      if (Array.isArray(response)) {
        const matchedSubscriber = response.find(
          (subscriber) => subscriber.subscriberEmail === user?.userEmail
        );
        if (matchedSubscriber) {
          setSubscriberId(matchedSubscriber.subscriberId);
        }
      } else {
        setError(response);
      }
    } catch (err) {
      setError({ message: "Error loading subscribers." });
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await subscribeToNewsletter(email);
      if (response && response.success !== undefined) {
        return response;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: any) {
      setError({ message: err.message });
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    if (!subscriberId) {
      setError({ message: "No subscriber ID found." });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteSubscriberById(subscriberId);
      setSubscriberId(null);
      fetchSubscribers();
    } catch (err) {
      setError({ message: "Error unsubscribing." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscriberContext.Provider
      value={{
        subscribe,
        unsubscribe,
        loading,
        error,
        fetchSubscribers,
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