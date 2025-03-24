import { useEffect } from "react";
import DetailsCritiqueCommentsList from "./productComments/DetailsCritiqueCommentsList";
import DetailsCritiqueCommentsPersonal from "./productComments/DetailsCritiqueCommentsPersonal";
import LoadingSpinner from "../../../reusable/LoadingSpinner/LoadingSpinner";
import DetailsCritiqueCommentsFeedback from "./productComments/productCommentsFeedback/DetailsCritiqueCommentsFeedback";
import { useUser } from "../../../context/AuthContext";
import { useComments } from "../../../context/ReviewsContext";
import Pagination from "../../../reusable/pagination/Pagination";
import { usePlants } from "../../../context/PlantsContext";
import { useParams } from "react-router-dom";

function DetailsCritiqueComments() {
  const { token } = useUser();
  const {
    comments,
    userComment,
    loading,
    fetchTotalNumberOfReviews,
    totalReviews,
  } = useComments();
  const { loadPlants } = usePlants();
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
          {userComment && (
            <DetailsCritiqueCommentsPersonal comment={userComment} />
          )}
          <DetailsCritiqueCommentsList comments={comments} />
          {totalReviews !== null && totalReviews > 5 && (
            <Pagination
              totalItems={totalReviews}
              itemsPerPage={5}
              loadItems={loadPlants}
            />
          )}
        </>
      )}
    </div>
  );
}

export default DetailsCritiqueComments;