import { useQuery } from "@tanstack/react-query";
import { getProductById, getGelatoProductById, ProductResponse } from "@/lib/products";

export function useUnifiedProductDetails(productId: string) {
  return useQuery<ProductResponse & { type: "admin" | "gelato" }>({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        const adminProduct = await getProductById(productId);
        return { ...adminProduct, type: "admin" };
      } catch {
        const gelatoProduct = await getGelatoProductById(productId);

        // normalize Gelato product to match ProductResponse.data
        const normalizedData = {
          _id: gelatoProduct.data.id, // fake _id for consistency
          title: gelatoProduct.data.title,
          shortDescription: gelatoProduct.data.description,
          longDescription: gelatoProduct.data.description,
          price: 0,
          images: gelatoProduct.data.previewUrl
            ? [{ public_id: "", url: gelatoProduct.data.previewUrl }]
            : [],
          inStock: true,
          featured: [],
          totalReviews: 0,
          averageRating: 0,
          quantity: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // remove any extra fields not in Product
        };

        // cast to ProductResponse & { type: "gelato" }
        return {
          success: true,
          message: "Gelato product fetched",
          statusCode: 200,
          data: normalizedData,
          type: "gelato",
        } as ProductResponse & { type: "gelato" };
      }
    },
    enabled: !!productId,
  });
}
