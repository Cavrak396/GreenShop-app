import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/AuthContext";
import Button from "../../reusable/button/Button";
import CartTotal from "./CartTotal";
import Portal from "../../reusable/portal/Portal";
import AuthContent from "../authorization/AuthContent";
import { CartTotalProps } from "./types/cartTypes";

function CartOrdering({ totalPrice }: CartTotalProps) {
  const { purchase } = useCart();
  const { token } = useUser();
  const [isAppear, setIsAppear] = useState(false);

  return (
    <div className="cart__ordering">
      <span className="cart__ordering-tag">Total price:</span>
      <CartTotal totalPrice={totalPrice} />
      <div className="cart__ordering-buttons">
        {token ? (
          <Button
            className="cart__ordering-button button"
            onClick={() => purchase()}
          >
            Complete Purchase
          </Button>
        ) : (
          <Button
            className="cart__ordering-button button"
            onClick={() => setIsAppear(true)}
          >
            Login for Purchase
          </Button>
        )}
      </div>

      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <AuthContent onLoginSuccess={() => setIsAppear(false)} />
        </Portal>
      )}
    </div>
  );
}

export default CartOrdering;
