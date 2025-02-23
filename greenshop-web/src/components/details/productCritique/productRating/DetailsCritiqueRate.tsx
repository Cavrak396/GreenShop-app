import rateStar from "../../../../assets/images/reusable/star.svg";
import LazyImage from "../../../../reusable/LazyImage/LazyImage";
import { useRatings } from "../../../../customHooks/useRating";
import { useComments } from "../../../../context/ReviewsContext";

function DetailsCritiqueRate() {
  const { comments } = useComments();
  const { avgRating } = useRatings(comments);

  return (
    <div className="details__critique-rate">
      <LazyImage
        src={rateStar}
        alt="rate start image"
        className="details__critique-rate-image"
      />
      <span className="details__critique-rate-stats">
        {Math.ceil(avgRating)}.0
      </span>
      <span className="details__critique-rate-number">
        {comments.length} users rated this
      </span>
    </div>
  );
}

export default DetailsCritiqueRate;
