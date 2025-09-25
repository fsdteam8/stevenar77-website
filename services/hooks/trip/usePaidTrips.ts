// services/hooks/trips/usePaidTrips.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Participant {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface TripItem {
  _id: string;
  trip: {
    _id: string;
    title: string;
    description: string;
    price: number;
    maximumCapacity: number;
    location: string;
    startDate: string;
    endDate: string;
    images: { public_id: string; url: string; _id: string }[];
  };
  participants: Participant[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaidTripsApiResponse {
  success: boolean;
  data: TripItem[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export const fetchPaidTrips = async (userId: string): Promise<PaidTripsApiResponse> => {
  const response = await axios.get<PaidTripsApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/trip/my/paid-bookings/${userId}`
  );
  return response.data;
};

export const usePaidTrips = (userId: string) => {
  return useQuery<TripItem[], Error>({
    queryKey: ["paidTrips", userId],
    queryFn: () => fetchPaidTrips(userId).then((res) => res.data),
    enabled: !!userId, // only fetch if userId exists
  });
};
