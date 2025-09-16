"use client";

import React from "react";
import { ReviewCard } from "../shared/reviewcard";
import { useReviewsByCourse } from "@/services/hooks/review/useReviews";

interface Props {
  courseId: string;
}

const ReviewShowByCourseID: React.FC<Props> = ({ courseId }) => {
  const { data, isLoading, isError, error } = useReviewsByCourse(courseId);

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p className="text-red-500">Error: {(error as Error).message}</p>;

  if (!data?.data?.length) {
    return <p className="text-gray-500">No reviews available for this course yet.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.data.map((review) => (
        <ReviewCard
          key={review._id}
          review={{
            _id: review._id,
            userId: {
              _id: review.userId._id,
              firstName: review.userId.firstName || "Unknown",
              lastName: review.userId.lastName || "",
              email: review.userId.email || "",
            },
            star: review.star,
            comment: review.comment,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            __v: review.__v,
            // facility and productId are optional -> left out
          }}
        />
      ))}
    </div>
  );
};

export default ReviewShowByCourseID;
