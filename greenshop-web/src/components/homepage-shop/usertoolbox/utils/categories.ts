import { CategoriesTypes } from "../../../../reusable/types/categoriesTypes";

export const categories: CategoriesTypes[] = [
  { id: 1, label: "House Plants" },
  { id: 2, label: "Potter Plants" },
  { id: 3, label: "Gardening" },
];

export const categoriesSize: CategoriesTypes[] = [
  { id: 1, label: "small" },
  { id: 2, label: "medium" },
  { id: 3, label: "large" },
];

export const MIN_PRICE = 0;
export const MAX_PRICE = 300;

export const handleMinPriceChange = (newMin: number, maxPrice: number) => {
  return Math.min(newMin, maxPrice);
};

export const handleMaxPriceChange = (newMax: number, minPrice: number) => {
  return Math.max(newMax, minPrice);
};