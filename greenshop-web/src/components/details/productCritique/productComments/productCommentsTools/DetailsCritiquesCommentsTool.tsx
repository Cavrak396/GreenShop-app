import Button from "../../../../../reusable/button/Button";
import { DetailsPersonalToolType } from "../../../types/detailsTypes";
import { useParams } from "react-router-dom";
import { useComments } from "../../../../../context/ReviewsContext";

function DetailsCritiquesCommentsTool({
  tool,
  setIsActiveEdit,
}: DetailsPersonalToolType) {
  const { id } = useParams();
  const { removeComment } = useComments();

  async function handleToolAction() {
    if (tool.alt === "Delete" && id) {
      await removeComment(id);
    } else if (tool.alt === "Edit") {
      setIsActiveEdit((prev) => !prev);
    }
  }

  return (
    <Button
      className="details__comments-tool"
      key={tool.id}
      onClick={handleToolAction}
    >
      <img
        src={tool.src}
        alt={tool.alt}
        className="details__comments-tool-image"
      />
    </Button>
  );
}

export default DetailsCritiquesCommentsTool;
