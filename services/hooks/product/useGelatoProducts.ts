import { useQuery } from "@tanstack/react-query";
import { fetchGelatoProduct, fetchGelatoSingleProduct } from "@/lib/shop";

// types/product.ts
export interface Metadata {
  id: string;
  productId: string;
  variantId: string | null;
  imageId: string | null;
  videoId: string | null;
  key: string;
  value: string;
  isExternal: boolean;
}
export interface image {
  public_id: string;
  url: string;
}
export interface GelatoShopProductCardType  {
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  price: string | number;
  onSeeMore?: () => void;
  onBookNow?: () => void;
};

export interface GelatoProduct {
  id: string;
  storeId: string;
  clientId: string;
  externalId: string | null;
  images: image[];
  title: string;
  description: string;
  previewUrl: string;
  externalPreviewUrl: string;
  externalThumbnailUrl: string;
  isReadyToPublish: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  previewFileType: string;
  productVariantPreviewScene: string;
  //   variants: any[]; // you can type this later
  //   productVariantOptions: any[];
  collectionsIds: string[];
  tags: string[];
  status: string;
  //   productImages: any[]; // type later if you need
  metadata: Metadata[];
}

// All products
export const useGelatoProducts = () => {
  return useQuery<GelatoProduct[]>({
    queryKey: ["gelato-products"],
    queryFn: fetchGelatoProduct,
    staleTime: 1000 * 60 * 5,
  });
};

// Single product
export const useGelatoSingleProducts = (id: string) => {
  return useQuery<GelatoProduct>({
    queryKey: ["gelato-product", id],
    queryFn: () => fetchGelatoSingleProduct(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id, // avoid running if id is undefined
  });
};
