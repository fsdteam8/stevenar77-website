// lib/profile.ts
import { getSession } from "next-auth/react";

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getMyProfile = async (): Promise<UserProfile> => {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/my-profile`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  const data = await res.json();
  return data.data; // return the user object
};
