import PaginationPage from "./PaginationPage";
import { PaginationTypes } from "../types/paginationTypes";

function PaginationList({
  visiblePages,
  activePage,
  handlePageClick,
}: PaginationTypes) {
  return (
    <ul className="homepageshop__pagination-pages">
      {visiblePages.map((page) => (
        <PaginationPage
          key={page}
          page={page}
          isActive={activePage === page}
          handleClick={() => handlePageClick(page)}
        />
      ))}
    </ul>
  );
}

export default PaginationList;
