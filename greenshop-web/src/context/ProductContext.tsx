import { createContext, useContext } from "react";
import { FakeDataTypes } from "../components/homepage-shop/shop/fakedata";
import { ProductProviderProps } from "../components/details/types/detailsTypes";

const ProductContext = createContext<FakeDataTypes | null>(null);

export function ProductProvider({ children, product }: ProductProviderProps) {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
