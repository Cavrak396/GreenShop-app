import StaticStars from "../../../../reusable/stars/StaticStars";
import DetailsCritiqueCommentsTools from "./productCommentsTools/DetailsCritiquesCommentsTools";
import { DetailsCritiqueCommentsPersonalProps } from "../../../../context/types/reviewsTypes";

function DetailsCritiqueCommentsPersonal({
  comment,
}: DetailsCritiqueCommentsPersonalProps) {
  if (!comment || !comment.userName || !comment.comment) {
    return <p>Invalid comment data</p>;
  }

  return (
    <div className="details__comments-personal">
      <DetailsCritiqueCommentsTools />
      <span className="details__comments-personal-name">
        {comment.userName}
      </span>
      <StaticStars
        rate={comment.rating}
        starClassName="details__comments-star"
        starPositionClassName="details__stars-line"
      />
      <p className="details__comments-personal-text">{comment.comment}</p>
    </div>
  );
}

export default DetailsCritiqueCommentsPersonal;