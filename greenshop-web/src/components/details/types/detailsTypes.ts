import { ReactNode, Dispatch, SetStateAction } from 'react';
import { FakeDataTypes } from "../../homepage-shop/shop/fakedata";

export interface ProductProviderProps {
  children: ReactNode;
  product: FakeDataTypes;
}

export interface ProductDescriptionType {
  className: string;
  text: string;
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
}

export interface CommentsType {
  id: number;
  username: string;
  comment: string;
  rate: number;
}

export interface RatingsCountType {
  [key: number]: number;
}

export interface ProductReviewType {
  setIsAppear: Dispatch<SetStateAction<boolean>>;
}