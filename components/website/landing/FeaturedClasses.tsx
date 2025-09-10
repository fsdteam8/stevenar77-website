"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import FeatureCard from "../shared/FeatureCard";
import { ChevronLeft, ChevronRight, Clock, Star, UserRound } from "lucide-react";

// ----------------------
// Types
// ----------------------
interface Course {
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  students: number;
  features: string[];
  price: string;
  ageRestriction?: string;
}

// interface FeatureCardProps {
//   image: string;
//   title: string;
//   description: string;
//   rating: number;
//   reviews: number;
//   duration: string;
//   students: number;
//   features: string[];
//   price: string;
//   ageRestriction?: string;
//   onSeeMore: () => void;
//   onBookNow: () => void;
//   children?: React.ReactNode;
// }

// ----------------------
// Data
// ----------------------
const courses: Course[] = [
  {
    image: "/asset/card.png",
    title: "Open Water Diver",
    description: "Your entry point into scuba life.",
    rating: 4.8,
    reviews: 32,
    duration: "3-4 days",
    students: 156,
    features: [
      "Instructor-led practice",
      "2 dives at Catalina",
      "Certification paperwork",
      "Certificate of participation",
    ],
    price: "$999",
    ageRestriction: "10+",
  },
  {
    image: "/asset/card.png",
    title: "Advanced Open Water",
    description: "Level up your diving with advanced techniques.",
    rating: 4.7,
    reviews: 28,
    duration: "5 days",
    students: 120,
    features: [
      "Deep diving",
      "Navigation skills",
      "Wreck dive",
      "Certification paperwork",
    ],
    price: "$1,299",
    ageRestriction: "15+",
  },
  {
    image: "/asset/card.png",
    title: "Rescue Diver",
    description: "Learn how to prevent and manage diving emergencies.",
    rating: 4.9,
    reviews: 40,
    duration: "6 days",
    students: 90,
    features: [
      "Rescue scenarios",
      "Emergency training",
      "Dive accident management",
      "Certification paperwork",
    ],
    price: "$1,499",
    ageRestriction: "15+",
  },
  {
    image: "/asset/card.png",
    title: "Dive Master",
    description:
      "Take the first step to becoming a pro diver hello how are you bro coming a pro diver hello how are you bro.",
    rating: 5.0,
    reviews: 50,
    duration: "2-3 weeks",
    students: 60,
    features: [
      "Professional training",
      "Leadership skills",
      "Assisting instructors",
      "Certification paperwork",
    ],
    price: "$2,499",
    ageRestriction: "18+",
  },
];

// ----------------------
// Component
// ----------------------
const FeaturedClasses: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState<number>(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  return (
    <section className="py-10">
      <h2 className="text-3xl md:text-[48px] font-semibold text-center font-montserrat mb-8">Featured Classes</h2>
      <p className="text-3xl md:text-[48px] font-semibold text-center font-montserrat mb-8">Start your scuba journey with our comprehensive PADI certified courses</p>
      <Carousel setApi={setApi} className="w-full container mx-auto">
        <CarouselContent className="flex items-stretch">
          {courses.map((course, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 h-full lg:basis-1/3"
            >
              <FeatureCard
                {...course} // spreads all typed course fields
                onSeeMore={() => console.log("See More:", course.title)}
                onBookNow={() => console.log("Book Now:", course.title)}
              >
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

                  {/* Description */}
                  <p className="text-[#68706A] font-normal leading-[150%] mt-[10px] text-sm md:text-[16px]">
                    {course.description}
                  </p>

                  {/* Duration + Students */}
                  <div className="flex justify-between items-center text-sm mt-[10px] text-gray-500">
                    <span className="flex items-center text-[16px] text-[#68706A] leading-[150%] gap-2">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center font-normal gap-2 mt-[10px]">
                      <UserRound className="h-4 w-4" />
                      <span className="text-[12px] text-[#68706A]">
                        {course.students} Students
                      </span>
                    </span>
                  </div>

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
                  <div className="flex justify-between items-center">
                    <p className="text-xl md:text-[24px] leading-[120%] font-medium text-gray-900">
                      {course.price}
                    </p>
                    {course.ageRestriction && (
                      <span className="text-xs text-[#0694A2] font-normal">
                        Age {course.ageRestriction}
                      </span>
                    )}
                  </div>
                </div>
              </FeatureCard>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bottom Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`h-3 w-3 rounded-full ${
                i === current ? "bg-teal-600" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default FeaturedClasses;
