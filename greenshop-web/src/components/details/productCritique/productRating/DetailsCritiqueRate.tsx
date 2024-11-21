import rateStar from "../../../../assets/images/reusable/star.svg";
import LazyImage from "../../../../reusable/LazyImage/LazyImage";
import { comments } from "../../utils/detailsUtils";
import { CommentsType } from "../../types/detailsTypes";
import { useMemo } from "react";

function DetailsCritiqueRate() {
  function calculateAverageRating(comments: CommentsType[]) {
    const totalRating = comments.reduce((acc, { rate }) => acc + rate, 0);
    return comments.length > 0 ? totalRating / comments.length : 0;
  }

  const avgRating = useMemo<number>(
    () => calculateAverageRating(comments),
    [comments]
  );

  return (
    <div className="details__critique-rate">
      <LazyImage
        src={rateStar}
        alt="rate start image"
        className="details__critique-rate-image"
      />
      <span className="details__critique-rate-stats">
        {avgRating.toFixed(1)}
      </span>
      <span className="details__critique-rate-number">
        {comments.length} users rated this
      </span>
    </div>
  );
}

export default DetailsCritiqueRate;
