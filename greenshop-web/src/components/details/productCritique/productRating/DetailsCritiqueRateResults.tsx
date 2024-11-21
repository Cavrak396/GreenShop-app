import Title from "../../../../reusable/titles/Title";
import DetailsCritiqueRateList from "./DetailsCritiqueRateList";

function DetailsCritiqueRateResults() {
  return (
    <div className="details__rating-breakdown">
      <Title className="details__rating-breakdown-title small-title">
        Rating Breakdown
      </Title>
      <DetailsCritiqueRateList />
    </div>
  );
}

export default DetailsCritiqueRateResults;
