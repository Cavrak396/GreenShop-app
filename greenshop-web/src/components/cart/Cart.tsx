import CartItemsList from "./CartItemsList";
import CartOrdering from "./CartOrdering";
import { useCart } from "../../context/CartContext";
import ErrorMessage from "../error/ErrorMessage";
import Title from "../../reusable/titles/Title";
import "./cart.css";

function Cart() {
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="cart">
      <Title className="cart__title small-title"> Your Orders:</Title>
      {cartItems.length === 0 ? (
        <div className="cart__empty-products">
          <ErrorMessage
            className="cart__error-message"
            message="There are no products."
          />
        </div>
      ) : (
        <CartItemsList />
      )}
      <CartOrdering totalPrice={totalPrice} />
    </div>
  );
}

export default Cart;
