import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { CartContextType, CartItem } from "../components/cart/types/CartTypes";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((accumulator, item, index) => {
      const quantity = quantities[index] || 1;
      return (
        accumulator +
        (item.sale
          ? item.price * (1 - item.sale / 100) * quantity
          : item.price * quantity)
      );
    }, 0);
  }, [cartItems, quantities]);

  const setQuantity = useCallback((index: number, quantity: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = quantity;
      return newQuantities;
    });
  }, []);

  const removeItem = useCallback(
    (itemId: number) => {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== itemId)
      );

      setQuantities((prevQuantities) =>
        prevQuantities.filter(
          (_, idx) => idx < cartItems.length && cartItems[idx]?.id !== itemId
        )
      );
    },
    [cartItems]
  );

  const addItemToCart = useCallback((newItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.some((item) => item.id === newItem.id);
      if (existingItem) {
        return prevCartItems;
      } else {
        return [...prevCartItems, newItem];
      }
    });

    setQuantities((prevQuantities) => [...prevQuantities, 1]);
  }, []);

  useEffect(() => {
    setQuantities(Array(cartItems.length).fill(1));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        quantities,
        setQuantities,
        totalPrice,
        setQuantity,
        removeItem,
        addItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider!");
  }
  return context;
};
