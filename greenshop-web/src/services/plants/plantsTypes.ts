export interface PlantsParams {
    searchValue?: string | null;
    categoryValue?: string | null;
    sizeType?: string | null;
    group?: string | null;
    priceMin?: number | null;
    priceMax?: number | null;
    page: number;
    pageSize: number;
}

