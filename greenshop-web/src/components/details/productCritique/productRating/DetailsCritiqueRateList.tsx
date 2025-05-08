import { useComments } from "../../../../context/ReviewsContext";
import ProgressBar from "../../../../reusable/progress/ProgressBar";
import { calculateRatingPercentages } from "../../utils/detailsUtils";

function DetailsCritiqueRateList() {
  const { ratingNumbers } = useComments();
  const ratingPercentages = calculateRatingPercentages(ratingNumbers || {});

  const sortedRatings = ratingPercentages.sort(
    (a, b) => b.percentage - a.percentage
  );

  return (
    <div className="details__rating-bars">
      {sortedRatings.map(({ rating, percentage }) => (
        <div key={rating} className="details__rating-bar-container">
          <ProgressBar
            percentage={percentage}
            rating={rating}
            className="details__rating-bar"
          />
        </div>
      ))}
    </div>
  );
}

export default DetailsCritiqueRateList;