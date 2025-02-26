import HomePaginationPage from "./HomePaginationPage";
import { PaginationTypes } from "./types/paginationTypes";

function HomePagePaginationList({
  visiblePages,
  activePage,
  handlePageClick,
}: PaginationTypes) {
  return (
    <ul className="homepageshop__pagination-pages">
      {visiblePages.map((page) => (
        <HomePaginationPage
          key={page}
          page={page}
          isActive={activePage === page}
          handleClick={() => handlePageClick(page)}
        />
      ))}
    </ul>
  );
}

export default HomePagePaginationList;
