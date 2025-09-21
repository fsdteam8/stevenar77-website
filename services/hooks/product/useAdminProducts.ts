// services/hooks/product/useAdminProducts.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface AdminProduct {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  images?: { url: string }[];
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface AdminProductsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    products: AdminProduct[];
  };
}

export const fetchAdminProducts = async (): Promise<AdminProduct[]> => {
  const res = await axios.get<AdminProductsResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/shop/`
  );
  return res.data.data.products || [];
};

export const useAdminProducts = () => {
  return useQuery<AdminProduct[]>({
    queryKey: ["admin-products"],
    queryFn: fetchAdminProducts,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 min
  });
};
