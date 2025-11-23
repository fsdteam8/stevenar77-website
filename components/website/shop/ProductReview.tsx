"use client";

import React from "react";
import ReviewForm from "@/components/website/reusable/ReviewForm";
import { useSubmitProductReview } from "@/services/hooks/review/useSubmitProductReview";

interface ProductReviewProps {
  userId: string;
  productId: string;
}

const ProductReview: React.FC<ProductReviewProps> = ({ userId, productId }) => {
  const { mutate, isPending, isError, isSuccess, error } = useSubmitProductReview();

  const handleReviewSubmit = (reviewData: { rating: number; description: string }) => {
    if (reviewData.rating === 0) {
      return alert("Please select a rating");
    }

    if (!reviewData.description.trim()) {
      return alert("Please enter a description");
    }

    mutate({
      userId: userId,
      productId: productId,
      star: reviewData.rating,
      comment: reviewData.description,
      purchaseDate: new Date().toISOString(), // Assuming current date as purchase date
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <ReviewForm
        onSubmit={handleReviewSubmit}
        isSubmitting={isPending}
        submitStatus={
          isSuccess
            ? { type: "success", message: "Review submitted successfully!" }
            : isError
            ? { type: "error", message: error?.message || "Failed to submit review" }
            : null
        }
      />
    </section>
  );
};

export default ProductReview;
