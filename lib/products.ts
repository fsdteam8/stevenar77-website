// lib/products.ts
import axios from "axios";

export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  images: { public_id: string; url: string }[];
  category: string;
  longDescription: string;
  inStock: boolean;
  featured: string[];
  totalReviews: number;
  averageRating: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Product;
}

export async function getProductById(productId: string): Promise<ProductResponse> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
  );
  return response.data as ProductResponse;
}
