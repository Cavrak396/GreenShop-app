import { SetPageFunctions, VisiblePagesParams } from "../types/paginationTypes";

export const NUM_OF_ARTICLES = 50;
export const ITEMS_PER_PAGE = 9;
export const numOfPages = Math.ceil(NUM_OF_ARTICLES / ITEMS_PER_PAGE);
export const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

export function getVisiblePages({
  rangeStartPage,
}: VisiblePagesParams): number[] {
  return pages.slice(rangeStartPage - 1, rangeStartPage + 3);
}

export function handleMoveToLastPage({
  setActivePage,
  setRangeStartPage,
}: SetPageFunctions) {
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
  { setActivePage, setRangeStartPage }: SetPageFunctions
) {
  setActivePage(page);
  if (page === rangeStartPage + 3 && rangeStartPage + 4 <= numOfPages) {
    setRangeStartPage(rangeStartPage + 1);
  } else if (page === rangeStartPage && rangeStartPage > 1) {
    setRangeStartPage(rangeStartPage - 1);
  }
}
