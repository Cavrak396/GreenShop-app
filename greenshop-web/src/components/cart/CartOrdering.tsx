import Button from "../button/Button";
import CartTotal from "./CartTotal";
import { CartTotalProps } from "./types/CartTypes";

function CartOrdering({ totalPrice }: CartTotalProps) {
  return (
    <div className="cart__ordering">
      <span className="cart__ordering-tag">Total price:</span>
      <CartTotal totalPrice={totalPrice} />
      <div className="cart__ordering-buttons">
        <Button className="cart__ordering-button button">
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
}

export default CartOrdering;
