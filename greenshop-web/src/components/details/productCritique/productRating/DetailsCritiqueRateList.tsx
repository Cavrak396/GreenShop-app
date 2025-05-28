import { useComments } from "../../../../context/ReviewsContext";
import ProgressBar from "../../../../reusable/progress/ProgressBar";
import { calculateRatingPercentages } from "../../utils/detailsUtils";

function DetailsCritiqueRateList() {
  const { ratingNumbers } = useComments();
  const percentages = calculateRatingPercentages(ratingNumbers || {});

  const allRatings = [5, 4, 3, 2, 1];

  return (
    <div className="details__rating-bars">
      {allRatings.map((rating) => {
        const match = percentages.find((p) => p.rating === rating);
        const percentage = match ? match.percentage : 0;

        return (
          <div key={rating} className="details__rating-bar-container">
            <ProgressBar
              percentage={percentage}
              rating={rating}
              className="details__rating-bar"
            />
          </div>
        );
      })}
    </div>
  );
}

export default DetailsCritiqueRateList;
