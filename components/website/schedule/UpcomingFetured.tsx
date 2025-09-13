"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FeatureCard from "../shared/FeatureCard";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Locate,
  Star,
} from "lucide-react";
import { useCourses } from "@/services/hooks/courses/useCourses";

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

// ----------------------
// Component
// ----------------------
const UpcomingFeatured = () => {
  const router = useRouter();
  const { data: apiCourses, isLoading, isError, error } = useCourses();
  const [current] = React.useState(0);

  const itemsPerPage = 4;
  const totalPages = Math.ceil((apiCourses?.length || 0) / itemsPerPage);

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
      <h2 className="text-3xl font-bold text-center mb-8">
        Upcoming Classes - Quick View
      </h2>

      <div className="w-full flex flex-wrap justify-between container mx-auto">
        {apiCourses?.map((course: CourseData) => (
          <div key={course._id} className="md:w-[48%]">
            <FeatureCard
              image={course.images?.[0]?.url || "/asset/card.png"}
              title={course.title}
              description={course.shortDescription}
              rating={4.5} // placeholder unless API has ratings
              reviews={0} // placeholder unless API has reviews
              duration={course.courseDuration}
              location={course.location || "N/A"}
              students={0} // placeholder unless API has student count
              features={course.features}
              price={`$${course.price.toFixed(2)}`}
              ageRestriction={course.requiredAge ? `${course.requiredAge}+` : ""}
              onSeeMore={() => router.push(`/courses/${course._id}`)} // ✅ navigate to details
              onBookNow={() => console.log("Book Now:", course.title)}
            >
              <div className="p-5 space-y-4">
                {/* Age */}
                {course.requiredAge && (
                  <p className="text-[#0694A2] font-normal leading-[150%]">
                    Age {course.requiredAge}+
                  </p>
                )}

                {/* Title + Rating */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl md:text-[24px] font-medium text-[#27303F] leading-[120%]">
                    {course.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>4.5</span>
                    <span className="text-[#68706A] font-normal text-[12px]">
                      (0 reviews)
                    </span>
                  </div>
                </div>

                {/* Duration + Location */}
                <div className="flex flex-col gap-2 items-start text-sm mt-[10px] text-gray-500">
                  <span className="flex items-center text-[16px] gap-2">
                    <Calendar className="h-4 w-4" />
                    {course.courseDuration}
                  </span>
                  {course.location && (
                    <span className="flex items-center gap-2">
                      <Locate className="h-4 w-4" />
                      <span className="text-[12px] text-[#68706A]">
                        {course.location}
                      </span>
                    </span>
                  )}
                </div>

                {/* Features */}
                <div>
                  <p className="font-medium mb-4 mt-[20px] text-[20px] text-[#27303F]">
                    Course Includes:
                  </p>
                  <ul className="space-y-2 text-[#68706A]">
                    {course.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-[16px] gap-2"
                      >
                        <span className="h-2 w-2 rounded-full bg-cyan-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price + Age */}
                <div className="flex justify-between items-center">
                  <p className="text-xl md:text-[24px] font-medium text-gray-900">
                    ${course.price.toFixed(2)}
                  </p>
                  {course.requiredAge && (
                    <span className="text-xs text-[#0694A2] font-normal">
                      Age {course.requiredAge}+
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

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
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

export default UpcomingFeatured;
