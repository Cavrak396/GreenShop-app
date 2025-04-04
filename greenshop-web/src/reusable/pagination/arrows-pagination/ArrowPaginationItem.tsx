import { useComments } from "../../../context/ReviewsContext";
import { ArrowPaginationItemProps } from "../../types/paginationTypes";

function ArrowPaginationItem({ arrow }: ArrowPaginationItemProps) {
  const {
    currentCommentsPage,
    totalReviews,
    currentPageSize,
    setCurrentCommentsPage,
  } = useComments();

  const totalReviewsValue = totalReviews ?? 0;
  const totalPages = Math.ceil(totalReviewsValue / currentPageSize);
  const isLastPage = currentCommentsPage === totalPages;
  const isFirstPage = currentCommentsPage === 1;

  function handleClick() {
    if (arrow.id === 1) {
      setCurrentCommentsPage((prevPage: number) => Math.max(prevPage - 1, 1));
    } else if (arrow.id === 2 && !isLastPage) {
      setCurrentCommentsPage((prevPage: number) => prevPage + 1);
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