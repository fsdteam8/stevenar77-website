// services/hooks/orders/useMyOrders.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useMyOrders = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["myOrders", session?.accessToken], // refetch if token changes
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/my-order`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken || ""}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!session?.accessToken, // don’t run until token is ready
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
