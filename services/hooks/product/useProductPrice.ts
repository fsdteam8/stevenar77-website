import { getGelatoProductById } from "@/lib/products";
import { useQuery } from "@tanstack/react-query";

export const useProductPrice = (id: string) => {
  return useQuery({
    queryKey: ["productPrice", id],
    queryFn: async () => {
      const res = await getGelatoProductById(id);
      return res.data; // contains the GelatoProduct, including price if available
    },
    enabled: !!id,
  });
};
