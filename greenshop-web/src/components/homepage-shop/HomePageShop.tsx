import HomePageToolbox from "./usertoolbox/HomePageToolbox";
import HomePageShopContent from "./shop/HomePageShopContent";
import Pagination from "../../reusable/pagination/numbers-pagination/Pagination";
import { usePlants } from "../../context/PlantsContext";
import { useState } from "react";
import { usePagination } from "../../context/PaginationContext";
import "./homepageshop.css";

function HomePageShop() {
  const { loadPlants, data, filters, dataPlantsTotal } = usePlants();
  const [itemsPerPage] = useState(9);
  const { currentShopPage, setCurrentShopPage } = usePagination();

  return (
    <div className="homepageshop">
      <div className="wrap">
        <div className="homepageshop__line">
          <HomePageToolbox setCurrentShopPage={setCurrentShopPage} />
          <HomePageShopContent setCurrentShopPage={setCurrentShopPage} />
        </div>
        {data && dataPlantsTotal > itemsPerPage && (
          <Pagination
            activePage={currentShopPage}
            setActivePage={setCurrentShopPage}
            totalItems={dataPlantsTotal}
            itemsPerPage={itemsPerPage}
            loadItems={(params) =>
              loadPlants({
                ...params,
                searchValue: "",
                categoryValue: filters.category,
                sizeType: filters.size,
                group: filters.group,
                priceMin: filters.priceMin,
                priceMax: filters.priceMax,
              })
            }
          />
        )}
      </div>
    </div>
  );
}

export default HomePageShop;
