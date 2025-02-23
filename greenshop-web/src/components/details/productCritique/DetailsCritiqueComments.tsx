import DetailsCritiqueCommentsList from "./productComments/DetailsCritiqueCommentsList";
import DetailsCritiqueCommentsPersonal from "./productComments/DetailsCritiqueCommentsPersonal";
import LoadingSpinner from "../../../reusable/LoadingSpinner/LoadingSpinner";
import DetailsCritiqueCommentsFeedback from "./productComments/productCommentsFeedback/DetailsCritiqueCommentsFeedback";
import { useUser } from "../../../context/AuthContext";
import { useComments } from "../../../context/ReviewsContext";

function DetailsCritiqueComments() {
  const { token } = useUser();
  const { comments, userComment, loading } = useComments();

  return (
    <div className="details__comments">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {token && <DetailsCritiqueCommentsFeedback />}
          {userComment && (
            <DetailsCritiqueCommentsPersonal comment={userComment} />
          )}
          <DetailsCritiqueCommentsList comments={comments} />
        </>
      )}
    </div>
  );
}

export default DetailsCritiqueComments;
