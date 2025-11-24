// src/hooks/trip/useTripBooking.ts
import { tripBooking } from "@/lib/api";
import { TripBookingData } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";

export const useTripBooking = () => {
  return useMutation({
    mutationFn: (data: TripBookingData) => tripBooking(data),
    onSuccess: () => {
      console.log("Trip booking successful!");
    },
    onError: (error) => {
      console.error("Trip booking failed:", error);
    },
  });
};
