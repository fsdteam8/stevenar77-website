"use client";

import * as React from "react";
import {} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import FeatureCard from "../shared/FeatureCard";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Locate,
  Star,
  UserRound,
} from "lucide-react";

// Dummy data (reuse your courses array)
const courses = [
  {
    image: "/asset/card.png",
    title: "Open Water Diver",
    description: "Your entry point into scuba life.",
    rating: 4.8,
    reviews: 32,
    duration: "3-4 days",
    location: "dhaka",
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
    description: "Take the first step to becoming a pro diver.",
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
  {
    image: "/asset/card.png",
    title: "Dive Master",
    description: "Take the first step to becoming a pro diver.",
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

const CourseFeatured = () => {
  const [current, setCurrent] = React.useState(0);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Classes</h2>

      <div className="w-full flex flex-wrap justify-between container  mx-auto">
        {courses.map((course, index) => (
          <div key={index} className="md:w-[48%] ">
            <FeatureCard
              {...course}
              onSeeMore={() => console.log("See More:", course.title)}
              onBookNow={() => console.log("Book Now:", course.title)}
            >
              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Title + Rating */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl md:text-[24px]  font-medium text-[#27303F] leading-[120%]">
                    {course.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{course.rating}</span>
                    <span className="text-[#68706A] font-normal text-[12px] leading-[150%] ">
                      ({course.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Duration + Students */}
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
                <p className="text-[#68706A] font-normal leading-[150%] mt-[10px ] text-sm md:text-[16px] ">
                  {course.description}
                </p>

                {/* Features */}
                <div>
                  <p className="font-medium mb-4 mt-[20px] text-[20px] leading-[120%] text-[#27303F]">
                    Course Includes:
                  </p>
                  <ul className="space-y-2  text-[#68706A]">
                    {course.features.map((feature, index) => (
                      <li
                        key={index}
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
                  <p className="text-xl md:text-[24px] leading-[120%]  font-medium text-gray-900">
                    {course.price}
                  </p>
                </div>

                {/* Buttons */}
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

export default CourseFeatured;
