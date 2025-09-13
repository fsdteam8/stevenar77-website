// lib/shop.ts
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

export interface CategoryCount {
  _id: string;
  count: number;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    products: Product[];
    categoryCounts: CategoryCount[];
    meta: {
      totalProducts: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product`
  );
  return response.data;
}
