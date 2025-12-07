"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
import { Review } from "@/types/review";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const fullName = `${review.userId?.firstName} ${review.userId?.lastName}`;

  // Format the review creation date
  // const createdAtDate = review.createdAt
  //   ? format(new Date(review.createdAt), "dd MMM yyyy, hh:mm a")
  //   : "Unknown date";

  // Format the purchase date
  const purchaseDateFormatted = review.purchaseDate
    ? format(new Date(review.purchaseDate), " MMM yyyy")
    : "Unknown purchase date";

  const getInitials = (name: string = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0].toUpperCase())
      .join("");

  return (
    <Card className="w-full h-full overflow-hidden bg-white shadow-xs hover:shadow-sm transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="space-y-4 lg:space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Avatar className="h-[70px] w-[70px]">
                {review?.userId?.image?.url ? (
                  <AvatarImage
                    className="object-cover"
                    src={review.userId.image.url}
                    alt={fullName}
                  />
                ) : (
                  <AvatarFallback className="text-xl">
                    {getInitials(
                      `${review?.userId?.firstName} ${review?.userId?.lastName}`,
                    )}
                  </AvatarFallback>
                )}
              </Avatar>

              <div>
                <h3 className="font-semibold text-base sm:text-lg ml-2 text-gray-900 leading-tight">
                  {fullName}
                  <span className="text-sm text-gray-500 ml-3">
                    {purchaseDateFormatted}
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) =>
                  index < review.star ? (
                    <Star
                      key={index}
                      aria-label="Full star"
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ) : (
                    <Star
                      key={index}
                      aria-label="Empty star"
                      className="w-4 h-4 text-gray-300"
                    />
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-600 italic">
            <span className="text-sm">{review.comment}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
