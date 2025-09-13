// lib/courseApi.ts
import axios from "axios";

export interface CourseData {
  _id: string;
  title: string;
  shortDescription: string;
  courseLevel: string;
  features: string[];
  price: number;
  longDescription: string;
  courseDate: string;
  location: string;
  requiredAge: number;
  requiredHeight: number;
  maxDepth: number;
  courseDuration: string;
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
