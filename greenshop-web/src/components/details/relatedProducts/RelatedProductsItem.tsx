import { useNavigate } from "react-router-dom";
import { usePlants } from "../../../context/PlantsContext";
import LazyImage from "../../../reusable/lazyImage/LazyImage";
import { usePrice } from "../../../customHooks/usePriceCalculator";
import { RelatedItemTypes } from "../types/detailsTypes";

function RelatedProductsItem({ item }: RelatedItemTypes) {
  const { getShopImage } = usePlants();
  const navigate = useNavigate();
  const { getPrice } = usePrice();

  const displayedPrice = getPrice(item);

  function handleProductClick() {
    navigate(`/details/${item.plantId}`);
  }

  return (
    <li className="details__related-products-item" onClick={handleProductClick}>
      <LazyImage
        src={getShopImage(item.image)}
        className="details__related-products-image"
        alt="related product image"
      />
      <span className="details__related-products-tag">{item.name}</span>
      <span className="details__related-products-price">
        ${displayedPrice.toFixed(2)}
      </span>
    </li>
  );
}

export default RelatedProductsItem;
