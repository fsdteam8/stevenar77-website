// lib/orders.ts
// import { useSession } from "next-auth/react";

export interface Order {
  _id: string;
  userId: string;
  productId: string | null;
  status: "completed" | "cancelled" | string;
  totalPrice: number;
  quantity: number;
  orderDate: string;
  orderTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetOrdersResponse {
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

/**
 * Fetch orders for logged-in user
 * @param accessToken JWT access token
 */
export const getMyOrders = async (accessToken: string): Promise<GetOrdersResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/my-order`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch orders");
  }

  return res.json();
};
