import { useCallback } from "react";
import { ProductType, SortOptions } from "../../types/shopTypes";
import HomePageShopDropdownItem from "./HomePageShopDropdownItem";
import { HomePageShopDropdownProps } from "../../types/shopTypes";
import { dropdownItems } from "./utils/barUtils";
import { usePlants } from "../../../../context/PlantsContext";

const sortByPriceLowToHigh = (data: ProductType[]) =>
  data.slice().sort((a, b) => a.price - b.price);
const sortByPriceHighToLow = (data: ProductType[]) =>
  data.slice().sort((a, b) => b.price - a.price);
const sortByName = (data: ProductType[]) =>
  data.slice().sort((a, b) => a.name.localeCompare(b.name));

function HomePageShopDropdown({
  setActiveSort,
  setActiveDropdown,
}: HomePageShopDropdownProps) {
  const { setSortedData, sortedData, data } = usePlants();

  const handleSort = useCallback(
    (label: SortOptions) => {
      setActiveSort(label);
      setActiveDropdown(false);

      switch (label) {
        case SortOptions.LOW_PRICE:
          setSortedData(sortByPriceLowToHigh(sortedData));
          break;
        case SortOptions.HIGH_PRICE:
          setSortedData(sortByPriceHighToLow(sortedData));
          break;
        case SortOptions.NAME:
          setSortedData(sortByName(sortedData));
          break;
        case SortOptions.DEFAULT:
          setSortedData(data);
          break;
        default:
          console.warn(`Unhandled sort option: ${label}`);
          break;
      }
    },
    [setActiveSort, setActiveDropdown, setSortedData, sortedData, data]
  );

  return (
    <div className="homepageshop__dropdown">
      <ul className="homepageshop__dropdown-list">
        {dropdownItems.map((item) => (
          <HomePageShopDropdownItem
            key={item.id}
            item={item}
            handleSort={handleSort}
          />
        ))}
      </ul>
    </div>
  );
}

export default HomePageShopDropdown;
