export interface CartItemTypes {
  id: string;
  label: string;
  price: number;
  sale?: number;
  sale_Percent_Private: number;
  sale_Percent: number;
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