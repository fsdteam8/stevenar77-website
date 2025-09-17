import Rescuedivers from "@/components/website/courses/Rescuedivers";
import CourseReview from "@/components/website/courses/CourseReview";
import Hero from "@/components/website/shared/Hero";
import React from "react";
import ReviewShowByCourseID from "@/components/website/courses/ReviewShowByCourseID";

// ✅ Page receives params from Next.js routing
interface PageProps {
  params: { id: string }; // dynamic segment e.g. /courses/[id]
}

export default function Page({ params }: PageProps) {
  // Get classId from route
  const classId = params.id;

  // TODO: Replace with real userId from auth (e.g. NextAuth session)
  const userId = "68bf6996f02adb6fb1fef5a0";

  return (
    <div>
      <Hero
        title="Course Details"
        subtitle="Start your underwater adventure with our comprehensive courses."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
      <Rescuedivers />

      <ReviewShowByCourseID courseId={classId} />

      <CourseReview userId={userId} classId={classId} />
    </div>
  );
}
