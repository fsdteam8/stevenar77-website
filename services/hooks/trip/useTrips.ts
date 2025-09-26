import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Trip, TripApiResponse } from "@/types/trip";

const fetchTrips = async (): Promise<Trip[]> => {
  const response = await axios.get<TripApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/trip/all`);
  return response.data.data; // this is Trip[]
};

export const useTrips = () => {
  return useQuery<Trip[], Error>({
    queryKey: ["trips"],
    queryFn: fetchTrips,
  });
};
