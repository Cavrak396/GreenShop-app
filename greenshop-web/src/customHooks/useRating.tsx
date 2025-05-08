import { useMemo } from "react";

export function useRatings(ratingNumbers: { [key: number]: number }) {
  const avgRating = useMemo(() => {
    const totalRatings = Object.keys(ratingNumbers).reduce((total, rating) => {
      return total + parseInt(rating) * ratingNumbers[parseInt(rating)];
    }, 0);

    const totalVotes = Object.values(ratingNumbers).reduce(
      (total, count) => total + count,
      0
    );

    return totalVotes ? totalRatings / totalVotes : 0;
  }, [ratingNumbers]);

  return { avgRating };
}
