import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  numOfPages,
  handleMoveToFirstPage,
  handleMoveToLastPage,
  getVisiblePages,
  handlePageClick as handlePageClickUtil,
} from "./utils/paginationUtils";
import arrow from "../../../assets/images/shop/pagination/arrow-right.svg";
import HomePagePaginationList from "./HomePaginationList";
import { usePlants } from "../../../context/PlantsContext";
import "./pagination.css";

function HomePagePagination() {
  const { loadPlants } = usePlants();
  const [activePage, setActivePage] = useState<number>(1);
  const [rangeStartPage, setRangeStartPage] = useState<number>(1);

  const prevActivePage = useRef(activePage);

  const visiblePages = useMemo(
    () => getVisiblePages({ rangeStartPage }),
    [rangeStartPage]
  );

  useEffect(() => {
    if (prevActivePage.current !== activePage) {
      loadPlants({
        page: activePage,
        pageSize: 9,
      });
      prevActivePage.current = activePage;
    }
  }, [activePage, loadPlants]);

  const handlePageClick = useCallback(
    (page: number) => {
      handlePageClickUtil(page, rangeStartPage, {
        setActivePage,
        setRangeStartPage,
      });
    },
    [rangeStartPage]
  );

  return (
    <div className="homepageshop__pagination">
      {rangeStartPage > 1 && (
        <img
          src={arrow}
          alt="Go to first page"
          className="homepageshop__pagination-arrow homepageshop__pagination-arrow--left"
          onClick={() =>
            handleMoveToFirstPage({ setActivePage, setRangeStartPage })
          }
          aria-label="Go to first page"
        />
      )}
      <HomePagePaginationList
        visiblePages={visiblePages}
        activePage={activePage}
        handlePageClick={handlePageClick}
      />
      {visiblePages[visiblePages.length - 1] < numOfPages && (
        <img
          src={arrow}
          alt="Go to last page"
          className="homepageshop__pagination-arrow"
          onClick={() =>
            handleMoveToLastPage({ setActivePage, setRangeStartPage })
          }
          aria-label="Go to last page"
        />
      )}
    </div>
  );
}

export default HomePagePagination;