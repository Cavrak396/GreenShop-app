import DetailsCritiqueCommentsForm from "./productComments/DetailsCritiqueCommentsForm";
import DetailsCritiqueCommentsList from "./productComments/DetailsCritiqueCommentsList";
import { useUser } from "../../../context/AuthContext";

function DetailsCritiqueComments() {
  const { token } = useUser();

  return (
    <div className="details__comments">
      {token && <DetailsCritiqueCommentsForm />}
      <DetailsCritiqueCommentsList />
    </div>
  );
}

export default DetailsCritiqueComments;
