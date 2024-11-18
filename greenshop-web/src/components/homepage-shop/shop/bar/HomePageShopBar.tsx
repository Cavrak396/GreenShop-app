import { useState } from "react";
import HomePageShopDropdown from "./HomePageShopDropdown";
import HomePageShopBarItem from "./HomePageShopBarItem";
import { barItems } from "./utils/barUtils";
import arrowDown from "../../../../assets/images/shop/arrow-down.svg";
import { HomePageShopBarProps } from "../shopTypes";
import Button from "../../../button/Button";

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

      <Button
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
      </Button>
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
