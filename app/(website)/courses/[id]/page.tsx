import Rescuedivers from "@/components/website/courses/Rescuedivers";
import CourseReview from "@/components/website/courses/CourseReview";
// import Hero from "@/components/website/shared/Hero";
import React from "react";
import ReviewShowByCourseID from "@/components/website/courses/ReviewShowByCourseID";
// import { useSession } from "next-auth/react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const classId = resolvedParams.id;

  return (
    <div>
      <Rescuedivers />
      <ReviewShowByCourseID courseId={classId} />
      <CourseReview classId={classId} />
    </div>
  );
}

