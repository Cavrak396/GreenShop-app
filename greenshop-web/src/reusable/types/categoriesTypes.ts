export interface CategoriesTypes {
  id: number;
  label: string;
}

export interface CategoriesListProps {
  categories: CategoriesTypes[];
  activeCategory: string | null;
  onCategoryClick: (label: string) => void;
  isSizeCategory: boolean;
}

export interface CategoryItemProps {
  label: string;
  size: number;
  isActive: boolean;
  onClick: () => void;
}

export type FilterType = "category" | "size";