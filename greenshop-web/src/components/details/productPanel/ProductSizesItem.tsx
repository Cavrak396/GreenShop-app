import React from "react";
import Button from "../../button/Button";
import { ProductSizesItemProps } from "../types/detailsTypes";

function ProductSizesItem({
  item,
  isActive,
  setIsActive,
}: ProductSizesItemProps) {
  const handleButtonClick = () => {
    setIsActive(item.id);
  };

  return (
    <li className="details__product-sizes-item">
      <Button
        className={`details__product-sizes-size ${isActive ? "button" : ""}`}
        onClick={handleButtonClick}
      >
        {item.text}
      </Button>
    </li>
  );
}

export default React.memo(ProductSizesItem);
