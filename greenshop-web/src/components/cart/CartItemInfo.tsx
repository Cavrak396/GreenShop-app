import React from "react";
import { CartItemInfoType } from "./types/cartTypes";
const CartItemInfo = React.memo(function CartItemInfo({
  label,
  info,
}: CartItemInfoType) {
  return (
    <div
      className={`cart__item-info-detail ${
        label === "Total" ? "cart__item-info-detail--responsive" : ""
      }`}
    >
      <span className="cart__item-label">{label}</span>
      <span className="cart__item-info-text">{info}</span>
    </div>
  );
});

export default CartItemInfo;
