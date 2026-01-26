import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Trip {
  _id: string;
  title: string;
  description: string;
  price: number;
  maximumCapacity: number;
  location: string;
  startDate: string;
  endDate: string;
  images: { public_id: string; url: string; _id: string }[];
  purchasedParticipants?: number;
  purchasedByDate?: { tripDate?: string; totalParticipants: number }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getTripById = async (id: string): Promise<Trip> => {
  const res = await axios.get(`${API_URL}/trip/${id}`);
  return res.data.data;
};

export const useTrip = (id: string) => {
  return useQuery<Trip, Error>({
    queryKey: ["trip", id],
    queryFn: () => getTripById(id),
    enabled: !!id, // only run if id exists
  });
};
