// hooks/useCourses.ts
import { useQuery } from "@tanstack/react-query";
import { fetchCourses, CourseData } from "@/lib/courseApi";

export function useCourses() {
  return useQuery<CourseData[], Error>({
    queryKey: ["courses"],  
    queryFn: async () => {
      const response = await fetchCourses();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch courses");
      }
      return response.data;
    },
  });
}
