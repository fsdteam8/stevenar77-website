// lib/shop.ts
import { GelatoProduct } from "@/services/hooks/product/useGelatoProducts";
import axios from "axios";
import { addWeeks } from "date-fns";
import { FaBaby } from "react-icons/fa";

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

export async function fetchGelatoProduct(): Promise<GelatoProduct[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/product`
    );
    return res.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw new Error("Failed to fetch products");
  }
}

export async function fetchGelatoSingleProduct(id: string): Promise<GelatoProduct> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/product/get-price/${id}`
    );
    return res.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw new Error("Failed to fetch single product");
  }
}