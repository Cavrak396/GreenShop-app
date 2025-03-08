import DetailsCritiqueCommentsList from "./productComments/DetailsCritiqueCommentsList";
import DetailsCritiqueCommentsPersonal from "./productComments/DetailsCritiqueCommentsPersonal";
import LoadingSpinner from "../../../reusable/LoadingSpinner/LoadingSpinner";
import DetailsCritiqueCommentsFeedback from "./productComments/productCommentsFeedback/DetailsCritiqueCommentsFeedback";
import { useUser } from "../../../context/AuthContext";
import { useComments } from "../../../context/ReviewsContext";
import Pagination from "../../../reusable/pagination/Pagination";

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
          {comments.length > 5 && (
            <Pagination
              totalItems={comments.length}
              itemsPerPage={5}
              // loadItems={loadPlants} first version, waiting for API
            />
          )}
        </>
      )}
    </div>
  );
}

export default DetailsCritiqueComments;
