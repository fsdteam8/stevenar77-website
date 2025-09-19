"use client";

import React from "react";
import { ReviewCard } from "../shared/reviewcard";
import { useReviewsByCourse } from "@/services/hooks/review/useReviews";

interface Props {
  courseId: string;
}

const ReviewShowByCourseID: React.FC<Props> = ({ courseId }) => {
  const { data, isLoading, isError, error } = useReviewsByCourse(courseId);

  if (isLoading) {
    return (
      <p className="px-3 py-6 bg-gray-50 font-semibold text-gray-700 text-center text-sm">
        Loading reviews...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="px-3 py-6 bg-gray-50 font-semibold text-red-500 text-center text-sm">
        Error: {(error as Error).message}
      </p>
    );
  }

  if (!data?.data?.length) {
    return (
      <p className="px-3 py-6 bg-gray-50 font-semibold text-gray-700 text-center text-sm">
        No reviews available for this course yet.
      </p>
    );
  }

  return (
    <div className="bg-[#F8F9FA] py-10">
      <div className="container mx-auto px-4">
        {" "}
        {/* Added padding for mobile */}
        <div className="grid gap-4 md:grid-cols-2 ml-0 md:ml-16">
          {" "}
          {/* Responsive layout & margin */}
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
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewShowByCourseID;
