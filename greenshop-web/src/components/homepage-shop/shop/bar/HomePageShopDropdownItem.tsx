import { HomePageShopDropdownItemProps} from "../shopTypes";


function HomePageShopDropdownItem({
  item,
  handleSort,
}: HomePageShopDropdownItemProps) {
  return (
    <li
      className="homepageshop__dropdown-item"
      onClick={() => handleSort(item.label)}
    >
      {item.label}
    </li>
  );
}

export default HomePageShopDropdownItem;
