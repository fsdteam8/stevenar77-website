"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { useCourse } from "@/services/hooks/courses/useCourse";
import { Button } from "@/components/ui/button";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params?.id as string;
  const { data: course, isLoading, isError, error } = useCourse(courseId);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleBookNow = () => {
    console.log(`Booking ${quantity} course(s) of ${course?.title}`);
    // Add actual booking logic here
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

  // Get price display - handle price array
  const getPriceDisplay = () => {
    if (!course.price || !Array.isArray(course.price) || course.price.length === 0) {
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

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <section className="pt-20 container mx-auto">
        <div className="px-4 sm:px-8 lg:px-16 py-10 md:py-14 lg:py-16">
          <div className="mx-auto container grid md:grid-cols-2 gap-10 items-start">
            
            {/* Content Section */}
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl text-[#27303F] font-bold mb-6">
                {course.title}
              </h1>
              
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                {course.description}
              </p>

              {/* Features - Course Includes */}
              {course.courseIncludes && course.courseIncludes.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-[#27303F] mb-4">
                    Course Includes:
                  </h3>
                  <ul className="space-y-4">
                    {course.courseIncludes.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span className="text-gray-700 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Booking Section */}
              <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-6">
                    {/* Quantity Controls */}
                    <div className="flex items-center">
                      <Button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        variant="outline"
                        size="sm"
                        disabled={quantity <= 1}
                        className="p-3 border border-gray-300 rounded-md bg-transparent hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </Button>
                      
                      <span className="px-4 py-3 text-lg font-medium text-gray-900 text-center min-w-[60px]">
                        {quantity}
                      </span>
                      
                      <Button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        size="sm"
                        className="p-3 border border-gray-300 bg-teal-600 text-white hover:bg-teal-700 rounded-md"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

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

            {/* Image Section */}
            <div className="rounded-lg overflow-hidden shadow-md order-1 md:order-2">
              <Image
                src={course.image?.url || "/images/course-placeholder.png"}
                alt={course.title}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Course Statistics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {course.avgRating || 0}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {course.totalReviews || 0}
              </div>
              <div className="text-gray-600">Total Reviews</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {course.totalParticipates || 0}
              </div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
          </div>

          {/* Additional Course Details */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-3xl font-montserrat text-[#27303F] mb-6 font-semibold">
              Course Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                <p className="text-gray-600">{course.duration}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Course ID</h3>
                <p className="text-gray-600 font-mono text-sm">{course._id}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Created</h3>
                <p className="text-gray-600">
                  {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Last Updated</h3>
                <p className="text-gray-600">
                  {new Date(course.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;