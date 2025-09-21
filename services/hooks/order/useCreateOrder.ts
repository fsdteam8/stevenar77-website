// services/hooks/order/useCreateOrder.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

interface CreateOrderPayload {
  productId: string;
  quantity: number;
  image?: File; // single file
}

export const useCreateOrder = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({ productId, quantity, image }: CreateOrderPayload) => {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("quantity", String(quantity));

      // append the single file under 'image'
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/order/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken || ""}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
  });
};
