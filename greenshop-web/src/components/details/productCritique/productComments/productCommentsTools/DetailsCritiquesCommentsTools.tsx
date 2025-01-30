import { detailsPersonalCommentTools } from "../../../utils/detailsUtils";
import Button from "../../../../../reusable/button/Button";

function DetailsCritiqueCommentsTools() {
  return (
    <ul className="details__comments-tools">
      {detailsPersonalCommentTools.map((tool) => {
        return (
          <Button className="details__comments-tool" key={tool.id}>
            <img
              src={tool.src}
              alt={tool.alt}
              className="details__comments-tool-image"
            />
          </Button>
        );
      })}
    </ul>
  );
}

export default DetailsCritiqueCommentsTools;
