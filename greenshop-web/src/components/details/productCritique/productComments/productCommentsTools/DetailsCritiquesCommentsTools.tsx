import { detailsPersonalCommentTools } from "../../../utils/detailsUtils";
import DetailsCritiquesCommentsTool from "./DetailsCritiquesCommentsTool";
import { DetailsCritiqueCommentsToolsProps } from "../../../types/detailsTypes";

function DetailsCritiqueCommentsTools({
  setIsActiveEdit,
}: DetailsCritiqueCommentsToolsProps) {
  return (
    <ul className="details__comments-tools">
      {detailsPersonalCommentTools.map((tool) => {
        return (
          <DetailsCritiquesCommentsTool
            key={tool.id}
            tool={tool}
            setIsActiveEdit={setIsActiveEdit}
          />
        );
      })}
    </ul>
  );
}

export default DetailsCritiqueCommentsTools;
