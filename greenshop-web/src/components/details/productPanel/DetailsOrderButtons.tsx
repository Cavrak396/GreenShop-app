import { userButtons } from "../utils/detailsUtils";
import Button from "../../button/Button";
import { useCart } from "../../../context/CartContext";
import { useState, useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";

function DetailsOrderButtons() {
  const product = useProduct();
  const { quantities, addItemToCart, cartItems } = useCart();
  const [isActive, setIsActive] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<string>("Add to cart");

  const quantity = quantities[Number(product.id)] || 1;

  const handleButtonClick = (id: number, text: string) => {
    setIsActive(id);
    const dateAdded = new Date();
    const productWithDate = { ...product, dateAdded, alt: "Product image" };

    if (text === "Add to cart") {
      addItemToCart(productWithDate, quantity);
      setIsAdded("Added to cart");
    }
  };

  useEffect(() => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (!isInCart) {
      setIsAdded("Add to cart");
    }
  }, [cartItems, product.id]);

  return (
    <div className="details__buttons">
      {userButtons.map((button) => (
        <Button
          key={button.id}
          className={`details__order-button ${
            isActive === button.id ? "button" : ""
          }`}
          onClick={() => handleButtonClick(button.id, button.text)}
        >
          {button.text === "Add to cart" ? isAdded : button.text}
        </Button>
      ))}
    </div>
  );
}

export default DetailsOrderButtons;
