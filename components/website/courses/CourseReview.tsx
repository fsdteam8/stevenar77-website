"use client";

import React from "react";
import ReviewForm from "@/components/website/reusable/ReviewForm";
import { useSubmitReview } from "@/services/hooks/review/useSubmitReview";

interface CourseReviewProps {
  userId: string;
  classId: string;
}

const CourseReview: React.FC<CourseReviewProps> = ({ userId, classId }) => {
  const { mutate, isPending, isError, isSuccess, error } = useSubmitReview();

  const handleReviewSubmit = (reviewData: { rating: number; description: string }) => {
    if (reviewData.rating === 0) {
      return alert("Please select a rating");
    }

    if (!reviewData.description.trim()) {
      return alert("Please enter a description");
    }

    mutate({
      userId: userId || "68bf6996f02adb6fb1fef5a0", // fallback for testing
      classId: classId || "68c4718238865c02fd185b1c", // fallback for testing
      star: reviewData.rating,
      comment: reviewData.description,
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <ReviewForm
        onSubmit={handleReviewSubmit}
        isSubmitting={isPending} // ✅ fixed (use isPending, not isLoading)
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

export default CourseReview;
