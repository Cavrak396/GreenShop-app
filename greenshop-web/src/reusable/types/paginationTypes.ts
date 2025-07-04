export interface PaginationTypes {
  visiblePages: number[];
  activePage: number;
  className: string;
  handlePageClick: (page: number) => void;
}

export interface PaginationPropsTypes {
  page: number;
  isActive: boolean;
  className: string;
  handleClick: (page: number) => void;
}

export interface PaginationItemsProps {
  totalItems: number;
  itemsPerPage: number;
  activePage: number,
  className: string;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  loadItems: (params: { plantId?: string; page: number; pageSize: number }) => void;
}

export interface SetPageFunctions {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setRangeStartPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface VisiblePagesParams {
  rangeStartPage: number;
  numOfPages: number;
}

export interface ArrowProps {
  id: number;
  img: string;
  alt: string;
}

export interface ArrowPaginationItemProps {
  arrow?: ArrowProps;
  className: string;
}