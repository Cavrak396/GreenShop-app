import React from "react";
import { PaginationTypes } from "../../types/paginationTypes";
import PaginationPage from "./PaginationPage";

const PaginationList = React.memo(
  ({ visiblePages, activePage, handlePageClick }: PaginationTypes) => {
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
);

export default PaginationList;
