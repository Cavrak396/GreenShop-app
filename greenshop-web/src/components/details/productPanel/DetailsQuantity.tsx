import { useCart } from "../../../context/CartContext";
import Button from "../../../reusable/button/Button";
import { useProduct } from "../../../context/ProductContext";

function DetailsQuantity() {
  const product = useProduct();
  const { quantities, setQuantity } = useCart();
  const quantity = quantities[Number(product.id)] || 1;

  const handleDecrease = () => {
    setQuantity(Number(product.id), Math.max(1, quantity - 1));
  };

  const handleIncrease = () => {
    setQuantity(Number(product.id), quantity + 1);
  };

  return (
    <div className="details__quantity">
      <Button
        className="details__quantity-button button"
        onClick={handleDecrease}
      >
        -
      </Button>
      <span className="details__quantity-number">{quantity}</span>
      <Button
        className="details__quantity-button button"
        onClick={handleIncrease}
      >
        +
      </Button>
    </div>
  );
}

export default DetailsQuantity;
