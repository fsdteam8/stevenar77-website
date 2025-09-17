// lib/courseApi.ts
import axios from "axios";

export interface CourseData {
  _id: string;
  title: string;
  description: string;
  price: number[]; // array from API
  courseIncludes: string[];
  duration: string;
  totalReviews: number;
  avgRating: number;
  totalParticipates: number;
  image?: {
    public_id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CourseApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: CourseData[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
}

// Reusable API function
export async function fetchCourses(): Promise<CourseApiResponse> {
  const response = await axios.get<CourseApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/class`
  );
  return response.data;
}
