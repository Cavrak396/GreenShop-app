import React, { useMemo } from "react";
import DetailsProductDescription from "../DetailsProductDescription";
import ProductSizesList from "./ProductSizesList";
import DetailsQuantity from "./DetailsQuantity";
import DetailsOrderButtons from "./DetailsOrderButtons";
import DetailsSocialList from "./DetailsSocialList";
import Title from "../../../reusable/titles/Title";
import { useCart } from "../../../context/CartContext";
import { ProductTypes } from "../types/detailsTypes";

function DetailsProductPanel({ product }: ProductTypes) {
  const { quantities } = useCart();
  const productIndex = product.id;
  const quantity = quantities[productIndex] || 1;

  const calculatedSalePrice = useMemo(() => {
    return product.sale
      ? product.price * (1 - product.sale / 100)
      : product.price;
  }, [product]);

  return (
    <div className="details__product-panel">
      <Title className="details__product-title middle-title">
        {product.label}
      </Title>
      <div className="details__product--line">
        <span className="details__product-price">
          ${calculatedSalePrice.toFixed(2)}
        </span>
      </div>
      <div className="details__product-description">
        <span className="details__product-description-tag">
          Short Description:
        </span>
        <DetailsProductDescription
          className="details__product-description-text"
          text={product.description.slice(0, 215) + "..."}
        />
      </div>
      <ProductSizesList />
      <div className="details__product-line">
        <DetailsQuantity product={product} />
        <DetailsOrderButtons product={product} quantity={quantity} />
      </div>
      <DetailsSocialList />
    </div>
  );
}

export default React.memo(DetailsProductPanel);
