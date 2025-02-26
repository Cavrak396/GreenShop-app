export interface PaginationTypes {
    visiblePages: number[];
    activePage: number;
    handlePageClick: (page: number) => void;
}

export interface PaginationPropsTypes {
    page: number;
    isActive: boolean;
    handleClick: (page: number) => void;
}

export interface SetPageFunctions {
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    setRangeStartPage: React.Dispatch<React.SetStateAction<number>>;
  }
  
  export interface VisiblePagesParams {
    rangeStartPage: number;
  }