import StaticStars from "../../../../reusable/stars/StaticStars";
import DetailsCritiqueCommentsTools from "./productCommentsTools/DetailsCritiquesCommentsTools";
import { DetailsCritiqueCommentsPersonalProps } from "../../../../context/types/reviewsTypes";
import DetailsCritiqueCommentsEditForm from "./DetailsCritiqueCommentsEditForm";
import DetailsCritiqueCommentsStars from "./productCommentsFeedback/DetailsCritiqueCommentsStars";
import { useState } from "react";

function DetailsCritiqueCommentsPersonal({
  comment,
}: DetailsCritiqueCommentsPersonalProps) {
  const [isActiveEdit, setIsActiveEdit] = useState(false);

  return (
    <div className="details__comments-personal">
      <DetailsCritiqueCommentsTools setIsActiveEdit={setIsActiveEdit} />
      <span className="details__comments-personal-name">
        {comment.userName}
      </span>
      {isActiveEdit ? (
        <DetailsCritiqueCommentsStars />
      ) : (
        <StaticStars
          rate={comment.rating}
          starClassName="details__comments-star"
          starPositionClassName="details__stars-line"
        />
      )}
      {isActiveEdit && <DetailsCritiqueCommentsEditForm />}
      <p className="details__comments-personal-text">{comment.comment}</p>
    </div>
  );
}

export default DetailsCritiqueCommentsPersonal;