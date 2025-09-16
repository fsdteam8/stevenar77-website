"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface Order {
  _id: string;
  userId: string;
  productId: string | null;
  status: string;
  totalPrice: number;
  quantity: number;
  orderData: string;
  orderTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyOrdersResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Order[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
}

export const useMyOrders = () => {
  const { data: session } = useSession();

  return useQuery<MyOrdersResponse, Error>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      if (!session?.accessToken) throw new Error("Not logged in");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/my-order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Failed to fetch orders");
      }

      return res.json();
    },
    enabled: !!session?.accessToken,
  });
};
