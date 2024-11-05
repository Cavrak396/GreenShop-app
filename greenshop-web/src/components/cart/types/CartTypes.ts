export interface CartItem {
  id: number;
  label: string;
  price: number;
  sale?: number;
  src: string;
  alt: string;
  dateAdded: Date;
}

export interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  quantities: number[];
  setQuantities: React.Dispatch<React.SetStateAction<number[]>>;
  totalPrice: number;
  setQuantity: (index: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  addItemToCart: (newItem: CartItem) => void;
}

export interface CartTotalProps {
  totalPrice: number;
}

export interface CartItemInfoType {
  label: string;
  info: string | number;
}

export interface CartItemProps {
  item: CartItem;
  quantity: number;
  index: number;
  setQuantity: (index: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
}

export interface CartItemsListType {
  cartItems: CartItem[];
  quantities: number[];
  setQuantity: (index: number, quantity: number) => void;
}
