import {
  SetPageFunctions,
  VisiblePagesParams,
} from "../../types/paginationTypes";

import arrow from "../../../assets/images/reusable/arrow.svg";

export function getVisiblePages({
  rangeStartPage,
  numOfPages,
}: VisiblePagesParams & { numOfPages: number }): number[] {
  return Array.from({ length: 4 }, (_, i) => rangeStartPage + i).filter(
    (page) => page <= numOfPages
  );
}

export function handleMoveToLastPage({
  setActivePage,
  setRangeStartPage,
  numOfPages,
}: SetPageFunctions & { numOfPages: number }) {
  setActivePage(numOfPages);
  setRangeStartPage(numOfPages - 3);
}

export function handleMoveToFirstPage({
  setActivePage,
  setRangeStartPage,
}: SetPageFunctions) {
  setActivePage(1);
  setRangeStartPage(1);
}

export function handlePageClick(
  page: number,
  rangeStartPage: number,
  { setActivePage, setRangeStartPage }: SetPageFunctions,
  numOfPages: number
) {
  setActivePage(page);
  if (page === rangeStartPage + 3 && rangeStartPage + 4 <= numOfPages) {
    setRangeStartPage(rangeStartPage + 1);
  } else if (page === rangeStartPage && rangeStartPage > 1) {
    setRangeStartPage(rangeStartPage - 1);
  }
}

export const paginationArrows = [
  { id: 1, alt: "Pagination arrow left", img: arrow },
  { id: 2, alt: "Pagination arrow right", img: arrow },
];
