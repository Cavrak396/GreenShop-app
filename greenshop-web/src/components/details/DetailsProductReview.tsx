import magnifier from "../../assets/images/reusable/magnifier.png";
import { ProductReviewType } from "./types/detailsTypes";
import { useProduct } from "../../context/ProductContext";

function DetailsProductReview({ setIsAppear }: ProductReviewType) {
  const product = useProduct();

  function handleImageZoom() {
    setIsAppear((prev) => !prev);
  }

  return (
    <div className="details__review-container">
      <div className="details__review" onClick={handleImageZoom}>
        <img
          src={magnifier}
          className="details__review-magnifier"
          alt="magnifier"
        />
        <img
          src={product.src}
          className="details__review-image"
          alt="product image"
        />
      </div>
    </div>
  );
}

export default DetailsProductReview;
