import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

interface CreateOrderPayload {
  productId: string;
  quantity: number;
  color: string;
  image?: File;
}

export const useCreateOrder = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({ productId, quantity, color, image }: CreateOrderPayload) => {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("quantity", String(quantity));
      formData.append("color", color); 
      if (image) formData.append("image", image);  

      // console.log(formData)

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
