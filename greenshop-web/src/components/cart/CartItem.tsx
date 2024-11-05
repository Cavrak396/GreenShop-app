import React from "react";
import FormInput from "../../reusable/inputs/FormInput";
import CartItemInfo from "./CartItemInfo";
import { CartItemProps } from "./types/CartTypes";
import Button from "../button/Button";
import removeImg from "../../assets/images/cart/Delete.svg";

const CartItem = React.memo(function CartItem({
  item,
  quantity,
  index,
  setQuantity,
  removeItem,
}: CartItemProps) {
  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(index, value);
  }

  const cartPrice = item.sale ? item.price * (1 - item.sale / 100) : item.price;
  const totalPrice = (cartPrice * quantity).toFixed(2);

  return (
    <li className="cart__list-item">
      <img src={item.src} alt={item.alt} className="cart__item-image" />
      <div className="cart__item-info">
        <CartItemInfo
          label={item.label}
          info={item.dateAdded.toLocaleDateString()}
        />
        <CartItemInfo label="Price" info={`$${cartPrice.toFixed(2)}`} />
        <div className="cart__item-info-detail">
          <span className="cart__item-label">Quantity</span>
          <FormInput
            type="number"
            min="1"
            className="cart__item-quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <CartItemInfo label="Total" info={`$${totalPrice}`} />
        <Button
          className="cart__item-remove"
          onClick={() => removeItem(item.id)}
        >
          <img
            src={removeImg}
            className="cart__item-remove-image"
            alt="remove image"
          />
        </Button>
      </div>
    </li>
  );
});

export default CartItem;
