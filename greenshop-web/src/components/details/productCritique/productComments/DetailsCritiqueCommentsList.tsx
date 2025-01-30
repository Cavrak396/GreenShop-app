import DetailsCritiqueCommentsItem from "./DetailsCritiqueCommentsItem";
import { DetailsCritiqueCommentsListProps } from "../../../../context/types/reviewsTypes";

function DetailsCritiqueCommentsList({ comments, loading }: DetailsCritiqueCommentsListProps) {
  if (loading) return <p>Loading comments...</p>;

  return (
    <ul className="details__comments-list">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <DetailsCritiqueCommentsItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </ul>
  );
}

export default DetailsCritiqueCommentsList;
