import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  handleMoveToFirstPage,
  handleMoveToLastPage,
  getVisiblePages,
  handlePageClick as handlePageClickUtil,
} from "../utils/paginationUtils";
import PaginationList from "./PaginationList";
import { PaginationItemsProps } from "../../types/paginationTypes";
import arrow from "../../../assets/images/shop/pagination/arrow-right.svg";
import "../pagination.css";

function Pagination({
  totalItems,
  itemsPerPage,
  loadItems,
  activePage,
  setActivePage,
  className,
}: PaginationItemsProps) {
  const prevActivePage = useRef(activePage);

  const [rangeStartPage, setRangeStartPage] = useState<number>(1);
  const numOfPages = Math.ceil(totalItems / itemsPerPage);

  const visiblePages = useMemo(
    () => getVisiblePages({ rangeStartPage, numOfPages }),
    [rangeStartPage, numOfPages]
  );

  useEffect(() => {
    if (prevActivePage.current !== activePage) {
      loadItems({
        page: activePage,
        pageSize: itemsPerPage,
      });
      prevActivePage.current = activePage;
    }
  }, [activePage, loadItems, itemsPerPage]);

  const handlePageClick = useCallback(
    (page: number) => {
      handlePageClickUtil(
        page,
        rangeStartPage,
        {
          setActivePage,
          setRangeStartPage,
        },
        numOfPages
      );
    },
    [rangeStartPage, numOfPages]
  );

  return (
    <div className={`${className}__pagination pagination`}>
      {rangeStartPage > 1 && (
        <img
          src={arrow}
          alt="Go to first page"
          className={`${className}__pagination-arrow ${className}__pagination-arrow--left`}
          onClick={() =>
            handleMoveToFirstPage({ setActivePage, setRangeStartPage })
          }
          aria-label="Go to first page"
        />
      )}
      <PaginationList
        visiblePages={visiblePages}
        activePage={activePage}
        handlePageClick={handlePageClick}
        className={className}
      />
      {visiblePages[visiblePages.length - 1] < numOfPages && (
        <img
          src={arrow}
          alt="Go to last page"
          className={`${className}__pagination-arrow pagination-arrow`}
          onClick={() =>
            handleMoveToLastPage({
              setActivePage,
              setRangeStartPage,
              numOfPages,
            })
          }
          aria-label="Go to last page"
        />
      )}
    </div>
  );
}

export default Pagination;