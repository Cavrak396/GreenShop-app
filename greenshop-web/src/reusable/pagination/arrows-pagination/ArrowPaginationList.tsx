import { ArrowPaginationItemProps } from "../../types/paginationTypes";
import { paginationArrows } from "../utils/paginationUtils";
import ArrowPaginationItem from "./ArrowPaginationItem";

function ArrowPaginationList({ className }: ArrowPaginationItemProps) {
  return (
    <ul className={`${className}__arrow-pagination-list arrow-pagination-list`}>
      {paginationArrows.map((arrow) => {
        return (
          <ArrowPaginationItem
            className={className}
            key={arrow.id}
            arrow={arrow}
          />
        );
      })}
    </ul>
  );
}

export default ArrowPaginationList;