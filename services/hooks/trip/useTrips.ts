// services/hooks/trip/useTrips.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Trip } from "@/types/trip";

const fetchTrips = async (): Promise<Trip[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trip/all`);
  return response.data.data; // returns the array of trips
};

export const useTrips = () => {
  return useQuery<Trip[], Error>({
    queryKey: ["trips"],
    queryFn: fetchTrips,
  });
};
