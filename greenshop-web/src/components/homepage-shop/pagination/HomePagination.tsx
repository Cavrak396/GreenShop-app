import { useState, useMemo, useCallback } from "react";
import HomePaginationPage from "./HomePaginationPage";
import { numOfPages, pages } from "./utils/paginationUtils";
import arrow from "../../../assets/images/shop/pagination/arrow-right.svg";
import "./pagination.css";

function HomePagePagination() {
  const [activePage, setActivePage] = useState<number>(1);
  const [rangeStartPage, setRangeStartPage] = useState<number>(1);

  const visiblePages = useMemo(
    () => pages.slice(rangeStartPage - 1, rangeStartPage + 3),
    [rangeStartPage]
  );

  function handleMoveToLastPage() {
    setActivePage(numOfPages);
    setRangeStartPage(numOfPages - 3);
  }

  function handleMoveToFirstPage() {
    setActivePage(1);
    setRangeStartPage(1);
  }

  const handlePageClick = useCallback(
    function handlePageClick(page: number) {
      setActivePage(page);
      if (page === rangeStartPage + 3 && rangeStartPage + 4 <= numOfPages) {
        setRangeStartPage(rangeStartPage + 1);
      } else if (page === rangeStartPage && rangeStartPage > 1) {
        setRangeStartPage(rangeStartPage - 1);
      }
    },
    [rangeStartPage, numOfPages]
  );

  return (
    <div className="homepageshop__pagination">
      {rangeStartPage > 1 && (
        <img
          src={arrow}
          alt="Go to first page"
          className="homepageshop__pagination-arrow homepageshop__pagination-arrow--left"
          onClick={handleMoveToFirstPage}
          aria-label="Go to first page"
        />
      )}
      <ul className="homepageshop__pagination-pages">
        {visiblePages.map((page) => (
          <HomePaginationPage
            key={page}
            page={page}
            isActive={activePage === page}
            handleClick={handlePageClick}
          />
        ))}
      </ul>
      {visiblePages[visiblePages.length - 1] < numOfPages && (
        <img
          src={arrow}
          alt="Go to last page"
          className="homepageshop__pagination-arrow"
          onClick={handleMoveToLastPage}
          aria-label="Go to last page"
        />
      )}
    </div>
  );
}

export default HomePagePagination;
