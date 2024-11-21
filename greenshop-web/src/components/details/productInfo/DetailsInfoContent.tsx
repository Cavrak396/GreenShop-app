import { useProduct } from "../../../context/ProductContext";
import DetailsProductDescription from "../DetailsProductDescription";
import { DetailsInfoContentProps } from "../types/detailsTypes";
import DetailsCritique from "../productCritique/DetailsCritique";

function DetailsInfoContent({ activatedButtonId }: DetailsInfoContentProps) {
  const product = useProduct();

  return (
    <>
      {activatedButtonId === 1 ? (
        <DetailsProductDescription
          className="details__product-description"
          text={product.description}
        />
      ) : (
        <DetailsCritique />
      )}
    </>
  );
}

export default DetailsInfoContent;
