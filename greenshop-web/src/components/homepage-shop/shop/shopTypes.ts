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

export enum SortOptions {
  DEFAULT = "Default Sorting",
  LOW_PRICE = "Price Sorting - from lowest",
  HIGH_PRICE = "Price Sorting - from highest",
  NAME = "Name Sorting",
}

export interface DropdownItemType {
  id: number;
  label: SortOptions;
}
