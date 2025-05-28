import { Dispatch, SetStateAction, ReactNode } from "react";

export interface ProductType {
  long_Description: string;
  name: string;
  short_Description: string;
  price: number;
  sale_Percent: number;
  sale_Percent_Private: number;
  image: string;
  category: string;
  tags: string;
  plantId: string;
}

export interface ProductProviderProps {
  children: ReactNode;
  product: ProductType;
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

export interface ProductReviewType {
  setIsAppear: Dispatch<SetStateAction<boolean>>;
}

export interface DetailsPersonalToolsType {
  id: number;
  alt: string;
  src: string;
}

export interface DetailsPersonalToolType {
  tool: DetailsPersonalToolsType;
  setIsActiveEdit: Dispatch<SetStateAction<boolean>>;
}

export interface DetailsCritiqueCommentsToolsProps {
  setIsActiveEdit: Dispatch<SetStateAction<boolean>>;
}
