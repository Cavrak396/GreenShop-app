export interface CategoriesTypes {
  id: number;
  label: string;
  size: number;
}

export interface CategoriesListProps {
  categories: CategoriesTypes[];
  activeCategory: string | null;
  onCategoryClick: (label: string) => void;
}

export interface CategoryItemProps {
  label: string;
  size: number;
  isActive: boolean;
  onClick: () => void;
}

export type FilterType = "category" | "size";