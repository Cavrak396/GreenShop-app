import { CategoriesTypes } from "../../../../reusable/types/categoriesTypes";

export const categories: CategoriesTypes[] = [
  { id: 1, label: "House Plants", size: 33 },
  { id: 2, label: "Potter Plants", size: 12 },
  { id: 3, label: "Gardening", size: 13 },
];

export const categoriesSize: CategoriesTypes[] = [
  { id: 1, label: "Small", size: 33 },
  { id: 2, label: "Medium", size: 33 },
  { id: 3, label: "Large", size: 33 },
];

export const MIN_PRICE = 0;
export const MAX_PRICE = 300;

export const handleMinPriceChange = (newMin: number, maxPrice: number) => {
  return Math.min(newMin, maxPrice);
};

export const handleMaxPriceChange = (newMax: number, minPrice: number) => {
  return Math.max(newMax, minPrice);
};