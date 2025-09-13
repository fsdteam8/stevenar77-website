import axios from "axios";

// ----------------------
// Types
// ----------------------
export interface CourseDetail {
  _id: string;
  title: string;
  images?: { public_id: string; url: string }[];
  shortDescription: string;
  longDescription: string;
  courseLevel: string;
  features: string[];
  price: number;
  courseDate: string;
  location?: string;
  requiredAge?: number;
  requiredHeight?: number;
  maxDepth?: number;
  courseDuration: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: CourseDetail;
}

// ----------------------
// API Function
// ----------------------
export async function fetchCourseById(id: string): Promise<CourseDetail> {
  const response = await axios.get<CourseResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/class/${id}`
  );
  return response.data.data;
}
