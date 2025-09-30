"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { useCourse } from "@/services/hooks/courses/useCourse";
import { Button } from "@/components/ui/button";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params?.id as string;
  const { data: course, isLoading, isError, error } = useCourse(courseId);

  const [quantity, setQuantity] = useState(1);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const router = useRouter();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleBookNow = () => {
    if (!course) return;
    router.push(`/courses/book/${course._id}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-center py-10 text-lg">Loading course...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-center py-10 text-red-500 text-lg">
          Error: {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  // Course not found
  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-center py-10 text-lg">Course not found.</p>
      </div>
    );
  }

  // Check if single or multiple prices
  const hasSinglePrice =
    !course.price || !Array.isArray(course.price) || course.price.length <= 1;
  const hasMultiplePrices =
    course.price && Array.isArray(course.price) && course.price.length > 1;

  // Get price display - handle price array
  const getPriceDisplay = () => {
    if (
      !course.price ||
      !Array.isArray(course.price) ||
      course.price.length === 0
    ) {
      return "Price not available";
    }

    if (course.price.length === 1) {
      return `$${course.price[0].toLocaleString()}`;
    }

    // Multiple prices - show range
    const minPrice = Math.min(...course.price);
    const maxPrice = Math.max(...course.price);
    return `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`;
  };

  // Render Single Price Layout (like Image 1)
  const renderSinglePriceLayout = () => (
    <div className="border-t border-gray-200 ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-6">
            {/* Price Display */}
            <div className="text-2xl font-bold text-gray-900">
              {getPriceDisplay()}
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="w-full mt-6">
        <Button
          onClick={handleBookNow}
          className="w-full sm:w-auto text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold px-20 py-6 rounded-lg transition-colors text-lg"
        >
          Book Now
        </Button>
      </div>
    </div>
  );

  // Render Multiple Price Layout (like Image 2)
  const renderMultiplePriceLayout = () => (
    <div className="border-t border-gray-200 pt-8">
      {/* Pricing Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#27303F] mb-6">Pricing</h3>
        <div className="space-y-4">
          {course.price.map((price, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedPriceIndex === index
                  ? "border-teal-600 bg-teal-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPriceIndex(index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {/* You can customize these labels based on your data structure */}
                    {index === 0 && "5 Days Program"}
                    {index === 1 && "3 Days Upgrade"}
                    {index === 2 && "Weekend Special"}
                    {index > 2 && `Option ${index + 1}`}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {/* Add descriptions if available in your data */}
                    {index === 0 &&
                      "Full certification, the gold-guide comfort step by step"}
                    {index === 1 &&
                      "If you already have a 2 dive/tour (bring a p. Third buoyancy or termos)"}
                    {index === 2 && "Weekend intensive program"}
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ${price.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-on Section */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-[#27303F] mb-4">Add-on</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Catalina Weekend</div>
              <div className="text-sm text-gray-600">
                Leisure dig ferry 2 day night (food day)
              </div>
            </div>
            <div className="font-semibold text-gray-900">+$148</div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="w-full">
        <Button
          onClick={handleBookNow}
          className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
        >
          Book Now
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <section className=" container mx-auto">
        <div className="px-4 sm:px-8 lg:px-16 py-4 md:py-14 lg:py-16 space-y-8">
          <div className="">
            {/* Image Section */}
            <div className="relative w-full h-[650px] mx-auto rounded-lg overflow-hidden shadow-md order-1 md:order-2">
              <Image
                src={course.image?.url || "/images/course-placeholder.png"}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="mx-auto container">
            <div className="w-full grid grid-cols-3 gap-5 justify-between items-start">
              <div className="w-full col-span-2 space-y-12">
                {/* Content Section */}
                <div className="order-2 md:order-1">
                  <h1 className="text-4xl md:text-5xl text-[#27303F] font-bold mb-6">
                    {course.title}
                  </h1>
                  <p
                    className="text-gray-700 leading-relaxed text-lg mb-8"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />

                  {/* Features - Course Includes */}
                  {course.courseIncludes &&
                    course.courseIncludes.length > 0 && (
                      <div className="mb-12">
                        <h3 className="text-xl font-semibold text-[#27303F] mb-4">
                          Course Includes:
                        </h3>
                        <ul className="space-y-4">
                          {course.courseIncludes.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                              <span className="text-gray-700 text-lg">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>

              <div className="w-full col-span-1">
                {/* Conditional Pricing Layout */}
                {hasSinglePrice
                  ? renderSinglePriceLayout()
                  : renderMultiplePriceLayout()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
