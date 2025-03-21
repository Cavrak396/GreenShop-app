import { CategoryItemProps } from "../types/categoriesTypes";

function CategoryItem({ label, size, isActive, onClick }: CategoryItemProps) {
  return (
    <li
      className={`homepageshop__categories-item ${
        isActive ? "categories-active" : ""
      }`}
      onClick={onClick}
    >
      <span className="homepageshop__categories-tag">{label}</span>
      <span className="homepageshop__categories-size">({size})</span>
    </li>
  );
}

export default CategoryItem;
