// services/hooks/product/useProducts.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  previewUrl?: string;
  images?: { url: string }[];
  averageRating?: number;
  totalReviews?: number;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Product[];
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<ProductsResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/product`
  );
  return res.data.data || [];
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
