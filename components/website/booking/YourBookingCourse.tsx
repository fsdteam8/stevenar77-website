"use client";
import React, { useState } from "react";
import BookingCourseLeft from "./BookingCourseLeft";
import BookingCourseRight from "./BookingCourseRight";
import { BookingData, Course } from "@/lib/type";


const YourBookingCourse: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const handleCourseSelect = (course: Course, formData: BookingData) => {
    setSelectedCourse(course);
    setBookingData(formData);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-[50px]">
          <h1 className="text-3xl lg:text-[48px] font-semibold leading-[150%] text-[#27303F] font-montserrat">
            Book Your Course
          </h1>
          <p className="text-[#6B7280] leading-[150%] font-normal text-[16px] mt-2">
            Complete your booking in just a few steps
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start lg:flex-row gap-8">
          {/* LEFT */}
          <BookingCourseLeft onCourseSelect={handleCourseSelect} />

          {/* RIGHT */}
          <BookingCourseRight
            selectedCourse={selectedCourse}
            bookingData={bookingData}
          />
        </div>
      </div>
    </section>
  );
};

export default YourBookingCourse;
