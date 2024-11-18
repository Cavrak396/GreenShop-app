import { useCallback } from "react";
import { FakeDataTypes } from "../fakedata";
import { SortOptions } from "../shopTypes";
import fakeData from "../fakedata";
import HomePageShopDropdownItem from "./HomePageShopDropdownItem";
import { HomePageShopDropdownProps } from "../shopTypes";
import { dropdownItems } from "./utils/barUtils";

const sortByPriceLowToHigh = (data: FakeDataTypes[]) =>
  data.slice().sort((a, b) => a.price - b.price);
const sortByPriceHighToLow = (data: FakeDataTypes[]) =>
  data.slice().sort((a, b) => b.price - a.price);
const sortByName = (data: FakeDataTypes[]) =>
  data.slice().sort((a, b) => a.label.localeCompare(b.label));

function HomePageShopDropdown({
  setActiveSort,
  setActiveDropdown,
  setSortedData,
}: HomePageShopDropdownProps) {
  const handleSort = useCallback(
    (label: SortOptions) => {
      setActiveSort(label);
      setActiveDropdown(false);

      switch (label) {
        case SortOptions.LOW_PRICE:
          setSortedData(sortByPriceLowToHigh(fakeData));
          break;
        case SortOptions.HIGH_PRICE:
          setSortedData(sortByPriceHighToLow(fakeData));
          break;
        case SortOptions.NAME:
          setSortedData(sortByName(fakeData));
          break;
        case SortOptions.DEFAULT:
          setSortedData(fakeData);
          break;
        default:
          console.warn(`Unhandled sort option: ${label}`);
          break;
      }
    },
    [setActiveSort, setActiveDropdown, setSortedData]
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
