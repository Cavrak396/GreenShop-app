import { CartItem } from "../../components/cart/types/cartTypes";

export interface CartContextType {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    quantities: { [key: number]: number };
    setQuantities: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
    totalPrice: number;
    setQuantity: (productId: number, quantity: number) => void;
    removeItem: (itemId: number) => void;
    addItemToCart: (newItem: CartItem, quantity: number) => void;
    purchase: () => void;
}
