// services/api/courses.ts
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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

export interface CourseData {
  _id: string;
  title: string;
  description: string;
  price: number[]; // [min, max]
  courseIncludes: string[];
  duration: string;
  totalReviews: number;
  avgRating: number;
  totalParticipates: number;
  images?: { public_id: string; url: string };
}

export async function fetchCourses(): Promise<CourseData[]> {
  const res = await fetch(`${baseUrl}/class`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const json: CourseApiResponse = await res.json();
  return json.data;
}
