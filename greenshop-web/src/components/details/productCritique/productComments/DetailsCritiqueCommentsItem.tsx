import Stars from "../../../../reusable/stars/StaticStars";
import { CommentsType } from "../../types/detailsTypes";

function DetailsCritiqueCommentsItem({ comment }: { comment: CommentsType }) {
  return (
    <li className="details__comments-comment">
      <span className="details__comments-username">{comment.username}</span>
      <Stars
        rate={comment.rate}
        starClassName="details__comments-star"
        starPositionClassName="details__stars-line"
      />
      <p className="details__comments-text">{comment.comment}</p>
    </li>
  );
}

export default DetailsCritiqueCommentsItem;
