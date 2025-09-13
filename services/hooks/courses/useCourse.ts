import { useQuery } from "@tanstack/react-query";
import { fetchCourseById, CourseDetail } from "@/lib/course";

export const useCourse = (id: string) => {
  return useQuery<CourseDetail, Error>({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id, // ✅ only run when id is defined
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
