import HomePageToolbox from "./usertoolbox/HomePageToolbox";
import HomePageShopContent from "./shop/HomePageShopContent";
import Pagination from "../../reusable/pagination/numbers-pagination/Pagination";
import { usePlants } from "../../context/PlantsContext";
import { useState } from "react";
import { usePagination } from "../../context/PaginationContext";
import "./homepageshop.css";

function HomePageShop() {
  const { loadPlants, plantsTotal } = usePlants();
  const [itemsPerPage] = useState(9);
  const { currentShopPage, setCurrentShopPage } = usePagination();

  return (
    <div className="homepageshop">
      <div className="wrap">
        <div className="homepageshop__line">
          <HomePageToolbox />
          <HomePageShopContent />
        </div>
        {plantsTotal > 9}
        {
          <Pagination
            activePage={currentShopPage}
            setActivePage={setCurrentShopPage}
            totalItems={plantsTotal}
            itemsPerPage={itemsPerPage}
            loadItems={loadPlants}
          />
        }
      </div>
    </div>
  );
}

export default HomePageShop;
