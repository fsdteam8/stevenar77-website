"use client";
import React from "react";
// import { BookingContent } from "./booking-content";
// import { BookingSummary } from "./booking-summary";
// import { MultiStepForm } from "./multi-step-form";
import { BookingProvider } from "./booking-context";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCourseById, CourseDetail } from "@/lib/course";
import { FillupSummary } from "./fillupSummery";
import { FormContent } from "./FormContent";
// import { DocumentUploadStep } from "./steps/document-upload-step";
import { FormFillup } from "./FormFillup";

const FormFillUpPage = () => {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCourseById(params.id)
        .then((data) => setCourse(data))
        .catch((err) => console.error("Error fetching course:", err))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Course not found</p>
      </div>
    );
  }

  // Map API course to the shape expected by BookingContext
  const initialCourse = {
    id: course._id,
    name: course.title,
    price: course.price[0] || 0,
    age: "All Ages", // replace if you have actual age field
    image: course.image?.url,
    duration: course.duration,
    classDates: course.classDates || [],
    formTitle: course.formTitle || [], // ✅ include this
  };

  return (
    <BookingProvider initialCourse={initialCourse}>
      <div className="min-h-screen bg-[#f8f9fa]">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#343a40] mb-2">
              Book Your Course
            </h1>
            <p className="text-[#6c757d]">
              Complete your booking in just a few steps
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FormContent courseData={course} />
              {/* <DocumentUploadStep /> */}
              <FormFillup />
            </div>
            <div className="lg:col-span-1">
              <FillupSummary courseData={course} />
            </div>
          </div>
        </main>
      </div>
    </BookingProvider>
  );
};

export default FormFillUpPage;
