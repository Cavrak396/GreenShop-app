import { usePlants } from "../../context/PlantsContext";
import CategoryItem from "./CategoriesItem";
import { CategoriesListProps } from "../types/categoriesTypes";

function CategoriesList({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoriesListProps) {
  const { categoriesData } = usePlants();

  return (
    <ul className="homepageshop__categories-list">
      {categories.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.label}
          size={categoriesData[item.label] || 0}
          isActive={item.label === activeCategory}
          onClick={() => onCategoryClick(item.label)}
        />
      ))}
    </ul>
  );
}

export default CategoriesList;
