// lib/course.ts
import axios from "axios";

// ----------------------
// Subtypes
// ----------------------
export interface AddOnce {
  title: string;
  price: number;
  _id?: string;
}

export interface ScheduleDate {
  date: string;
  location: string;
  type: string;
}

export interface ScheduleSet {
  title: string;
  description: string;
  participents: number;
  totalParticipents: number;
  sets: {
    date: string;
    location: string;
    type: string;
  }[];
}
// ----------------------
// Main CourseDetail type
// ----------------------
export interface CourseDetail {
  classDates: never[];
  _id: string;
  title: string;
  image?: {
    public_id: string;
    url: string;
  }; // Single image object, not array
  description: string;  
  price: number[];  
  courseIncludes: string[];  
  duration: string;
  totalReviews: number;
  avgRating: number;
  totalParticipates: number;
  createdAt: string;
  updatedAt: string;
  maxAge?: number;
  minAge?: number;
  addOnce: AddOnce[];
  formTitle?: string[];
  schedule?: ScheduleSet[];
}

// ----------------------
// API Response type
// ----------------------
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
