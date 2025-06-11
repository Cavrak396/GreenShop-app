import React from "react";
import { useProduct } from "../../context/ProductContext";
import { getProductDescriptions } from "./utils/detailsUtils";

function DetailsProductDescription({ shortDescription = false }) {
  const product = useProduct();

  if (shortDescription) {
    return (
      <div className="details__product-description-holder">
        <p className="details__product-description">
          {product.short_Description}
        </p>
      </div>
    );
  }

  const descriptions = getProductDescriptions(product);

  return (
    <div className="details__product-description-holder">
      {descriptions.map((desc, index) => (
        <React.Fragment key={index}>
          <span className="details__product-description-tag">{desc.label}</span>
          <p className="details__product-description">{desc.value}</p>
        </React.Fragment>
      ))}
    </div>
  );
}

export default React.memo(DetailsProductDescription);
