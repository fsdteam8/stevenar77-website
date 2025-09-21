import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

// Types for unified product
type GelatoProduct = {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
//eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any[];
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type AdminProduct = {
  _id: string;
  title: string;
  longDescription: string;
  images: { url: string }[];
  price: number;
  quantity: number;
  totalReviews: number;
  averageRating: number;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type UnifiedProduct =
  | { type: "gelato"; data: GelatoProduct }
  | { type: "admin"; data: AdminProduct };

// Simple check: Gelato IDs are UUIDs (contain hyphens)
const isGelatoProduct = (id: string) => id.includes("-");

export const useUnifiedProductDetails = (
  id: string
): UseQueryResult<UnifiedProduct, unknown> => {
  return useQuery<UnifiedProduct>(
    {
      queryKey: ["product", id],
      queryFn: async () => {
        if (isGelatoProduct(id)) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/product/get-price/${id}`
          );
          return { type: "gelato", data: res.data.data };
        } else {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shop/${id}`);
          return { type: "admin", data: res.data.data };
        }
      },
      staleTime: 5 * 60 * 1000, // optional: 5 mins
    }
  );
};
