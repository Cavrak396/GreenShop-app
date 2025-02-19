import DetailsCritiqueCommentsForm from "./productComments/DetailsCritiqueCommentsForm";
import DetailsCritiqueCommentsList from "./productComments/DetailsCritiqueCommentsList";
import DetailsCritiqueCommentsPersonal from "./productComments/DetailsCritiqueCommentsPersonal";
import { useUser } from "../../../context/AuthContext";
import { useComments } from "../../../context/ReviewsContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../reusable/LoadingSpinner/LoadingSpinner";

function DetailsCritiqueComments() {
  const { token } = useUser();
  const { id } = useParams();
  const { comments, userComment, loading, fetchComments, fetchUserComment } =
    useComments();

  useEffect(() => {
    if (id) {
      fetchComments(id);
      fetchUserComment(id);
    }
  }, [id, fetchComments, fetchUserComment]);

  return (
    <div className="details__comments">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {token && <DetailsCritiqueCommentsForm />}
          {userComment && userComment.comment && (
            <DetailsCritiqueCommentsPersonal comment={userComment} />
          )}
          <DetailsCritiqueCommentsList comments={comments} />
        </>
      )}
    </div>
  );
}

export default DetailsCritiqueComments;
