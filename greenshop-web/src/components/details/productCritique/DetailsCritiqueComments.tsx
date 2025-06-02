import { useEffect } from "react";
import DetailsCritiqueCommentsList from "./productComments/DetailsCritiqueCommentsList";
import DetailsCritiqueCommentsPersonal from "./productComments/DetailsCritiqueCommentsPersonal";
import LoadingSpinner from "../../../reusable/loadingSpinner/LoadingSpinner";
import DetailsCritiqueCommentsFeedback from "./productComments/productCommentsFeedback/DetailsCritiqueCommentsFeedback";
import { useUser } from "../../../context/AuthContext";
import { useComments } from "../../../context/ReviewsContext";
import { useParams } from "react-router-dom";
import ArrowPagination from "../../../reusable/pagination/arrows-pagination/ArrowPagination";

function DetailsCritiqueComments() {
  const { token } = useUser();
  const {
    comments,
    userComment,
    loading,
    fetchTotalNumberOfReviews,
    totalReviews,
  } = useComments();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTotalNumberOfReviews(id);
    }
  }, [id, totalReviews]);

  return (
    <div className="details__comments">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {token && <DetailsCritiqueCommentsFeedback />}
          {userComment && token && (
            <DetailsCritiqueCommentsPersonal comment={userComment} />
          )}
          <DetailsCritiqueCommentsList comments={comments} />
          {totalReviews != null && totalReviews > 3 && (
            <ArrowPagination className={"details"} />
          )}
        </>
      )}
    </div>
  );
}

export default DetailsCritiqueComments;