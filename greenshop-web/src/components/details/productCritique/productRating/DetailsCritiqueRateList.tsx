import { comments } from "../../utils/detailsUtils";
import ProgressBar from "../../../../reusable/progress/ProgressBar";
import { calculateRatingPercentages } from "../../utils/detailsUtils";

function DetailsCritiqueRateList() {
  const ratingPercentages = calculateRatingPercentages(comments);

  const sortedRatings = ratingPercentages.sort((a, b) => b.rating - a.rating);

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
