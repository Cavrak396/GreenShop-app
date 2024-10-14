import { CategoriesTypes } from "../types/categoriesTypes";
import CategoryItem from "./CategoriesItem";

interface CategoriesListProps {
  categories: CategoriesTypes[];
  activeCategory: string | null;
  onCategoryClick: (label: string) => void;
}

function CategoriesList({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoriesListProps) {
  return (
    <ul className="homepageshop__categories-list">
      {categories.map((item) => {
        const isActive = item.label === activeCategory;
        return (
          <CategoryItem
            key={item.id}
            label={item.label}
            size={item.size}
            isActive={isActive}
            onClick={() => onCategoryClick(item.label)}
          />
        );
      })}
    </ul>
  );
}

export default CategoriesList;
