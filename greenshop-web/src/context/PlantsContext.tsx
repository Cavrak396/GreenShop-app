import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  fetchPlants,
  fetchPlantsNumberByCategories,
  fetchTotalPlantsNumber,
  fetchPlantsNumberBySize,
} from "../services/plants/plants";
import {
  PlantsContextType,
  FiltersType,
  CategoryCount,
} from "./types/plantsTypes";
import { PlantsParams } from "../services/plants/plantsTypes";
import { ProductType } from "../components/homepage-shop/types/shopTypes";

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

export const PlantsProvider = ({ children }: { children: ReactNode }) => {
  const [sortedData, setSortedData] = useState<ProductType[]>([]);
  const [data, setData] = useState<ProductType[]>([]);
  const [dataPlantsTotal, setDataPlantsTotal] = useState<number>(0);
  const [searchedData, setSearchedData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState<CategoryCount>({});
  const [plantsTotal, setPlantsTotal] = useState<number>(0);
  const [plantsNumberBySize, setPlantsNumberBySize] = useState<CategoryCount>(
    {}
  );
  const [filters, setFilters] = useState<FiltersType>({
    category: null,
    size: null,
    group: "",
    priceMin: null,
    priceMax: null,
  });

  const CATEGORIES = ["House Plants", "Potter Plants", "Gardening"];

  const loadPlants = async (params: PlantsParams): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlants(params);
      setSortedData(data.plants);
      setData(data);
      setDataPlantsTotal(data.totalNumber);
      console.log(data);
    } catch (error) {
      setError("Failed to fetch plants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadPlantsNumberByCategories = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await fetchPlantsNumberByCategories(CATEGORIES);
      setCategoriesData(data);
    } catch (error) {
      setError("Failed to fetch plant numbers by categories.");
    } finally {
      setLoading(false);
    }
  };

  const loadPlantsNumberBySize = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await fetchPlantsNumberBySize();
      setPlantsNumberBySize(data);
    } catch (error) {
      setError("Failed to fetch plant numbers by size.");
    } finally {
      setLoading(false);
    }
  };

  const loadTotalPlantsNumber = async (): Promise<void> => {
    setLoading(true);
    try {
      const total = await fetchTotalPlantsNumber();
      setPlantsTotal(total);
    } catch (error) {
      setError("Failed to fetch total number of plants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlantsNumberByCategories();
    loadTotalPlantsNumber();
    loadPlantsNumberBySize();
  }, []);

  useEffect(() => {
    loadPlants({
      searchValue: searchedData,
      categoryValue: filters.category,
      sizeType: filters.size,
      group: filters.group,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      page: 1,
      pageSize: 9,
    });
  }, [filters]);

  return (
    <PlantsContext.Provider
      value={{
        sortedData,
        setSortedData,
        data,
        dataPlantsTotal,
        loading,
        error,
        filters,
        setFilters,
        loadPlants,
        loadPlantsNumberByCategories,
        categoriesData,
        plantsTotal,
        plantsNumberBySize,
        setSearchedData,
        setActiveCategoryId: (id: number | null) =>
          setFilters((prev) => ({
            ...prev,
            category: id !== null ? String(id) : null,
          })),
        setActiveSizeId: (id: number | null) =>
          setFilters((prev) => ({
            ...prev,
            size: id !== null ? String(id) : null,
          })),
        setCategoriesData: (data: CategoryCount) => setCategoriesData(data),
        setPriceRange: (minPrice: number, maxPrice: number) =>
          setFilters((prev) => ({
            ...prev,
            priceMin: minPrice,
            priceMax: maxPrice,
          })),
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error("usePlants must be used within a PlantsProvider");
  }
  return context;
};
