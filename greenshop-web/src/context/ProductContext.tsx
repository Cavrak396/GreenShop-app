import { createContext, useContext } from "react";
import {
  ProductTypeDetails,
  ProductProviderProps,
} from "../components/details/types/detailsTypes";

const ProductContext = createContext<ProductTypeDetails | null>(null);

export function ProductProvider({ children, product }: ProductProviderProps) {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct(): ProductTypeDetails {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
