import { useComments } from "../../../context/ReviewsContext";
import { ArrowPaginationItemProps } from "../../types/paginationTypes";

function ArrowPaginationItem({ arrow }: ArrowPaginationItemProps) {
  const { currentPage, totalReviews, currentPageSize, setCurrentPage } =
    useComments();

  const totalReviewsValue = totalReviews ?? 0;
  const totalPages = Math.ceil(totalReviewsValue / currentPageSize);
  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  function handleClick() {
    if (arrow.id === 1) {
      setCurrentPage((prevPage: number) => Math.max(prevPage - 1, 1));
    } else if (arrow.id === 2 && !isLastPage) {
      setCurrentPage((prevPage: number) => prevPage + 1);
    }
  }

  return (
    <li
      className={`arrow-pagination-item ${
        (arrow.id === 1 && isFirstPage) || (arrow.id === 2 && isLastPage)
          ? "disabled"
          : ""
      }`}
      onClick={handleClick}
    >
      <img
        src={arrow.img}
        className={`arrow-pagination-arrow ${
          arrow.id === 1 ? "arrow-pagination-arrow--left" : ""
        }`}
        alt={arrow.alt}
      />
    </li>
  );
}

export default ArrowPaginationItem;
