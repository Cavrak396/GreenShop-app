import { detailsPersonalCommentTools } from "../../../utils/detailsUtils";
import DetailsCritiquesCommentsTool from "./DetailsCritiquesCommentsTool";

function DetailsCritiqueCommentsTools() {
  return (
    <ul className="details__comments-tools">
      {detailsPersonalCommentTools.map((tool) => {
        return <DetailsCritiquesCommentsTool tool={tool} />;
      })}
    </ul>
  );
}

export default DetailsCritiqueCommentsTools;
