import { useCallback } from "react";
import { FakeDataTypes } from "./fakedata";
import fakeData from "./fakedata";

enum SortOptions {
  DEFAULT = "Default Sorting",
  LOW_PRICE = "Price Sorting - from lowest",
  HIGH_PRICE = "Price Sorting - from highest",
  NAME = "Name Sorting",
}

interface DropdownItemType {
  id: number;
  label: SortOptions;
}

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
          setSortedData((prevData) =>
            [...prevData].sort((a, b) => a.price - b.price)
          );
          break;
        case SortOptions.HIGH_PRICE:
          setSortedData((prevData) =>
            [...prevData].sort((a, b) => b.price - a.price)
          );
          break;
        case SortOptions.NAME:
          setSortedData((prevData) =>
            [...prevData].sort((a, b) => a.label.localeCompare(b.label))
          );
          break;
        case SortOptions.DEFAULT:
          setSortedData(fakeData);
          break;
        default:
          break;
      }
    },
    [setActiveSort, setActiveDropdown, setSortedData]
  );

  return (
    <div className="homepageshop__dropdown">
      <ul className="homepageshop__dropdown-list">
        {dropdownItems.map((item) => (
          <li
            className="homepageshop__dropdown-item"
            key={item.id}
            onClick={() => handleSort(item.label)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePageShopDropdown;
