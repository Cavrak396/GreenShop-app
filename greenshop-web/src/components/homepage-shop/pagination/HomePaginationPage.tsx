interface PaginationPageProps {
  page: number;
  isActive: boolean;
  handleClick: (page: number) => void;
}

function HomePaginationPage({
  page,
  isActive,
  handleClick,
}: PaginationPageProps) {
  return (
    <li
      className={`homepageshop__pagination-page ${
        isActive ? "active-page" : ""
      }`}
      onClick={() => handleClick(page)}
      aria-label={`Go to page ${page}`}
    >
      {page}
    </li>
  );
}

export default HomePaginationPage;
