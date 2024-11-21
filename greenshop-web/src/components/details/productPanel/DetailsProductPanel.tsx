import React, { useMemo } from "react";
import DetailsProductDescription from "../DetailsProductDescription";
import ProductSizesList from "./ProductSizesList";
import DetailsQuantity from "./DetailsQuantity";
import DetailsOrderButtons from "./DetailsOrderButtons";
import DetailsSocialList from "./DetailsSocialList";
import Title from "../../../reusable/titles/Title";
import { useProduct } from "../../../context/ProductContext";

function DetailsProductPanel() {
  const product = useProduct();

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
        <DetailsQuantity />
        <DetailsOrderButtons />
      </div>
      <DetailsSocialList />
    </div>
  );
}

export default React.memo(DetailsProductPanel);
