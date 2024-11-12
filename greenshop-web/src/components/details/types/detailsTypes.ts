import { FakeDataTypes } from "../../homepage-shop/shop/fakedata";

export interface ProductDescriptionType {
  className: string;
  text: string;
}

export interface ProductReviewType {
  productImage: string;
  setIsAppear: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SocialMediaType {
  id: number;
  alt: string;
  src: string;
}

export interface ButtonOrSizeType {
  id: number;
  text: string;
}

export interface ProductTypes {
  product: FakeDataTypes;
  item?: FakeDataTypes | SocialMediaType;
  productId?: number;
}

export interface ProductDetailsOrderButtonsProps {
  product: FakeDataTypes;
  quantity: number;
}

export interface ProductSizesItemProps {
  item: ButtonOrSizeType;
  isActive: boolean;
  setIsActive: (id: number) => void;
}

export interface DetailsInfoButtonsProps {
  activatedButtonId: number;
  handleButtonClick: (id: number) => void;
}

export interface DetailsInfoContentProps {
  activatedButtonId: number;
  product: FakeDataTypes;
}
