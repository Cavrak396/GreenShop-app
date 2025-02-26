export interface CartItem {
  id: number;
  label: string;
  price: number;
  sale?: number;
  src: string;
  alt: string;
  dateAdded: Date;
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
