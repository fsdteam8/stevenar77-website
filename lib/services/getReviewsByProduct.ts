import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // e.g. https://stavenar77

// Fetch reviews by productId
export const getReviewsByProduct = async (productId: string) => {
  const response = await axios.get(`${BASE_URL}/reviews/product/${productId}`);
  return response.data;
};
