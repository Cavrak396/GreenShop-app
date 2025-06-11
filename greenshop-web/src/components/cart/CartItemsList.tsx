import React from "react";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";

const CartItemsList = React.memo(function CartItemsList() {
  const { cartItems, quantities, setQuantity, removeItem } = useCart();

  return (
    <ul className="cart__list">
      {cartItems.map((item, index) => (
        <CartItem
          key={item.id}
          item={item}
          quantity={quantities[index]}
          index={index}
          setQuantity={setQuantity}
          removeItem={removeItem}
        />
      ))}
    </ul>
  );
});

export default CartItemsList;