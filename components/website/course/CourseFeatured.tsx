"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import FeatureCard from "../shared/FeatureCard";
import { Clock, Locate, Star } from "lucide-react";
import { useCourses } from "@/services/hooks/courses/useCourses";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// ----------------------
// Types - Updated to match actual API response
// ----------------------
interface CourseData {
  _id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  courseDuration?: string;
  duration?: string;
  location?: string;
  requiredAge?: number;
  price: number | number[];
  features?: string[];
  image?: { public_id: string; url: string }; // ✅ single image, not array
  courseIncludes?: string[];
  avgRating?: number;
  totalReviews?: number;
  participates?: number;
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
  const { data: apiCourses, isLoading, isError, error } = useCourses(); // Removed explicit type argument
  // const [current] = React.useState(0);
  const router = useRouter();

  // Map API response to FeatureCard format with better error handling
  const courses: Course[] = React.useMemo(() => {
    if (!apiCourses || !Array.isArray(apiCourses)) return [];

    return apiCourses.map(
      (c: CourseData): Course => ({
        id: c._id,
        image: c.image?.url || "/asset/card.png", // ✅ fixed
        title: c.title || "Untitled Course",
        description:
          c.shortDescription || c.description || "No description available",
        rating: c.avgRating ?? 0, // ✅ use API rating
        reviews: c.totalReviews ?? 0, // ✅ use API reviews
        duration: c.courseDuration || c.duration || "Duration not specified",
        location: c.location || "Location not specified",
        students: c.participates ?? 0, // ✅ use API participates
        features: c.courseIncludes || [], // ✅ matches API key
        price:
          Array.isArray(c.price) && c.price.length > 0
            ? `$${Number(c.price[0]).toFixed(2)}`
            : c.price != null
              ? `$${Number(c.price).toFixed(2)}`
              : "Price not available",
        ageRestriction: c.requiredAge ? `${c.requiredAge}+` : undefined,
      }),
    );
  }, [apiCourses]);

  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const handleBookNow = (courseId: string) => {
    const redirectPath = `/courses/book/${courseId}`;

    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", redirectPath);
      setShowLoginModal(true);
    } else {
      router.push(redirectPath);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading courses...</p>;

  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Error:{" "}
        {error instanceof Error ? error.message : "Failed to load courses"}
      </p>
    );

  if (!courses.length)
    return (
      <p className="text-center py-10">No courses available at the moment.</p>
    );

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Classes</h2>

      <div className="w-full flex flex-wrap justify-between items-stretch container mx-auto">
        {courses.map((course) => (
          <div key={course.id} className="md:w-[48%]">
            <FeatureCard
              {...course}
              onSeeMore={() => router.push(`/courses/${course.id}`)}
              onBookNow={() => handleBookNow(course.id)}
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

                <p
                  className="text-[#68706A] font-normal leading-[150%] mt-[10px] text-sm md:text-[16px]"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />

                {/* Features */}
                {/* {course.features.length > 0 && (
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
                )} */}

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
      {/* <div className="flex items-center justify-center gap-4 mt-6">
        <Button variant="outline" size="icon">
          <ChevronLeft className="w-5 h-5" />
        </Button>
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
      </div> */}

      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="!max-w-xl">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to book this course. Please login to
              continue.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowLoginModal(false);
                router.push("/login");
              }}
            >
              Login Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CourseFeatured;
