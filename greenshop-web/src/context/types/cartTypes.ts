import { CartItemTypes } from "../../components/cart/types/cartTypes";

export interface CartContextType {
    cartItems: CartItemTypes[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItemTypes[]>>;
    quantities: { [key: number]: number };
    setQuantities: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
    totalPrice: number;
    setQuantity: (productId: number, quantity: number) => void;
    removeItem: (itemId: number) => void;
    addItemToCart: (newItem: CartItemTypes, quantity: number) => void;
    purchase: () => void;
}
