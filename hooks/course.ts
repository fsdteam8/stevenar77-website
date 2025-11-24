// src/hooks/course.ts

import { getSingleCourse } from "@/lib/api";
import { api } from "@/lib/coursebookinguser";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSingleCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getSingleCourse(courseId),
  });
};

// ---------------------------
// POST: Book a Course
// ---------------------------
export const useBookCourse = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      // Call your API helper
      return api.postFormData("/class/bookings", formData);
    },
    onSuccess: (data) => {
      console.log("Booking successful:", data);
      // You can also invalidate queries here if needed
    },
    onError: (error: Error) => {
      console.error("Booking failed:", error);
    },
  });
};
