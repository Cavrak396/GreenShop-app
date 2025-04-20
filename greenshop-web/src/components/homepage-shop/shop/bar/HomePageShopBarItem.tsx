import { HomePageShopBarItemProps } from "../../types/shopTypes";

function HomePageShopBarItem({
  item,
  isActive,
  onItemClick,
}: HomePageShopBarItemProps) {
  return (
    <li
      className={`homepageshop__bar-item ${isActive ? "active" : ""}`}
      onClick={() => onItemClick(item)}
    >
      {item.label}
    </li>
  );
}

export default HomePageShopBarItem;
