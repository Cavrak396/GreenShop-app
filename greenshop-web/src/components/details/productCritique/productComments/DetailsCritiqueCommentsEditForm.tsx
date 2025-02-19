import { useState } from "react";
import { useParams } from "react-router-dom";
import { useComments } from "../../../../context/ReviewsContext";
import FormInput from "../../../../reusable/inputs/FormInput";
import Button from "../../../../reusable/button/Button";

function DetailsCritiqueCommentsEditForm() {
  const [editedComment, setEditedComment] = useState("");
  const { id } = useParams();
  const { updateComment } = useComments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && editedComment.trim()) {
      updateComment(id, editedComment, 5);
      setEditedComment("");
    }
  };

  return (
    <form className="details__comments-edit-form" onSubmit={handleSubmit}>
      <FormInput
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
        className="details__comments-edit-input"
        placeholder="Leave edited comment"
        type="text"
      />
      <Button type="submit" className="details__comments-edit-button but">
        Edit
      </Button>
    </form>
  );
}

export default DetailsCritiqueCommentsEditForm;
