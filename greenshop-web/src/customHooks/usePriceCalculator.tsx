import { useCallback } from "react";
import { useUser } from "../context/AuthContext";
import { ProductTypeDetails } from "../components/details/types/detailsTypes";
import { CartItemTypes } from "../components/cart/types/cartTypes";

export function usePrice() {
  const { token } = useUser();

  const getPrice = useCallback(
    (item: CartItemTypes | ProductTypeDetails): number => {
      if (token) {
        return item.price;
      }
      const salePercent = (item.sale_Percent_Private ?? item.sale) || 0;
      return Number((item.price * (1 + salePercent / 100)).toFixed(2));
    },
    [token]
  );

  return { getPrice };
}
