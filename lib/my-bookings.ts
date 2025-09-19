// lib/my-bookings.ts
import { getSession } from "next-auth/react";

export interface Booking {
  _id: string;
  classId: string;
  userId: string;
  participant: number;
  classDate: string[];
  totalPrice: number;
  status: string;
  // add other fields as needed
}

export const fetchMyBookings = async (): Promise<Booking[]> => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/class/bookings/my-bookings`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.data;
};
