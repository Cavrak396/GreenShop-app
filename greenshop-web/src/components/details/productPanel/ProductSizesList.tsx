import { useState } from "react";
import { sizes } from "../utils/detailsUtils";
import ProductSizesItem from "./ProductSizesItem";

function ProductSizesList() {
  const [isActive, setIsActive] = useState<number>(1);

  return (
    <>
      <span className="details__product-sizes-tag">Sizes:</span>
      <ul className="details__product-sizes-list">
        {sizes.map((item) => (
          <ProductSizesItem
            item={item}
            key={item.id}
            isActive={isActive === item.id}
            setIsActive={setIsActive}
          />
        ))}
      </ul>
    </>
  );
}

export default ProductSizesList;
