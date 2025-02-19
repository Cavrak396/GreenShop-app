import { useProduct } from "../../../../context/ProductContext";
import { useComments } from "../../../../context/ReviewsContext";
import { useState } from "react";
import FormInput from "../../../../reusable/inputs/FormInput";
import Button from "../../../../reusable/button/Button";

function DetailsCritiqueCommentsForm() {
  const { plantId } = useProduct();
  const { addComment, userComment } = useComments();
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && !userComment) {
      addComment(plantId, comment, 5);
      setComment("");
    }
  };

  return (
    <form className="details__comments-form" onSubmit={handleSubmit}>
      <FormInput
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="details__comments-input"
        placeholder={
          userComment
            ? "You have already submitted a comment"
            : "Leave your comment"
        }
        type="text"
      />
      <Button
        type="submit"
        className="details__comments-button button"
        disabled={!!userComment}
      >
        {userComment ? "Submitted" : "Submit"}
      </Button>
    </form>
  );
}

export default DetailsCritiqueCommentsForm;
