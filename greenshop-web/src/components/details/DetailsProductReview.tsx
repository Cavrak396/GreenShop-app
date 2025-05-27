import magnifier from "../../assets/images/reusable/magnifier.svg";
import { ProductReviewType } from "./types/detailsTypes";
import LazyImage from "../../reusable/lazyImage/LazyImage";
import { useProduct } from "../../context/ProductContext";
import { usePlants } from "../../context/PlantsContext";

function DetailsProductReview({ setIsAppear }: ProductReviewType) {
  function handleImageZoom() {
    setIsAppear((prev) => !prev);
  }
  const { getShopImage } = usePlants();
  const product = useProduct();

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
          src={getShopImage(product.image)}
          className="details__review-image"
          alt="Product image"
        />
      </div>
    </div>
  );
}

export default DetailsProductReview;
