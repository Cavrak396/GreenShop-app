import { Dispatch, SetStateAction } from "react";

export interface ProductType {
  acquisition_Date: string;
  category: string;
  diningRoom_Description: string;
  image: string;
  livingRoom_Description: string;
  long_Description: string;
  short_Description: string;
  name: string;
  office_Description: string;
  plantId: string;
  price: number;
  sale_Percent: number;
  sale_Percent_Private: number;
  size: number;
  tags: string;
}

export interface UserToolsType {
  src: string;
  id: number;
  alt: string;
  className: string;
}

export interface BarItemsTypes {
  id: number;
  label: string;
  src?: string;
}

export interface HomePageShopBarProps {
  setSortedData: React.Dispatch<React.SetStateAction<ProductType[]>>;
  loadPlants: (params: PlantsParams) => void;
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
  totalSalePercent: number;
  item: ProductType;
  userTools: UserToolsType[];
}

export interface HomePageShopArticlesProps {
  sortedData: ProductType[];
}

export interface HomePageShopSaleProps {
  sale: number | undefined;
}

export interface HomePageShopUserToolsProps {
  userTools: UserToolsType[];
  addItemToCart: (item: ProductType) => void;
  item: ProductType;
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
}

export interface HomePageShopBarItemProps {
  item: BarItemsTypes;
  isActive: boolean;
  onItemClick: (item: BarItemsTypes) => void;
}

export interface DropdownItemType {
  id: number;
  label: SortOptions;
}

export interface HomePageShopDropdownItemProps {
  item: DropdownItemType;
  handleSort: (label: SortOptions) => void;
}

export interface PlantsParams {
  searchValue?: string;
  categoryValue?: string;
  sizeType?: string;
  group?: string;
  priceMin?: number;
  priceMax?: number;
  page: number;
  pageSize: number;
}

export interface ShopPagePropType {
  setCurrentShopPage: Dispatch<SetStateAction<number>>;
}