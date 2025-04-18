import { CartItemTypes } from "../../components/cart/types/cartTypes";

export interface CartContextType {
    cartItems: CartItemTypes[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItemTypes[]>>;
    quantities: { [key: string]: number };
    setQuantities: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    totalPrice: number;
    setQuantity: (productId: string, quantity: number) => void;
    removeItem: (itemId: string) => void;
    addItemToCart: (newItem: CartItemTypes, quantity: number) => void;
    purchase: () => void;
}
