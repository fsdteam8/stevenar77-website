// lib/coursebookinguser.ts

// lib/api.ts

import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header when available
        // 'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Failed to fetch ${endpoint}`);
    }

    return response.json();
  },

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const session = await getSession();

    // console.log("Session in postFormData:", formData);

    const response = await fetch(`${API_BASE_URL}/class/bookings`, {
      method: "POST",
      headers: {
        // Don't set Content-Type for FormData, let browser set it
        Authorization: `Bearer ${session?.accessToken}`,
        // "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Failed to post to ${endpoint}`);
    }

    return response.json();
  },
};
