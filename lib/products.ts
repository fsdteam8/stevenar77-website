// lib/products.ts
import axios from "axios";

export interface GelatoProduct {
  id: string;
  title: string;
  description: string;
  previewUrl?: string;
  // other gelato-specific fields
}

export interface ProductVariant {
  _id: string;
  title: string;
  price: number;
  quantity?: number; // optional
  image?: { url: string }; // optional
}
export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  images: { public_id: string; url: string }[];
  totalReviews: number;
  averageRating: number;
  // variants?: { _id: string; title: string; price: number }[];
  variants?: ProductVariant[];
  isVariant?: boolean;
  category?: string;
  productQuantity?: number;
  // etc.
}

export interface ProductResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Product;
  // title: string;
}

export async function getProductById(
  productId: string,
): Promise<ProductResponse> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/shop/${productId}`,
  );
  return response.data;
}

export async function getGelatoProductById(
  productId: string,
): Promise<{ data: GelatoProduct }> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/get-price/${productId}`,
  );
  return response.data;
}
