import StaticStars from "../../../../reusable/stars/StaticStars";
import { Comment } from "../../../../context/types/reviewsTypes";

function DetailsCritiqueCommentsItem({ comment }: { comment: Comment }) {
  return (
    <li className="details__comments-comment">
      <span className="details__comments-username">{comment.userName}</span>
      <StaticStars
        rate={comment.rating}
        starClassName="details__comments-star"
        starPositionClassName="details__stars-line"
      />
      <p className="details__comments-text">{comment.comment}</p>
    </li>
  );
}

export default DetailsCritiqueCommentsItem;
