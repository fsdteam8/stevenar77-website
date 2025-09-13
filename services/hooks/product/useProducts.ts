// hooks/useProducts.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ProductsResponse } from "@/lib/shop";

export function useProducts() {
  return useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
