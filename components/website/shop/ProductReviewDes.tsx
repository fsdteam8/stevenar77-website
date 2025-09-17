"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqSection from "../faq/faq";
import { ReviewCard } from "../shared/reviewcard";
import { useProductReviews } from "@/services/hooks/review/useProductReviews";
import { Review } from "@/types/review";

const dataArray = [
  { description: "Triple-lens design for maximum field of view" },
  { description: "Advanced anti-fog coating technology" },
  { description: "Liquid silicone skirt for superior comfort" },
  { description: "Easy-adjust buckle system" },
  { description: "Low-volume design reduces drag" },
  { description: "Available in multiple colors" },
  { description: "Professional diver tested and approved" },
];

const ProductReviewDes: React.FC = () => {
  const params = useParams();
  const productId = params?.id as string;

  const { data, isLoading, isError, error } = useProductReviews(productId);

  const itemsPerColumn = Math.ceil(dataArray.length / 3);
  const columns = [
    dataArray.slice(0, itemsPerColumn),
    dataArray.slice(itemsPerColumn, itemsPerColumn * 2),
    dataArray.slice(itemsPerColumn * 2, itemsPerColumn * 3),
  ];

  const reviews: Review[] = data?.data || [];

  return (
    <div className="mx-auto container">
      <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          {/* Description Tab */}
          <TabsContent value="description">
            <div className="space-y-8 lg:space-y-20">
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Product Features</h2>
                <div className="des-point py-10 flex flex-col md:flex-row md:gap-6">
                  {columns.map((col, colIndex) => (
                    <div key={colIndex} className="flex-1">
                      {col.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <span className="h-2 w-2 bg-primary rounded-full inline-block mr-2" />
                          <span className="text-[#343A40]">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="text-[#68706A] leading-relaxed text-sm md:text-base">
                  Contrary to popular belief, Lorem Ipsum is not simply random text.
                  It has roots in a piece of classical Latin literature...
                </p>
              </div>
              <FaqSection />
            </div>
          </TabsContent>

          {/* Review Tab */}
          <TabsContent value="review">
            {isLoading && (
              <p className="text-center text-gray-500">Loading reviews...</p>
            )}
            {isError && (
              <p className="text-center text-red-500">
                {error instanceof Error ? error.message : "Error fetching reviews"}
              </p>
            )}
            {!isLoading && reviews.length === 0 && (
              <p className="text-center text-gray-400">No reviews yet.</p>
            )}
            <div className="grid grid-cols-1 py-10 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductReviewDes;
