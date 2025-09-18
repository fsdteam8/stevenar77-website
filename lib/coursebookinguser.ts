// lib/coursebookinguser.ts
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to get auth headers
const getAuthHeaders = async () => {
  const session = await getSession();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (session?.accessToken) {
    headers['Authorization'] = `Bearer ${session.accessToken}`;
  }
  
  return headers;
};

export const courseBookingApi = {
  async get<T>(endpoint: string): Promise<T> {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}/user/my-profile`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `Failed to fetch ${endpoint}`);
    }

    return response.json();
  },


  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const session = await getSession();
    const headers: Record<string, string> = {};
    
    // Don't set Content-Type for FormData, let browser set it with boundary
    if (session?.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/class/bookings`, {
      method: 'POST',
      headers,
      body: formData,
    });

    console.log("Response Status:", response.status);
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to post to ${endpoint}`);
    }

    return response.json();
  }
};