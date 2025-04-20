import { CartTotalProps } from "./types/cartTypes";

function CartTotal({ totalPrice }: CartTotalProps) {
  return (
    <div className="cart__ordering-total">
      <span className="cart__ordering-title">Total:</span>
      <span className="cart__ordering-price">{`${totalPrice.toFixed(
        2
      )}$`}</span>
    </div>
  );
}

export default CartTotal;