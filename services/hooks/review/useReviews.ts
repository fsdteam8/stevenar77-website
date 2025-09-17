// hooks/useReviews.ts
"use client";

import { getReviewsByCourseId } from "@/lib/reviews";
import { useQuery } from "@tanstack/react-query";

export const useReviewsByCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["reviews", courseId],
    queryFn: () => getReviewsByCourseId(courseId),
    enabled: !!courseId, // only run when courseId exists
  });
};
