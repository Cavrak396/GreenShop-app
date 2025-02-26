import React, { useCallback, useMemo } from "react";
import FormInput from "../../reusable/inputs/FormInput";
import CartItemInfo from "./CartItemInfo";
import { CartItemProps } from "./types/cartTypes";
import Button from "../../reusable/button/Button";
import { useCart } from "../../context/CartContext";
import removeImg from "../../assets/images/cart/Delete.svg";

function CartItem({ item }: CartItemProps) {
  const { quantities, setQuantity, removeItem } = useCart();
  const quantity = quantities[item.id] || 1;

  const cartPrice = useMemo(() => {
    return item.sale ? item.price * (1 - item.sale / 100) : item.price;
  }, [item.price, item.sale]);

  const totalPrice = useMemo(() => {
    return (cartPrice * quantity).toFixed(2);
  }, [cartPrice, quantity]);

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Number(e.target.value));
      setQuantity(item.id, value);
    },
    [item.id, setQuantity]
  );
  const formattedDate = useMemo(() => {
    const dateAdded = new Date(item.dateAdded);
    return dateAdded instanceof Date && !isNaN(dateAdded.getTime())
      ? dateAdded.toLocaleDateString()
      : "Invalid Date";
  }, [item.dateAdded]);

  return (
    <li className="cart__list-item">
      <img
        src={item.src}
        alt={item.alt || `Image of ${item.label}`}
        className="cart__item-image"
      />
      <div className="cart__item-info">
        <CartItemInfo label={item.label} info={formattedDate} />
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
}

export default CartItem;
