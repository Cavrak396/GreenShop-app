import { paginationArrows } from "../utils/paginationUtils";
import ArrowPaginationItem from "./ArrowPaginationItem";

function ArrowPaginationList() {
  return (
    <ul className="arrow-pagination-list">
      {paginationArrows.map((arrow) => {
        return <ArrowPaginationItem key={arrow.id} arrow={arrow} />;
      })}
    </ul>
  );
}

export default ArrowPaginationList;
