// src/hooks/useCart.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCart, getCart, proceedToPayment } from "@/lib/api";
import { ProceedToPaymentData } from "@/types/cart";

export const useCart = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID is required to fetch cart");
      return getCart(userId);
    },
    enabled: !!userId,
    refetchInterval: 5000,
  });
};
// cart delete
export const useDeleteCart = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: string) => deleteCart(cartId),
    onSuccess: () => {
      // Invalidate the cart query to auto-refresh
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
    onError: (error) => {
      console.error("Failed to delete cart:", error);
    },
  });
};

// Proceed to Payment cart checkout
export const useProceedToPayment = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProceedToPaymentData) => proceedToPayment(data),
    onSuccess: () => {
      // Invalidate the cart query to auto-refresh
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
    onError: (error) => {
      console.error("Failed to proceed to payment:", error);
    },
  });
};
