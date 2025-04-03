import React from "react";
import { PaginationPropsTypes } from "../../types/paginationTypes";

const PaginationPage = React.memo(({ page, isActive, handleClick }: PaginationPropsTypes) => {
  return (
    <li
      className={`homepageshop__pagination-page ${isActive ? "active-page" : ""}`}
      onClick={() => handleClick(page)}
      aria-label={`Go to page ${page}`}
    >
      {page}
    </li>
  );
});

export default PaginationPage;
