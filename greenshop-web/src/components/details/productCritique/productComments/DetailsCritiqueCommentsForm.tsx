import { useProduct } from "../../../../context/ProductContext";
import { useComments } from "../../../../context/ReviewsContext";
import { useState } from "react";
import FormInput from "../../../../reusable/inputs/FormInput";
import Button from "../../../../reusable/button/Button";

function DetailsCritiqueCommentsForm() {
  const { plantId } = useProduct();
  const { addComment } = useComments();
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(plantId, comment, 5);
      setComment("");
    }
  };

  return (
    <div className="details__comments">
      <form className="details__comments-form" onSubmit={handleSubmit}>
        <FormInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="details__comments-input"
          placeholder="Leave your comment"
          type="text"
        />
        <Button type="submit" className="details__comments-button button">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default DetailsCritiqueCommentsForm;
