// // hooks/useProducts.ts
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { fetchProducts, ProductsResponse } from "@/lib/shop";

// export function useProducts() {
//   return useQuery<ProductsResponse>({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//   });
// }

"use client";

import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  price?: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  return json.data || [];
};

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  });
};
