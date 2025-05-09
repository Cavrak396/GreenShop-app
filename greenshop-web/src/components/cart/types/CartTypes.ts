export interface CartItemTypes {
  id: string;
  label: string;
  price: number;
  sale?: number;
  privateSale?: number;
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
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
}

export interface CartItemsListType {
  cartItems: CartItemTypes[];
  quantities: number[];
  setQuantity: (productId: string, quantity: number) => void;
}