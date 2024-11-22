import { useMemo } from "react";
import {
  calculateAverageRating,
  calculateRatingPercentages,
} from "../components/details/utils/detailsUtils";
import { CommentsType } from "../components/details/types/detailsTypes";

export function useRatings(comments: CommentsType[]) {
  const avgRating = useMemo(() => calculateAverageRating(comments), [comments]);

  const ratingPercentages = useMemo(
    () => calculateRatingPercentages(comments),
    [comments]
  );

  return { avgRating, ratingPercentages };
}
