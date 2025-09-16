"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useParams } from "next/navigation"; // Next 13+ dynamic routing
import { Plus, Minus } from "lucide-react";
import { useCourse } from "@/services/hooks/courses/useCourse";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Rescuedivers = () => {
  const params = useParams();
  const courseId = params?.id as string; // dynamic route: /courses/[id]
  const { data: course, isLoading, isError, error } = useCourse(courseId);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleBookNow = () => {
    console.log(`Booking ${quantity} course(s) of ${course?.title}`);
  };

  if (isLoading) return <p className="text-center py-10">Loading course...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">{error?.message}</p>;
  if (!course) return <p className="text-center py-10">Course not found.</p>;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <section className="pt-20 container mx-auto">
        <div className="px-4 sm:px-8 lg:px-16 py-10 md:py-14 lg:py-16 ">
          <div className="mx-auto container grid md:grid-cols-2 gap-10 items-start">
            {/* Text */}
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl text-[#27303F] font-bold mb-6">
                {course.title}
              </h1>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                {course.longDescription}
              </p>

              {/* Features */}
              <div className="mb-12">
                <ul className="space-y-4">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking */}
              <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      <Button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-3 border border-gray-300 rounded-md bg-transparent hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </Button>
                      <span className="px-4 py-3 text-lg font-medium  text-gray-900 text-center">
                        {quantity}
                      </span>
                      <Button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-3 border border-gray-300 bg-teal-600 text-white hover:bg-teal-700 rounded-md"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${course.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
                <div className="w-3/4 mt-6">
                  <div className="w-full mt-5 sm:mt-0">
                    <Link href="courses/book/${course_id}"></Link>
                    <Button
                      onClick={handleBookNow}
                      className="min-w-full sm:w-auto    text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold px-20 py-6 flex items-center rounded-lg transition-colors text-lg"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
            </div>

            {/* Image */}
            <div className="rounded-lg  overflow-hidden shadow-md order-1 md:order-2">
              <Image
                src={course.images?.[0]?.url || "/images/rescue-image.png"}
                alt={course.title}
                width={400}
                height={400}
                className="object-cover  w-full h-full"
              />
            </div>
          </div>

          {/* Additional Descriptions */}
          <div className="mt-10 text-start">
            <h2 className="text-3xl font-montserrat text-[#27303F] mb-4 font-semibold">
              Course Details
            </h2>
            <p className="text-base text-gray-500">{course.shortDescription}</p>
            <p className="mt-4 text-base text-gray-500">
              Duration: {course.courseDuration}
            </p>
            <p className="text-base text-gray-500">
              Location: {course.location}
            </p>
            <p className="text-base text-gray-500">
              Age Requirement: {course.requiredAge}+
            </p>
            <p className="text-base text-gray-500">
              Max Depth: {course.maxDepth}m
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rescuedivers;
