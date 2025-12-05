// lib/profile.ts
import { getSession } from "next-auth/react";

export interface UserProfile {
  state: string;
  street: string;
  location?: string | null;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  phone?: string;
  dateOfBirth?: string | null;
  age?: string | null;
  hight?: string | null;
  weight?: string | null;
  shoeSize?: string | null;
  streetAddress?: string | null;
  postalCode?: string | null;
  image?: {
    public_id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

// GET profile
export const getMyProfile = async (): Promise<UserProfile> => {
  const session = await getSession();
  if (!session?.accessToken) throw new Error("User is not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/my-profile`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  const data = await res.json();
  return data.data;
};


// PUT update profile
export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  streetAddress: string;
  street:string;
  state:string;
  location?: string;
  postalCode?: string;
  hight?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}

export const updateProfile = async (payload: UpdateProfilePayload): Promise<UserProfile> => {
  const session = await getSession();
  if (!session?.accessToken) throw new Error("User is not authenticated");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update profile");
  const data = await res.json();
  return data.data;
};

// POST upload avatar
export const uploadAvatar = async (file: File): Promise<UserProfile> => {
  const session = await getSession();
  if (!session?.accessToken) throw new Error("User is not authenticated");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload avatar");
  const data = await res.json();
  return data.data;
};
