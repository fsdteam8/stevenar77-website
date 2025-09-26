"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
// import FeatureCard from "../shared/FeatureCard";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  UserRound,
} from "lucide-react";
import { useCourses } from "@/services/hooks/courses/useCourses";
import { CourseData } from "@/lib/courseApi";

// Type for the mapped course data used in the component
// interface MappedCourse {
//   id: string;
//   image: string;
//   title: string;
//   description: string;
//   rating: number;
//   reviews: number;
//   duration: string;
//   students: number;
//   features: string[];
//   price: string;
//   ageRestriction: string;
//   location: string;
// }
import { useRouter } from "next/navigation";
import FeatureCard from "../shared/FeatureCard";

const FeaturedClasses: React.FC = () => {
  const { data: apiCourses, isLoading, isError, error } = useCourses();
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState<number>(0);
  const router = useRouter();

  // ✅ Map API response to match actual CourseData structure
  const courses = React.useMemo(() => {
    if (!apiCourses || !Array.isArray(apiCourses)) return [];

    return apiCourses.map((c: CourseData) => ({
      id: c._id,
      image: c.image?.url || "/asset/card.png",
      title: c.title || "Untitled Course",
      description: c.description || "No description available",
      rating: c.avgRating || 4.5,
      reviews: c.totalReviews || 0,
      duration: c.duration || "Duration TBD",
      students: c.totalParticipates || 0,
      features: Array.isArray(c.courseIncludes) ? c.courseIncludes : [],
      // Handle price array - take first price or calculate average
      price:
        Array.isArray(c.price) && c.price.length > 0
          ? `${Number(c.price[0]).toFixed(2)}`
          : "Contact for Price",
      ageRestriction: "16+", // Default since not in API
      location: "Location TBD", // Default since not in API
    }));
  }, [apiCourses]);

  // ✅ Carousel selection tracking
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect(); // Set initial value

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Calculate total items and pages for dots
  const totalItems = courses.length;
  const itemsPerView = 3; // Adjust based on your carousel settings
  const totalDots = Math.max(1, totalItems - itemsPerView + 1);
  // Navigate to course details
  const onSeeMore = (id: string) => {
    router.push(`/courses/${id}`);
  };

  // ✅ Loading & Error state with better error handling
  if (isLoading) {
    return (
      <section className="py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-center text-gray-600">Loading classes...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-center text-red-500">
            Error loading classes: {error?.message || "Something went wrong"}
          </p>
        </div>
      </section>
    );
  }

  // Handle empty state
  if (!courses || courses.length === 0) {
    return (
      <section className="py-10">
        <h2 className="text-3xl md:text-[48px] font-semibold text-center font-montserrat mb-4">
          Featured Classes
        </h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-center text-gray-600">
            No classes available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <h2 className="text-3xl md:text-[48px] font-semibold text-center font-montserrat mb-4">
        Featured Classes
      </h2>
      <p className="text-center mb-8 text-gray-600">
        Start your scuba journey with our comprehensive PADI certified courses
      </p>

      <Carousel setApi={setApi} className="w-full container mx-auto">
        <CarouselContent className="flex items-stretch">
          {courses.map((course) => (
            <CarouselItem
              key={course.id}
              className="md:basis-1/2 lg:basis-1/3 h-full"
            >
              <FeatureCard
                {...course}
                onSeeMore={() => router.push(`/courses/${course.id}`)}
                onBookNow={() => router.push(`/courses/book/${course.id}`)}
              >
                <div className="p-5 space-y-4">
                  {/* Title + Rating */}
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-xl md:text-[24px] font-medium text-[#27303F] leading-[120%] flex-1">
                      {course.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 gap-1 flex-shrink-0">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{course.rating}</span>
                      <span className="text-[#68706A] font-normal text-[12px] leading-[150%]">
                        ({course.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[#68706A] leading-[150%] text-sm md:text-[16px] line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />

                  <Button
                    onClick={() => router.push(`/courses/${course.id}`)}
                    className="text-cyan-600 bg-transparent hover:bg-gray-50 hover:underline text-sm font-semibold"
                    aria-label={`See more about ${course.title}`}
                  >
                    See more
                  </Button>

                  {/* Duration + Students */}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center text-[16px] text-[#68706A] gap-2">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center font-normal gap-2">
                      <UserRound className="h-4 w-4" />
                      <span className="text-[12px] text-[#68706A]">
                        {course.students} Students
                      </span>
                    </span>
                  </div>

                  {/* Features */}
                  {course.features.length > 0 && (
                    <div>
                      <p className="font-medium mb-4 text-[20px] text-[#27303F]">
                        Course Includes:
                      </p>

                      <ul className="space-y-2 text-[#68706A]">
                        {course.features.slice(0, 2).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-[16px] gap-2"
                          >
                            <span className="h-2 w-2 rounded-full bg-cyan-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* "See more" only if features > 3 */}
                      {course.features.length > 3 && (
                        <Button
                           onClick={() => onSeeMore(course.id)} // pass the course ID
                          className="mt-3 text-cyan-600 bg-transparent hover:bg-gray-200 text-sm font-semibold"
                        >
                          See more
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Price + Age */}
                  <div className="flex justify-between items-center">
                    <p className="text-xl md:text-[24px] font-medium text-gray-900">
                      ${course.price}
                    </p>
                    <span className="text-xs text-[#0694A2] font-normal">
                      Age {course.ageRestriction}
                    </span>
                  </div>
                </div>
              </FeatureCard>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bottom Controls - Only show if there are enough items */}
      {totalItems > itemsPerView && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            disabled={current === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                className={`h-3 w-3 rounded-full transition-colors ${
                  i === current ? "bg-teal-600" : "bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollNext()}
            disabled={current >= totalDots - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </section>
  );
};

export default FeaturedClasses;
