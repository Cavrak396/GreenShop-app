interface CategoryItemProps {
  label: string;
  size: number;
  isActive: boolean;
  onClick: () => void;
}

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
