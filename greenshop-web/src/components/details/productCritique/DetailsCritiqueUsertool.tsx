import { useProduct } from "../../../context/ProductContext";
import Title from "../../../reusable/titles/Title";
import DetailsCritiqueRate from "./productRating/DetailsCritiqueRate";
import DetailsCritiqueRateResults from "./productRating/DetailsCritiqueRateResults";

function DetailsCritiqueUsertool() {
  const product = useProduct();

  return (
    <div className="details__critique-usertool">
      <Title className="details__critique-title middle-title">
        {product.label}
      </Title>
      <div className="details__critique-average">
        <DetailsCritiqueRate />
        <DetailsCritiqueRateResults />
      </div>
    </div>
  );
}

export default DetailsCritiqueUsertool;
