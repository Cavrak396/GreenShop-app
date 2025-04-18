import React, { useCallback, useState, useMemo, useEffect } from "react";
import { CartItemTypes } from "../components/cart/types/cartTypes";
import { CartContextType } from "./types/cartTypes";
import { syncCart, updateCart } from "../services/cart/cart";
import { useUser } from "../context/AuthContext";
import { ApiError } from "../services/reusable/reusableTypes";

const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUser();
  const [cartItems, setCartItems] = useState<CartItemTypes[]>(
    getFromLocalStorage("cartItems")
  );
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    getFromLocalStorage("quantities")
  );

  const totalPrice = useMemo(() => {
    return cartItems.reduce((accumulator, item) => {
      const quantity = quantities[item.id.toString()] || 1;
      const price = item.sale ? item.price * (1 - item.sale / 100) : item.price;
      return accumulator + price * quantity;
    }, 0);
  }, [cartItems, quantities]);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities, [productId]: quantity };
      saveToLocalStorage("quantities", updatedQuantities);
      return updatedQuantities;
    });
  }, []);

  const addItemToCart = useCallback(
    (newItem: CartItemTypes, quantity: number) => {
      const itemId = newItem.id.toString();

      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(
          (item) => item.id === newItem.id
        );

        if (existingItemIndex !== -1) {
          setQuantities((prevQuantities) => {
            const updatedQuantities = {
              ...prevQuantities,
              [itemId]: (prevQuantities[itemId] || 0) + quantity,
            };
            saveToLocalStorage("quantities", updatedQuantities);
            return updatedQuantities;
          });
          return prevCartItems;
        } else {
          setQuantities((prevQuantities) => {
            const updatedQuantities = {
              ...prevQuantities,
              [itemId]: quantity,
            };
            saveToLocalStorage("quantities", updatedQuantities);
            return updatedQuantities;
          });
          const updatedCartItems = [...prevCartItems, newItem];
          saveToLocalStorage("cartItems", updatedCartItems);
          return updatedCartItems;
        }
      });
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item.id.toString() !== itemId
      );
      saveToLocalStorage("cartItems", updatedCartItems);
      return updatedCartItems;
    });

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId];
      saveToLocalStorage("quantities", updatedQuantities);
      return updatedQuantities;
    });
  }, []);

  const syncCartWithApi = useCallback(async () => {
    if (!token) return;

    const cartItemDtos = cartItems.map((item) => ({
      plantId: item.id,
      quantity: quantities[item.id.toString()] || 1,
    }));

    try {
      const response = await syncCart(cartItemDtos);

      if ("message" in response) {
        console.error("API error:", response.message);
      }
    } catch (error: any) {
      console.error("Error syncing cart:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else if (error.message) {
        console.error("Error message:", error.message);
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  }, [cartItems, quantities, token]);

  const purchase = useCallback(async () => {
    try {
      const response = await updateCart();
      if (response && (response as ApiError).message) {
        console.error((response as ApiError).message);
      } else {
        setCartItems([]);
        setQuantities({});
        saveToLocalStorage("cartItems", []);
        saveToLocalStorage("quantities", {});
      }
    } catch (error) {
      console.error("Error purchasing cart:", error);
    }
  }, []);

  useEffect(() => {
    if (token) {
      syncCartWithApi();
    }
  }, [cartItems, syncCartWithApi, token]);

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
        purchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider!");
  }
  return context;
};
