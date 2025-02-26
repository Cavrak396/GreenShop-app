import { useCart } from "../../context/CartContext";
import Button from "../../reusable/button/Button";
import CartTotal from "./CartTotal";
import { CartTotalProps } from "./types/cartTypes";

function CartOrdering({ totalPrice }: CartTotalProps) {
  const { purchase } = useCart();

  return (
    <div className="cart__ordering">
      <span className="cart__ordering-tag">Total price:</span>
      <CartTotal totalPrice={totalPrice} />
      <div className="cart__ordering-buttons">
        <Button
          className="cart__ordering-button button"
          onClick={() => purchase()}
        >
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
}

export default CartOrdering;
