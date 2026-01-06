"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
// import FeatureCard from "../shared/FeatureCard";
import { ChevronLeft, ChevronRight, Clock, Star, Target } from "lucide-react";
import { useCourses } from "@/services/hooks/courses/useCourses";
import { CourseData } from "@/lib/courseApi";
import { useRouter } from "next/navigation";
import FeatureCard from "../shared/FeatureCard";
import { Skeleton } from "@/components/ui/skeleton";

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
      location: c.location || "Location TBD",
      features: Array.isArray(c.courseIncludes) ? c.courseIncludes : [],
      // Handle price array - take first price or calculate average
      price:
        Array.isArray(c.price) && c.price.length > 0
          ? `${Number(c.price[0]).toFixed(2)}`
          : "Contact for Price",
      ageRestriction: "16+", // Default since not in API
      // location: "Location TBD", // Default since not in API
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

  const [showLoginModal, setShowLoginModal] = React.useState(false);

  // ✅ Loading & Error state with better error handling
  if (isLoading) {
    return (
      <section className="py-10">
        <h2 className="text-3xl md:text-[48px] font-semibold text-center font-montserrat mb-4">
          Featured Classes
        </h2>
        <div className="flex justify-center items-center h-64">
          <Skeleton className="h-8 w-[150px] mb-4" /> {/* Skeleton for the title */}
          <Skeleton className="h-4 w-[300px] mb-6" /> {/* Skeleton for the description */}
          <Carousel setApi={setApi} className="container mx-auto">
            <CarouselContent className="">
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 flex flex-col items-stretch"
                >
                  <Skeleton className="h-[320px] w-full rounded-lg" /> {/* Skeleton for the course image */}
                  <div className="p-5 space-y-4">
                    <Skeleton className="h-[20px] w-[60%] bg-gray-300" /> {/* Skeleton for title */}
                    <Skeleton className="h-[18px] w-[30%] bg-gray-300" /> {/* Skeleton for rating */}
                    <Skeleton className="h-[60px] w-full bg-gray-300 mt-2" /> {/* Skeleton for description */}
                    <Skeleton className="h-[20px] w-[40%] bg-gray-300 mt-4" /> {/* Skeleton for duration */}
                    <Skeleton className="h-[20px] w-[40%] bg-gray-300 mt-2" /> {/* Skeleton for location */}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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

      <Carousel setApi={setApi} className="container  mx-auto">
        <CarouselContent className="">
          {courses.map((course) => (
            <CarouselItem
              key={course.id}
              className="md:basis-1/2 lg:basis-1/3 flex flex-col items-stretch"
            >
              <FeatureCard
                {...course}
                onSeeMore={() => router.push(`/courses/${course.id}`)}
                onBookNow={() => router.push(`/courses/${course.id}`)}
              >
                <div className="p-5 space-y-4 ">
                  {/* Title + Rating */}
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-xl md:text-[24px] font-medium text-[#27303F] leading-[120%] flex-1">
                      {course.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 gap-1 flex-shrink-0">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{course.rating.toFixed(1)}</span>
                      <span className="text-[#68706A] font-normal text-[12px] leading-[150%]">
                        {/* ({course.reviews} reviews) */}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[#68706A] leading-[150%] text-sm md:text-[16px] line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />

                  {/* Duration + Students */}
                  <div className="flex flex-wrap gap-2 justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center text-[16px] text-[#68706A] gap-2">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center text-[16px] text-[#68706A] gap-2">
                      <Target className="h-4 w-4" />
                      {course.location}
                    </span>
                  </div>

                  {/* Price + Age */}
                  <div className="flex justify-between items-center"></div>
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

      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="!max-w-xl">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              {/* You need to be logged in to book this course. Please login to
              continue. */}
              Please login to access your account, book a course and/or trip,
              leave a review, send a chat, and/or shop for products!
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

export default FeaturedClasses;
