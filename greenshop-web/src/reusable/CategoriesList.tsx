import { CategoriesTypes } from "./types/categoriesTypes";

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
          <li
            className={`homepageshop__categories-item ${
              isActive ? "categories-active" : ""
            }`}
            key={item.id}
            onClick={() => onCategoryClick(item.label)}
          >
            <span className="homepageshop__categories-tag">{item.label}</span>
            <span className="homepageshop__categories-size">({item.size})</span>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoriesList;
