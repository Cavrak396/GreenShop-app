import { SortOptions, DropdownItemType } from "../shopTypes";

interface HomePageShopDropdownItemProps {
  item: DropdownItemType;
  handleSort: (label: SortOptions) => void;
}

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
