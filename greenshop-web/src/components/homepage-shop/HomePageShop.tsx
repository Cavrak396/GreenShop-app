import HomePageToolbox from "./usertoolbox/HomePageToolbox";
import HomePageShopContent from "./shop/HomePageShopContent";
import Pagination from "../../reusable/pagination/numbers-pagination/Pagination";
import { usePlants } from "../../context/PlantsContext";
import { useState } from "react";
import "./homepageshop.css";

function HomePageShop() {
  const { loadPlants, plantsTotal } = usePlants();
  const [itemsPerPage] = useState(9);

  return (
    <div className="homepageshop">
      <div className="wrap">
        <div className="homepageshop__line">
          <HomePageToolbox />
          <HomePageShopContent />
        </div>
        <Pagination
          totalItems={plantsTotal}
          itemsPerPage={itemsPerPage}
          loadItems={loadPlants}
        />
      </div>
    </div>
  );
}

export default HomePageShop;
