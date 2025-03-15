import { useMemo } from "react";
import { calculateAverageRating } from "../components/details/utils/detailsUtils";
import { Comment } from "../context/types/reviewsTypes";

export function useRatings(comments: Comment[]) {
  const avgRating = useMemo(() => {
    return comments.length ? calculateAverageRating(comments) : 0;
  }, [comments]);

  return { avgRating };
}
