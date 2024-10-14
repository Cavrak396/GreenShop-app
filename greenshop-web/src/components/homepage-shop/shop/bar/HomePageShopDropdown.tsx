import { useCallback } from "react";
import { FakeDataTypes } from "../fakedata";
import { SortOptions, DropdownItemType } from "../shopTypes";
import fakeData from "../fakedata";
import HomePageShopDropdownItem from "./HomePageShopDropdownItem";

interface HomePageShopDropdownProps {
  id: string;
  setActiveSort: React.Dispatch<React.SetStateAction<string>>;
  setActiveDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setSortedData: React.Dispatch<React.SetStateAction<FakeDataTypes[]>>;
}

const dropdownItems: readonly DropdownItemType[] = [
  { id: 1, label: SortOptions.DEFAULT },
  { id: 2, label: SortOptions.LOW_PRICE },
  { id: 3, label: SortOptions.HIGH_PRICE },
  { id: 4, label: SortOptions.NAME },
];

const sortByPriceLowToHigh = (data: FakeDataTypes[]) =>
  data.slice().sort((a, b) => a.price - b.price);
const sortByPriceHighToLow = (data: FakeDataTypes[]) =>
  data.slice().sort((a, b) => b.price - a.price);
const sortByName = (data: FakeDataTypes[]) =>
  data.slice().sort((a, b) => a.label.localeCompare(b.label));

const HomePageShopDropdown: React.FC<HomePageShopDropdownProps> = ({
  setActiveSort,
  setActiveDropdown,
  setSortedData,
}) => {
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
};

export default HomePageShopDropdown;
