import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TripApiResponse } from "@/types/trip";

const fetchTrips = async (page = 1, limit = 10): Promise<TripApiResponse> => {
  const response = await axios.get<{ data: TripApiResponse }>(
    `${process.env.NEXT_PUBLIC_API_URL}/trip/all?page=${page}&limit=${limit}`
  );
  return response.data.data;
};

export const useTrips = (page = 1, limit = 10) => {
  return useQuery<TripApiResponse, Error>({
    queryKey: ["trips", page, limit],
    queryFn: () => fetchTrips(page, limit),
  });
};
