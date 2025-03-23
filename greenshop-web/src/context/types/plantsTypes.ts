import { ProductType } from "../../components/homepage-shop/shop/shopTypes";
import { PlantsParams } from "../../services/plants/plantsTypes";

export interface PlantsContextType {
  sortedData: ProductType[];
  setSortedData: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setSearchedData: React.Dispatch<React.SetStateAction<string>>;
  categoriesData: { [key: string]: number };
  plantsNumberBySize: { [key: string]: number };
  plantsTotal: number;
  data: ProductType[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    size: string | null;
    group: string;
    priceMin: number | null;
    priceMax: number | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    category: string | null;
    size: string | null;
    group: string;
    priceMin: number | null;
    priceMax: number | null;
  }>>;
  loadPlants: (params: PlantsParams) => void;
  loadPlantsNumberByCategories: () => void;
  setActiveCategoryId: (id: number | null) => void;
  setActiveSizeId: (id: number | null) => void;
  setCategoriesData: (data: ProductType[]) => void;
  setPriceRange: (minPrice: number, maxPrice: number) => void;
}
