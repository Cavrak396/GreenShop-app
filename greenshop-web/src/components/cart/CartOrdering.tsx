import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/AuthContext";
import Button from "../../reusable/button/Button";
import CartTotal from "./CartTotal";
import Portal from "../../reusable/portal/Portal";
import AuthContent from "../authorization/AuthContent";
import { CartTotalProps } from "./types/cartTypes";
import { toast } from "react-toastify";

function CartOrdering({ totalPrice }: CartTotalProps) {
  const { purchase } = useCart();
  const { token } = useUser();
  const [isAppear, setIsAppear] = useState(false);

  const handlePurchase = async () => {
    try {
      await purchase();
      toast.success("Purchase completed successfully!");
    } catch (error) {
      toast.error("Something went wrong with your purchase.");
    }
  };

  return (
    <div className="cart__ordering">
      <span className="cart__ordering-tag">Total price:</span>
      <CartTotal totalPrice={totalPrice} />
      <div className="cart__ordering-buttons">
        {token ? (
          <Button
            className="cart__ordering-button button"
            onClick={handlePurchase}
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
