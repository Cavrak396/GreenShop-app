import { useState } from "react";
import { usePlants } from "../../../../context/PlantsContext";
import HomePageShopBarItem from "./HomePageShopBarItem";
import { barItems } from "./utils/barUtils";
import "../../homepageshop.css";
import { BarItemsTypes } from "../shopTypes";

function HomePageShopBar() {
  const { setFilters } = usePlants();
  const [activeItemId, setActiveItemId] = useState<number>(1);

  function handleBarItemClick(item: BarItemsTypes) {
    const { id, label } = item;
    setActiveItemId(id);

    const groupValue = label === "All Plants" ? "" : label;

    setFilters((prevFilters) => ({
      ...prevFilters,
      group: groupValue,
    }));
  }

  return (
    <div className="homepageshop__bar">
      <ul className="homepageshop__bar-items">
        {barItems.map((item) => (
          <HomePageShopBarItem
            key={item.id}
            item={item}
            isActive={item.id === activeItemId}
            onItemClick={handleBarItemClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default HomePageShopBar;
