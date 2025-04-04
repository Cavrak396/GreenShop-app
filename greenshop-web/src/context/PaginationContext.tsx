import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useComments } from "./ReviewsContext";
import { useLocation } from "react-router-dom";

const PaginationContext = createContext<any>(null);

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [activeDetailsInfoButton, setActiveDetailsInfoButton] =
    useState<number>(1);
  const [currentShopPage, setCurrentShopPage] = useState<number>(1);

  const { setCurrentCommentsPage } = useComments();
  const location = useLocation();

  useEffect(() => {
    setActiveDetailsInfoButton(1);
    setCurrentCommentsPage(1);
  }, [location]);

  return (
    <PaginationContext.Provider
      value={{
        activeDetailsInfoButton,
        setActiveDetailsInfoButton,
        currentShopPage,
        setCurrentShopPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
}