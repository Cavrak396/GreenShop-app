import DetailsCritiqueRate from "./productRating/DetailsCritiqueRate";
import DetailsCritiqueRateResults from "./productRating/DetailsCritiqueRateResults";

function DetailsCritiqueUsertool() {
  return (
    <div className="details__critique-usertool">
      <div className="details__critique-average">
        <DetailsCritiqueRate />
        <DetailsCritiqueRateResults />
      </div>
    </div>
  );
}

export default DetailsCritiqueUsertool;
