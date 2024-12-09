import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchPlants } from "../services/plants/plants";
import { PlantsContextType } from "./types/contextTypes";
import { PlantsParams } from "../services/plants/plantsTypes";
import { ProductType } from "../components/homepage-shop/shop/shopTypes";

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

export const PlantsProvider = ({ children }: { children: ReactNode }) => {
  const [sortedData, setSortedData] = useState<ProductType[]>([]);
  const [data, setData] = useState<ProductType[]>([]);
  const [searchedData, setSearchedData] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    category: string | null;
    size: string | null;
    group: string;
    priceMin: number | null;
    priceMax: number | null;
  }>({
    category: null,
    size: null,
    group: "",
    priceMin: null,
    priceMax: null,
  });

  const loadPlants = async (params: PlantsParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlants(params);
      setSortedData(data);
      setData(data);
    } catch (error) {
      setError("Failed to fetch plants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
        loading,
        error,
        filters,
        setFilters,
        loadPlants,
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
        setCategoriesData: (data: ProductType[]) => setData(data),
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
