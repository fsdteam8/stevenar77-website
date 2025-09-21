// services/hooks/product/useAllProducts.ts
"use client";

import { useMemo } from "react";
import { useProducts, Product as GelatoProduct } from "./useProducts";
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
    data: gelatoProducts = [],
    isLoading: gelatoLoading,
    isError: gelatoError,
  } = useProducts();

  const {
    data: adminProducts = [],
    isLoading: adminLoading,
    isError: adminError,
  } = useAdminProducts();

  const isLoading = gelatoLoading || adminLoading;
  const isError = gelatoError || adminError;

  const products: UnifiedProduct[] = useMemo(() => {
    const normalizedGelato: UnifiedProduct[] = gelatoProducts.map(
      (p: GelatoProduct) => ({
        _id: p._id,
        title: p.title,
        shortDescription: p.description,
        price: p.price,
        previewUrl: p.previewUrl,
        images: p.images?.map((img) => ({ url: img.url })),
        totalReviews: 0, // default for Gelato
        averageRating: 0, // default for Gelato
      })
    );

    const normalizedAdmin: UnifiedProduct[] = adminProducts.map(
      (p: AdminProduct) => ({
        _id: p._id,
        title: p.title,
        shortDescription: p.shortDescription,
        price: p.price,
        previewUrl: p.images?.[0]?.url,
        images: p.images?.map((img) => ({ url: img.url })),
        totalReviews: p.totalReviews || 0,
        averageRating: p.averageRating || 0,
      })
    );

    return [...normalizedGelato, ...normalizedAdmin];
  }, [gelatoProducts, adminProducts]);

  return { products, isLoading, isError };
};
