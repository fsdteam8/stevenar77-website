// services/hooks/product/useAllProducts.ts
"use client";

import { useMemo } from "react";
import { useAdminProducts, AdminProduct } from "./useAdminProducts";

export interface UnifiedProduct {
  totalReviews: number;
  averageRating: number;
  _id: string;
  title: string;
  shortDescription?: string;
  price: number;
  previewUrl?: string;
  images?: { url: string }[];
}

export const useAllProducts = () => {
  const {
    data: adminProducts = [],
    isLoading,
    isError,
  } = useAdminProducts();

  const products: UnifiedProduct[] = useMemo(() => {
    return adminProducts.map(
      (p: AdminProduct) => ({
        _id: p._id,
        title: p.title,
        shortDescription: p.shortDescription,
        price: p.price,
        previewUrl: p.images?.[0]?.url,
        images: p.images?.map((img: { url: string }) => ({ url: img.url })),
        totalReviews: p.totalReviews || 0,
        averageRating: p.averageRating || 0,
      })
    );
  }, [adminProducts]);

  return { products, isLoading, isError };
};
