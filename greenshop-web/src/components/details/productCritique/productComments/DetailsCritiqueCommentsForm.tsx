import React, { useRef } from "react";
import FormInput from "../../../../reusable/inputs/FormInput";
import Button from "../../../../reusable/button/Button";

function DetailsCritiqueCommentsForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      const commentValue = inputRef.current.value;
      console.log(commentValue);
    }
  };

  return (
    <form className="details__comments-form" onSubmit={handleSubmit}>
      <FormInput
        ref={inputRef}
        className="details__comments-input"
        placeholder="Leave your comment"
        type="text"
      />
      <Button
        type="submit"
        className="details__comments-button button"
        onClick={() => handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
}

export default DetailsCritiqueCommentsForm;
