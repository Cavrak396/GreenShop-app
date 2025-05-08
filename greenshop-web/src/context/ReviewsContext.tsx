import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useUser } from "./AuthContext";
import {
  createReview,
  getPlantReviews,
  getUserReview,
  deleteReview,
  updateReview,
  getTotalNumberOfReviews,
  getRatingNumbers,
} from "../services/reviews/reviews";
import { Comment, CommentsContextType, ReviewDto } from "./types/reviewsTypes";

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [currentCommentsPage, setCurrentCommentsPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const [ratingNumbers, setRatingNumbers] = useState<{
    [key: string]: number;
  } | null>(null);

  const { user } = useUser();

  const fetchComments = useCallback(
    async (plantId: string, page: number, pageSize: number) => {
      if (!plantId) return;

      setLoading(true);
      try {
        const data = await getPlantReviews(plantId, page, pageSize);
        await fetchRatingNumbers(plantId);
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
    },
    []
  );

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

  const fetchTotalNumberOfReviews = useCallback(async (plantId: string) => {
    if (!plantId) return;

    setLoading(true);
    try {
      const total = await getTotalNumberOfReviews(plantId);
      setTotalReviews(total);
    } catch (error) {
      console.error("Failed to fetch total number of reviews:", error);
      setTotalReviews(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRatingNumbers = useCallback(async (plantId: string) => {
    if (!plantId) return;

    setLoading(true);
    try {
      const data = await getRatingNumbers(plantId);
      setRatingNumbers(data);
    } catch (error) {
      console.error("Failed to fetch rating numbers:", error);
      setRatingNumbers(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = async (
    plantId: string,
    comment: string,
    rating: number
  ) => {
    if (rating <= 0 || !user) return;

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
        await fetchComments(plantId, currentCommentsPage, currentPageSize);
        await fetchUserComment(plantId);
        await fetchTotalNumberOfReviews(plantId);
        await fetchRatingNumbers(plantId);
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
    if (rating <= 0 || !user) return;

    const reviewDto: ReviewDto = {
      plantId,
      comment,
      rating,
      userName: user.userName ?? "",
      creationDate: new Date().toISOString(),
    };

    try {
      await updateReview(plantId, reviewDto);
      await fetchComments(plantId, currentCommentsPage, currentPageSize);
      await fetchUserComment(plantId);
      await fetchTotalNumberOfReviews(plantId);
      await fetchRatingNumbers(plantId);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const removeComment = async (plantId: string): Promise<void> => {
    if (!user) return;

    try {
      await deleteReview(plantId);
      await fetchComments(plantId, currentCommentsPage, currentPageSize);
      setUserComment(null);
      setRating(0);
      await fetchTotalNumberOfReviews(plantId);
      await fetchRatingNumbers(plantId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const changeRating = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        userComment,
        loading,
        rating,
        totalReviews,
        ratingNumbers,
        changeRating,
        fetchComments,
        fetchUserComment,
        fetchTotalNumberOfReviews,
        fetchRatingNumbers,
        addComment,
        removeComment,
        updateComment,
        currentCommentsPage,
        currentPageSize,
        setCurrentCommentsPage,
        setCurrentPageSize,
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
