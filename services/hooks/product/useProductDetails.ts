// hooks/useProductDetails.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById, ProductResponse } from "@/lib/products";

export function useProductDetails(productId: string) {
  return useQuery<ProductResponse>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId, // only fetch if productId exists
  });
}
