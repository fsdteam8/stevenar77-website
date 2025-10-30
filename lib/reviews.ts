// lib/reviews.ts
export interface SubmitReviewPayload {
  userId: string;
  classId: string;
  star: number;
  comment: string;
}

export interface Review {
  _id: string;
  userId: string;
  classId: string;
  star: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubmitReviewResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Review;
}

// Response type for fetching reviews by courseId
export interface ReviewByCourse {
  _id: string;
  userId: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    image: {
      url: string;
    }
  };
  classId: string;
  star: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReviewsByCourseResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: ReviewByCourse[];
}



// ----------------------
// PRODUCT REVIEW TYPES
// ----------------------
export interface SubmitProductReviewPayload {
  userId: string;
  productId: string;
  star: number;
  comment: string;
}

export interface ProductReview {
  _id: string;
  userId: string;
  productId: string;
  star: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubmitProductReviewResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: ProductReview;
}


export const submitReview = async (
  payload: SubmitReviewPayload,
  token: string
): Promise<SubmitReviewResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to submit review");
  }

  return res.json();
};




// API call to get reviews by courseId
export const getReviewsByCourseId = async (
  courseId: string
): Promise<ReviewsByCourseResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews/class/${courseId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch reviews");
  }

  return res.json();
};

// Submit a product review
export const submitProductReview = async (
  payload: SubmitProductReviewPayload,
  token?: string
): Promise<SubmitProductReviewResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to submit product review");
  }

  return res.json();
};