import Rescuedivers from "@/components/website/courses/Rescuedivers";
import CourseReview from "@/components/website/courses/CourseReview";
// import Hero from "@/components/website/shared/Hero";
import React from "react";
import ReviewShowByCourseID from "@/components/website/courses/ReviewShowByCourseID";
// import { useSession } from "next-auth/react";

// ✅ Page receives params from Next.js routing
interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}


export default function Page({ params }: PageProps) {
  // Get classId from route
  const classId = params.id;

  // TODO: Replace with real userId from auth (e.g. NextAuth session)
  // const userId = "68bf6996f02adb6fb1fef5a0";
  // const {data:session} = useSession();
  // const userId = session?.user?.id as string;
  // console.log( "", userId)

  return (
    <div>
      
      <Rescuedivers />

      <ReviewShowByCourseID courseId={classId} />

      <CourseReview classId={classId} />
    </div>
  );
}
