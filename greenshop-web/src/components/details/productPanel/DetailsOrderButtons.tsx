import { useState, useEffect, useCallback } from "react";
import { useCart } from "../../../context/CartContext";
import { useProduct } from "../../../context/ProductContext";
import { usePlants } from "../../../context/PlantsContext";
import { userButtons, createCartItem } from "../utils/detailsUtils";
import Button from "../../../reusable/button/Button";
import { CartItemTypes } from "../../cart/types/cartTypes";
import { toast } from "react-toastify";

function DetailsOrderButtons() {
  const product = useProduct();
  const { getShopImage } = usePlants();
  const { quantities, addItemToCart, cartItems } = useCart();
  const [isActive, setIsActive] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<string>("Add to cart");

  const quantity = quantities[product.plantId.toString()] || 1;

  const handleButtonClick = useCallback(
    (id: number, text: string) => {
      setIsActive(id);

      if (text === "Add to cart") {
        const dateAdded = new Date();
        const cartItem: CartItemTypes = createCartItem(
          product,
          getShopImage,
          dateAdded
        );
        addItemToCart(cartItem, quantity);
        setIsAdded("Added to cart");
      } else if (text === "Buy now") {
        toast.info(
          "Sorry, but my developers decided I don`t need to do anything 😄"
        );
      }
    },
    [addItemToCart, product, quantity, getShopImage]
  );

  useEffect(() => {
    const isInCart = cartItems.some(
      (item) => item?.id?.toString() === product.plantId
    );

    if (!isInCart) {
      setIsAdded("Add to cart");
    }
  }, [cartItems, product.plantId]);

  return (
    <div className="details__buttons">
      {userButtons.map(({ id, text }) => {
        const isCartButton = text === "Add to cart";
        const buttonLabel = isCartButton ? isAdded : text;
        const isPressed = isActive === id;

        return (
          <Button
            key={id}
            className={`details__order-button ${isPressed ? "button" : ""}`}
            onClick={() => handleButtonClick(id, text)}
            aria-label={buttonLabel}
            aria-pressed={isPressed ? "true" : "false"}
          >
            {buttonLabel}
          </Button>
        );
      })}
    </div>
  );
}

export default DetailsOrderButtons;
