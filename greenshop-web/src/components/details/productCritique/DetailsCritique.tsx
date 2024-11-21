import DetailsCritiqueUsertool from "./DetailsCritiqueUsertool";
import Title from "../../../reusable/titles/Title";
import DetailsCritiqueComments from "./DetailsCritiqueComments";

function DetailsCritique() {
  return (
    <div className="details__critique">
      <Title className="details__rating-title small-title">User Rating</Title>
      <div className="details__critique-line">
        <DetailsCritiqueUsertool />
        <DetailsCritiqueComments />
      </div>
    </div>
  );
}

export default DetailsCritique;
