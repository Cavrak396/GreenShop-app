import magnifier from "../../assets/images/reusable/magnifier.png";
import { ProductReviewType } from "./types/detailsTypes";

function DetailsProductReview({
  productImage,
  setIsAppear,
}: ProductReviewType) {
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
          src={productImage}
          className="details__review-image"
          alt="product image"
        />
      </div>
    </div>
  );
}

export default DetailsProductReview;
