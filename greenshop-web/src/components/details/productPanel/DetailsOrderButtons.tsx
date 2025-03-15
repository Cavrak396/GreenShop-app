import { userButtons } from "../utils/detailsUtils";
import Button from "../../../reusable/button/Button";
import { useCart } from "../../../context/CartContext";
import { useState, useEffect, useCallback } from "react";
import { useProduct } from "../../../context/ProductContext";
import { createCartItem } from "../utils/detailsUtils";

function DetailsOrderButtons() {
  const product = useProduct();
  const { quantities, addItemToCart, cartItems } = useCart();
  const [isActive, setIsActive] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<string>("Add to cart");

  const quantity = quantities[Number(product.plantId)] || 1;

  const handleButtonClick = useCallback(
    (id: number, text: string) => {
      setIsActive(id);
      const dateAdded = new Date();
      const productWithDate = createCartItem(product, dateAdded);

      if (text === "Add to cart") {
        addItemToCart(productWithDate, quantity);
        setIsAdded("Added to cart");
      }
    },
    [addItemToCart, product, quantity]
  );

  useEffect(() => {
    const isInCart = cartItems.some(
      (item) => item.id.toString() === product.plantId
    );
    if (!isInCart) {
      setIsAdded("Add to cart");
    }
  }, [cartItems, product.plantId]);

  return (
    <div className="details__buttons">
      {userButtons.map((button) => (
        <Button
          key={button.id}
          className={`details__order-button ${
            isActive === button.id ? "button" : ""
          }`}
          onClick={() => handleButtonClick(button.id, button.text)}
          aria-label={button.text === "Add to cart" ? isAdded : button.text}
          aria-pressed={isActive === button.id ? "true" : "false"}
        >
          {button.text === "Add to cart" ? isAdded : button.text}
        </Button>
      ))}
    </div>
  );
}

export default DetailsOrderButtons;
