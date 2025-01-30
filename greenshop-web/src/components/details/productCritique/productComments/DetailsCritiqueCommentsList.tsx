import { useParams } from "react-router-dom";
import { useComments } from "../../../../context/ReviewsContext";
import { useEffect } from "react";
import DetailsCritiqueCommentsItem from "./DetailsCritiqueCommentsItem";

function DetailsCritiqueCommentsList() {
  const { id } = useParams();
  const { comments, loading, fetchComments } = useComments();

  useEffect(() => {
    if (id) {
      fetchComments(id);
    }
  }, [id, fetchComments]);

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