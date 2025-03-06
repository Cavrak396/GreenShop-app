import magnifier from "../../assets/images/reusable/magnifier.png";
import { ProductReviewType } from "./types/detailsTypes";
import LazyImage from "../../reusable/LazyImage/LazyImage";
import ProductImage from "../../assets/images/banner/banner-image.png";

function DetailsProductReview({ setIsAppear }: ProductReviewType) {
  function handleImageZoom() {
    setIsAppear((prev) => !prev);
  }

  return (
    <div className="details__review-container">
      <div
        className="details__review"
        onClick={handleImageZoom}
        role="button"
        aria-label="Zoom in to enlarge the image"
        aria-pressed="false"
      >
        <img
          src={magnifier}
          className="details__review-magnifier"
          alt="Magnifying glass icon for zooming"
        />
        <LazyImage
          src={ProductImage}
          className="details__review-image"
          alt="Product image"
        />
      </div>
    </div>
  );
}

export default DetailsProductReview;
