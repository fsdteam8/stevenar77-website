// services/hooks/useBookings.ts
import { useQuery } from "@tanstack/react-query";
import { Booking, fetchMyBookings } from "@/lib/my-bookings";

export const useMyBookings = () => {
  return useQuery<Booking[], Error>({
    queryKey: ["myBookings"],
    queryFn: fetchMyBookings,
    staleTime: 1000 * 60, // 1 minute cache
    retry: 1,
  });
};
