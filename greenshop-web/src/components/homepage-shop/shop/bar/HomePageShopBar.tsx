import { useState } from "react";
import HomePageShopDropdown from "./HomePageShopDropdown";
import HomePageShopBarItem from "./HomePageShopBarItem";
import arrowDown from "../../../../assets/images/shop/arrow-down.svg";
import { FakeDataTypes } from "../fakedata";
import { BarItemsTypes } from "../shopTypes";

interface HomePageShopBarProps {
  setSortedData: React.Dispatch<React.SetStateAction<FakeDataTypes[]>>;
}

const barItems: BarItemsTypes[] = [
  { id: 1, label: "All Plants" },
  { id: 2, label: "New Arrivals" },
  { id: 3, label: "Sale" },
];

function HomePageShopBar({ setSortedData }: HomePageShopBarProps) {
  const [activeSort, setActiveSort] = useState<string>("Default Sorting");
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);

  return (
    <div className="homepageshop__bar">
      <ul className="homepageshop__bar-items">
        {barItems.map((item) => {
          return <HomePageShopBarItem key={item.id} item={item} />;
        })}
      </ul>

      <button
        className="homepageshop__sort-btn"
        onClick={() => setActiveDropdown((prev) => !prev)}
        aria-expanded={activeDropdown}
        aria-controls="sort-dropdown"
      >
        Sort by: {activeSort}
        <img
          src={arrowDown}
          className="homepageshop__sort-arrow"
          alt="arrow down"
        />
      </button>
      {activeDropdown && (
        <HomePageShopDropdown
          setActiveSort={setActiveSort}
          setActiveDropdown={setActiveDropdown}
          setSortedData={setSortedData}
          id="sort-dropdown"
        />
      )}
    </div>
  );
}

export default HomePageShopBar;
