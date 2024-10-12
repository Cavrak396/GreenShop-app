import { useState } from "react";
import HomePageShopDropdown from "./HomePageShopDropdown";
import { FakeDataTypes } from "./fakedata";

interface BarItemsTypes {
  id: number;
  label: string;
}

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
          return (
            <li className="homepageshop__bar-item" key={item.id}>
              {item.label}
            </li>
          );
        })}
      </ul>

      <button
        className="homepageshop__sort-btn"
        onClick={() => setActiveDropdown((prev) => !prev)}
      >
        Sort by: {activeSort}
      </button>
      {activeDropdown && (
        <HomePageShopDropdown
          setActiveSort={setActiveSort}
          setActiveDropdown={setActiveDropdown}
          setSortedData={setSortedData}
        />
      )}
    </div>
  );
}

export default HomePageShopBar;
