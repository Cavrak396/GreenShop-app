import DetailsProductDescription from "../DetailsProductDescription";
import { DetailsInfoContentProps } from "../types/detailsTypes";
import DetailsUserReviews from "./ProductUserReviews";

function DetailsInfoContent({
  activatedButtonId,
  product,
}: DetailsInfoContentProps) {
  return (
    <>
      {activatedButtonId === 1 ? (
        <DetailsProductDescription
          className="details__product-description"
          text={product.description}
        />
      ) : (
        <DetailsUserReviews />
      )}
    </>
  );
}

export default DetailsInfoContent;
