import rateStar from "../../../../assets/images/reusable/star.svg";
import LazyImage from "../../../../reusable/lazyImage/LazyImage";
import { useRatings } from "../../../../customHooks/useRating";
import { useComments } from "../../../../context/ReviewsContext";

function DetailsCritiqueRate() {
  const { ratingNumbers, comments } = useComments();
  const { avgRating } = useRatings(ratingNumbers || {});

  return (
    <div className="details__critique-rate" aria-live="polite">
      <LazyImage
        src={rateStar}
        alt="Rate this product"
        className="details__critique-rate-image"
        aria-label="Rating star icon"
      />
      <span
        className="details__critique-rate-stats"
        aria-describedby="rating-stat-description"
      >
        {Math.ceil(avgRating)}.0
      </span>
      <span
        className="details__critique-rate-number"
        id="rating-stat-description"
      >
        {comments.length} users rated this
      </span>
    </div>
  );
}

export default DetailsCritiqueRate;
