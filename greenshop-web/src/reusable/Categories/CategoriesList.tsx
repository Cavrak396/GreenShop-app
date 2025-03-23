import { usePlants } from "../../context/PlantsContext";
import CategoryItem from "./CategoriesItem";
import { CategoriesListProps } from "../types/categoriesTypes";

function CategoriesList({
  categories,
  activeCategory,
  onCategoryClick,
  isSizeCategory,
}: CategoriesListProps) {
  const { categoriesData, plantsNumberBySize } = usePlants();

  return (
    <ul className="homepageshop__categories-list">
      {categories.map((item) => {
        let size = 0;
        if (!isSizeCategory) {
          size = categoriesData[item.label] || 0;
        } else {
          size = plantsNumberBySize[item.label] || 0;
        }

        return (
          <CategoryItem
            key={item.id}
            label={item.label}
            size={size}
            isActive={item.label === activeCategory}
            onClick={() => onCategoryClick(item.label)}
          />
        );
      })}
    </ul>
  );
}

export default CategoriesList;