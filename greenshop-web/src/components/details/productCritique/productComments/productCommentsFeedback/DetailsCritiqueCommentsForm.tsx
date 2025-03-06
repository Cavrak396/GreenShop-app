import { useState } from "react";
import { useProduct } from "../../../../../context/ProductContext";
import { useComments } from "../../../../../context/ReviewsContext";
import FormInput from "../../../../../reusable/inputs/FormInput";
import Button from "../../../../../reusable/button/Button";
import AccessibiltyText from "../../../../../reusable/accessibility-text/AccessibilityText";

function DetailsCritiqueCommentsForm() {
  const { plantId } = useProduct();
  const { addComment, userComment, rating } = useComments();
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating) {
      addComment(plantId, comment, rating);
      setComment("");
    }
  };

  return (
    <form
      className="details__comments-form"
      onSubmit={handleSubmit}
      aria-labelledby="comment-form"
      aria-live="polite"
    >
      <AccessibiltyText id="comment-form" text="leave your comment review" />
      <FormInput
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="details__comments-input"
        aria-label="Comment input field"
        aria-describedby="comment-input-description"
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
        aria-label="Submit comment"
        disabled={!!userComment || !rating}
      >
        {userComment ? "Submitted" : "Submit"}
      </Button>
    </form>
  );
}

export default DetailsCritiqueCommentsForm;
