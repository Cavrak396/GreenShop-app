import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  createReview,
  getPlantReviews,
  getUserReview,
  deleteReview,
  updateReview,
} from "../services/reviews/reviews";
import { useUser } from "./AuthContext";
import { Comment, CommentsContextType, ReviewDto } from "./types/reviewsTypes";

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const fetchComments = useCallback(async (plantId: string) => {
    if (!plantId) return;

    setLoading(true);
    try {
      const data = await getPlantReviews(plantId);
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

  const fetchUserComment = useCallback(
    async (plantId: string) => {
      setLoading(true);
      try {
        const data = await getUserReview(plantId);
        if (data) {
          setUserComment({
            ...data,
            userName: data.userName ?? "",
            creationDate: data.creationDate ?? new Date().toISOString(),
          });
        } else {
          setUserComment(null);
        }
      } catch (error) {
        setUserComment(null);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const addComment = async (
    plantId: string,
    comment: string,
    rating: number
  ) => {
    if (!comment.trim() || !user) return;

    const reviewDto: ReviewDto = {
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
        await fetchUserComment(plantId);
      } else {
        console.error("Error adding comment:", response);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const updateComment = async (
    plantId: string,
    comment: string,
    rating: number
  ) => {
    if (!comment.trim() || !user) return;

    const reviewDto: ReviewDto = {
      plantId,
      comment,
      rating,
      userName: user.userName ?? "",
      creationDate: new Date().toISOString(),
    };
    try {
      await updateReview(plantId, reviewDto);
      await fetchComments(plantId);
      await fetchUserComment(plantId);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const removeComment = async (plantId: string): Promise<void> => {
    if (!user) return;

    try {
      const response = await deleteReview(plantId);
      if (response) {
        await fetchComments(plantId);
        setUserComment(null);
      } else {
        console.error("Error deleting comment:", response);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        userComment,
        loading,
        fetchComments,
        fetchUserComment,
        addComment,
        removeComment,
        updateComment,
      }}
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
