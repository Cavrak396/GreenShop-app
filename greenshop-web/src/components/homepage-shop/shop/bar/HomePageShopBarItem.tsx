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
      {item.src ? (
        <img
          src={item.src}
          alt={item.label}
          className="homepageshop__bar-icon"
        />
      ) : (
        item.label
      )}
    </li>
  );
}

export default HomePageShopBarItem;
