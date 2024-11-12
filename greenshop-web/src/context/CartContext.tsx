import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { CartContextType, CartItem } from "../components/cart/types/CartTypes";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const totalPrice = useMemo(() => {
    return cartItems.reduce((accumulator, item) => {
      const quantity = quantities[item.id] || 1;
      const price = item.sale ? item.price * (1 - item.sale / 100) : item.price;
      return accumulator + price * quantity;
    }, 0);
  }, [cartItems, quantities]);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  }, []);

  const addItemToCart = useCallback((newItem: CartItem, quantity: number) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [newItem.id]: (prevQuantities[newItem.id] || 0) + quantity,
        }));
        return prevCartItems;
      } else {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [newItem.id]: quantity,
        }));
        return [...prevCartItems, newItem];
      }
    });
  }, []);

  const removeItem = useCallback((itemId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[itemId];
      return newQuantities;
    });
  }, []);

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
