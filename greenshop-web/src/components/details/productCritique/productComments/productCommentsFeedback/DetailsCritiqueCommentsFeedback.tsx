import { useComments } from "../../../../../context/ReviewsContext";
import StaticStars from "../../../../../reusable/stars/StaticStars";
import DetailsCritiqueCommentsForm from "./DetailsCritiqueCommentsForm";
import DetailsCritiqueCommentsStars from "./DetailsCritiqueCommentsStars";

function DetailsCritiqueCommentsFeedback() {
  const { userComment } = useComments();

  return (
    <div className="details__comments-feedback">
      {userComment ? (
        <StaticStars
          rate={userComment.rating}
          starClassName="details__comments-star"
          starPositionClassName="details__stars-line"
        />
      ) : (
        <DetailsCritiqueCommentsStars />
      )}
      <DetailsCritiqueCommentsForm />
    </div>
  );
}

export default DetailsCritiqueCommentsFeedback;
