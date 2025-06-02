import React from "react";
import { PaginationTypes } from "../../types/paginationTypes";
import PaginationPage from "./PaginationPage";

const PaginationList = React.memo(
  ({
    visiblePages,
    activePage,
    handlePageClick,
    className,
  }: PaginationTypes) => {
    return (
      <ul className={`${className}__pagination-pages pagination-pages`}>
        {visiblePages.map((page) => (
          <PaginationPage
            key={page}
            page={page}
            className={className}
            isActive={activePage === page}
            handleClick={() => handlePageClick(page)}
          />
        ))}
      </ul>
    );
  }
);

export default PaginationList;
