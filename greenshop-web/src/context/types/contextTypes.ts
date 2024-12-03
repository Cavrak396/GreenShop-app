import { ProductType } from "../../components/homepage-shop/shop/shopTypes";
import { PlantsParams } from "../../services/plants/plantsTypes";
import { Dispatch, SetStateAction } from "react";

export interface PlantsContextType {
    sortedData: ProductType[];
    data: ProductType[];
    loading: boolean;
    error: string | null;
    filters: {
        category: string | null;
        size: string | null;
        group: string;
    };
    setFilters: Dispatch<SetStateAction<{ category: string | null; size: string | null; group: string }>>;
    setSortedData: Dispatch<SetStateAction<ProductType[]>>;
    setSearchedData: Dispatch<SetStateAction<string>>;
    loadPlants: (params: PlantsParams) => void;
    setActiveCategoryId: (id: number | null) => void;
    setActiveSizeId: (id: number | null) => void;
    setCategoriesData: (data: ProductType[]) => void;
}