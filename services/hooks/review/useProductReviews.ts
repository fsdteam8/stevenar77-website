import { getReviewsByProduct } from "@/lib/services/getReviewsByProduct";
import { useQuery } from "@tanstack/react-query";

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProduct(productId),
    enabled: !!productId, // will only fetch if productId is valid
  });
};
