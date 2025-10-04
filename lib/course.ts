// lib/course.ts
import axios from "axios";

// ----------------------
// Types matching actual API response
// ----------------------
interface addonce {
  title: string;
  price: number;
  _id:string | undefined;
}
export interface CourseDetail {
  classDates: never[];
  _id: string;
  title: string;
  image?: {
    public_id: string;
    url: string;
  }; // Single image object, not array
  description: string; // This is the main description
  price: number[]; // Array of prices
  courseIncludes: string[]; // This is the features array
  duration: string;
  totalReviews: number;
  avgRating: number;
  totalParticipates: number;
  createdAt: string;
  updatedAt: string;
  maxAge?: number;
  minAge?: number;
  addOnce: addonce[];
  formTitle?: string[]; // ✅ add this
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
    `${process.env.NEXT_PUBLIC_API_URL}/class/${id}`,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to fetch course");
  }

  return response.data.data;
}
