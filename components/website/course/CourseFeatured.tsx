"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import FeatureCard from "../shared/FeatureCard";
import { ChevronLeft, ChevronRight, Clock, Locate, Star } from "lucide-react";
import { useCourses } from "@/services/hooks/courses/useCourses";
import { useRouter } from "next/navigation"; 

// ----------------------
// Types
// ----------------------
interface CourseData {
  _id: string;
  title: string;
  shortDescription: string;
  courseDuration: string;
  location?: string;
  requiredAge?: number;
  price: number;
  features: string[];
  images?: { public_id: string; url: string }[];
}

interface Course {
  id: string;
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  location: string;
  students: number;
  features: string[];
  price: string;
  ageRestriction?: string;
}

// ----------------------
// Component
// ----------------------
const CourseFeatured: React.FC = () => {
  const { data: apiCourses, isLoading, isError, error } = useCourses();
  const [current] = React.useState(0);
  const router = useRouter();

  // Map API response to FeatureCard format
  const courses: Course[] = React.useMemo(() => {
    return apiCourses?.map((c: CourseData) => ({
      id: c._id,
      image: c.images?.[0]?.url || "/asset/card.png", // Use first image or fallback
      title: c.title,
      description: c.shortDescription,
      rating: 4.5, // Placeholder, replace if API provides rating
      reviews: 0, // Placeholder, replace if API provides reviews
      duration: c.courseDuration,
      location: c.location || "N/A",
      students: 0, // Placeholder, replace if API provides student count
      features: c.features || [],
      // price: `$${c.price.toFixed(2)}`,
      price: c.price != null ? `$${Number(c.price).toFixed(2)}` : "N/A",
      ageRestriction: c.requiredAge ? `${c.requiredAge}+` : undefined,
    })) || [];
  }, [apiCourses]);

  if (isLoading)
    return <p className="text-center py-10">Loading courses...</p>;

  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Error: {error?.message}
      </p>
    );

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Classes</h2>

      <div className="w-full flex flex-wrap justify-between container mx-auto">
        {courses.map((course) => (
          <div key={course.id} className="md:w-[48%]">
            <FeatureCard
              {...course}
              onSeeMore={() => router.push(`/courses/${course.id}`)}
              onBookNow={() => router.push(`/courses/book/${course.id}`)}
            >
              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Title + Rating */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl md:text-[24px] font-medium text-[#27303F] leading-[120%]">
                    {course.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{course.rating}</span>
                    <span className="text-[#68706A] font-normal text-[12px] leading-[150%]">
                      ({course.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Duration + Location */}
                <div className="flex gap-2 items-center text-sm mt-[10px] text-gray-500">
                  <span className="flex items-center text-[16px] text-[#68706A] leading-[150%] gap-2">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <Locate className="h-4 w-4" />
                    <span className="text-[12px] text-[#68706A]">
                      {course.location}
                    </span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#68706A] font-normal leading-[150%] mt-[10px] text-sm md:text-[16px]">
                  {course.description}
                </p>

                {/* Features */}
                <div>
                  <p className="font-medium mb-4 mt-[20px] text-[20px] leading-[120%] text-[#27303F]">
                    Course Includes:
                  </p>
                  <ul className="space-y-2 text-[#68706A]">
                    {course.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-[16px] font-normal gap-2"
                      >
                        <span className="h-2 w-2 rounded-full bg-cyan-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price + Age */}
                <div className="flex justify-end items-center">
                  <p className="text-xl md:text-[24px] leading-[120%] font-medium text-gray-900">
                    {course.price}
                  </p>
                  {course.ageRestriction && (
                    <span className="text-xs text-[#0694A2] font-normal ml-2">
                      Age {course.ageRestriction}
                    </span>
                  )}
                </div>
              </div>
            </FeatureCard>
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button variant="outline" size="icon">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(courses.length / 4) }).map((_, i) => (
            <button
              key={i}
              className={`h-3 w-3 rounded-full ${
                i === current ? "bg-teal-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <Button variant="outline" size="icon">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default CourseFeatured;
