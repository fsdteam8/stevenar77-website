import axios from "axios";

export interface Variant {
  _id: string;
  name: string;
  price: number;
  stock?: number;
}

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
  variants?: Variant[]; // optional
  metadata?: Record<string, unknown>[];
}

export interface ProductResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Product;
}

export async function getProductById(
  productId: string,
): Promise<ProductResponse> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`,
  );
  return response.data as ProductResponse;
}
/**
 * Get product price dynamically
 */
export async function getProductPrice(
  id: string,
): Promise<ApiResponse<Product>> {
  const response = await axios.get<ApiResponse<Product>>(
    `${process.env.NEXT_PUBLIC_API_URL}/product/get-price/${id}`,
  );
  return response.data;
}
interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}