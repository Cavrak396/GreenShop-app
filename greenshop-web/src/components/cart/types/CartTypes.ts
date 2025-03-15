export interface CartItemTypes {
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
  item: CartItemTypes;
  quantity: number;
  index: number;
  setQuantity: (index: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
}

export interface CartItemsListType {
  cartItems: CartItemTypes[];
  quantities: number[];
  setQuantity: (index: number, quantity: number) => void;
}
