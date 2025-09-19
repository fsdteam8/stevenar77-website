// services/hooks/product/useProductPrice.ts
import { getProductPrice } from "@/lib/products";
import { useQuery } from "@tanstack/react-query";
// import { getProductPrice, } from "@/services/api/product";

export const useProductPrice = (id: string) => {
  return useQuery({
    queryKey: ["productPrice", id],
    queryFn: () => getProductPrice(id),
    enabled: !!id,
  });
};
