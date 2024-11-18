import { FakeDataTypes } from "./fakedata";

export interface UserToolsType {
  src: string;
  id: number;
  alt: string;
  className: string;
}

export interface BarItemsTypes {
  id: number;
  label: string;
}

export interface HomePageShopBarProps {
  setSortedData: React.Dispatch<React.SetStateAction<FakeDataTypes[]>>;
}

export enum SortOptions {
  DEFAULT = "Default Sorting",
  LOW_PRICE = "Price Sorting - from lowest",
  HIGH_PRICE = "Price Sorting - from highest",
  NAME = "Name Sorting",
}

export interface HomePageShopArticleProps {
  isOnSale: boolean;
  newPrice: number;
  item: FakeDataTypes;
  userTools: UserToolsType[];
}

export interface HomePageShopArticlesProps {
  sortedData: FakeDataTypes[];
}

export interface HomePageShopSaleProps {
  sale: number | undefined;
}

export interface HomePageShopUserToolsProps {
  userTools: UserToolsType[];
  addItemToCart: (item: FakeDataTypes) => void;
  item: FakeDataTypes;
}

export interface HomePageShopPriceProps {
  isOnSale: boolean;
  newPrice: number;
  price: number;
}

export interface HomePageShopImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export interface HomePageShopDropdownProps {
  id: string;
  setActiveSort: React.Dispatch<React.SetStateAction<string>>;
  setActiveDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setSortedData: React.Dispatch<React.SetStateAction<FakeDataTypes[]>>;
}

export interface DropdownItemType {
  id: number;
  label: SortOptions;
}

export interface HomePageShopDropdownItemProps {
  item: DropdownItemType;
  handleSort: (label: SortOptions) => void;
}