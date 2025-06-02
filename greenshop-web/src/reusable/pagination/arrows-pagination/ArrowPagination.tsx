import ArrowPaginationList from "./ArrowPaginationList";
import "../pagination.css";
import { ArrowPaginationItemProps } from "../../types/paginationTypes";

function ArrowPagination({ className }: ArrowPaginationItemProps) {
  return (
    <div className={`${className}__arrow-pagination arrow-pagination`}>
      <ArrowPaginationList className={className} />
    </div>
  );
}

export default ArrowPagination;