import { comments } from "../../utils/detailsUtils";
import DetailsCritiqueCommentsItem from "./DetailsCritiqueCommentsItem";

function DetailsCritiqueCommentsList() {
  return (
    <ul className="details__comments-list">
      {comments.map((comment) => {
        return (
          <DetailsCritiqueCommentsItem key={comment.id} comment={comment} />
        );
      })}
    </ul>
  );
}

export default DetailsCritiqueCommentsList;
