// hooks/useCourseformbookingupdate.ts

import { updateCourseFormBooking } from "@/lib/courseformbookingupdate";
import { useMutation } from "@tanstack/react-query";

export function useCourseFormBookingUpdate() {
  const mutation = useMutation({
    mutationFn: ({
      bookingId,
      formData,
    }: {
      bookingId: string;
      formData: FormData;
    }) => updateCourseFormBooking(bookingId, formData),

    onSuccess: (data) => {
      console.log("Update Success:", data);
    },

    onError: (error) => {
      console.error("Update Error:", error);
    },
  });

  return {
    updateBooking: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}
