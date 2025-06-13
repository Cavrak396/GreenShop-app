import ArrowPaginationList from "./ArrowPaginationList";
import { ArrowPaginationItemProps } from "../../types/paginationTypes";
import "../pagination.css";

function ArrowPagination({ className }: ArrowPaginationItemProps) {
  return (
    <div className={`${className}__arrow-pagination arrow-pagination`}>
      <ArrowPaginationList className={className} />
    </div>
  );
}

export default ArrowPagination;