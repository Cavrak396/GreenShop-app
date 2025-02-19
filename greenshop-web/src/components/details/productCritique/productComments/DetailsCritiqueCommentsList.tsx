import DetailsCritiqueCommentsItem from "./DetailsCritiqueCommentsItem";
import { DetailsCritiqueCommentsListProps } from "../../../../context/types/reviewsTypes";
import ErrorMessage from "../../../../reusable/error/ErrorMessage";

function DetailsCritiqueCommentsList({
  comments,
}: DetailsCritiqueCommentsListProps) {
  return (
    <ul className="details__comments-list">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <DetailsCritiqueCommentsItem key={index} comment={comment} />
        ))
      ) : (
        <ErrorMessage
          className="details__comments-error"
          message="We have not found any comments for now..."
        />
      )}
    </ul>
  );
}

export default DetailsCritiqueCommentsList;
