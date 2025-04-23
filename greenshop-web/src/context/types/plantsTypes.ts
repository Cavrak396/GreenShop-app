import { ProductType } from "../../components/homepage-shop/types/shopTypes";
import { PlantsParams } from "../../services/plants/plantsTypes";

export type CategoryCount = {
  [key: string]: number;
};

export type FiltersType = {
  category: string | null;
  size: string | null;
  group: string;
  priceMin: number | null;
  priceMax: number | null;
};

export interface PlantsContextType {
  sortedData: ProductType[];
  setSortedData: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setSearchedData: React.Dispatch<React.SetStateAction<string>>;
  categoriesData: CategoryCount;
  plantsNumberBySize: CategoryCount;
  dataPlantsTotal: number;
  plantsTotal: number;
  data: ProductType[];
  loading: boolean;
  error: string | null;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  loadPlants: (params: PlantsParams) => Promise<void>;
  loadPlantsNumberByCategories: () => Promise<void>;
  setActiveCategoryId: (id: number | null) => void;
  setActiveSizeId: (id: number | null) => void;
  setCategoriesData: (data: CategoryCount) => void;
  setPriceRange: (minPrice: number, maxPrice: number) => void;
}
