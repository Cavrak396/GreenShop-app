import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { createReview, getPlantReviews } from "../services/reviews/reviews";
import { useUser } from "./AuthContext";
import { Comment, CommentsContextType } from "./types/reviewsTypes";

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const fetchComments = useCallback(async (plantId: string) => {
    if (!plantId) return;

    setLoading(true);
    try {
      const data = await getPlantReviews(plantId);
      console.log("Fetched comments:", data);
      if (Array.isArray(data)) {
        const formattedComments: Comment[] = data.map((review) => ({
          ...review,
          userName: review.userName ?? "",
          creationDate: review.creationDate ?? new Date().toISOString(),
        }));
        setComments(formattedComments);
      } else {
        console.error("Invalid data received from API:", data);
        setComments([]);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = async (
    plantId: string,
    comment: string,
    rating: number
  ) => {
    if (!comment.trim() || !user) return;

    const reviewDto: Comment = {
      plantId,
      comment,
      rating,
      userName: user.userName ?? "",
      creationDate: new Date().toISOString(),
    };

    try {
      const response = await createReview(reviewDto);
      if (response) {
        await fetchComments(plantId);
      } else {
        console.error("Error adding comment:", response);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <CommentsContext.Provider
      value={{ comments, loading, fetchComments, addComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};
