"use client";

import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import {
  submitProductReview,
  SubmitProductReviewPayload,
  SubmitProductReviewResponse,
} from "@/lib/reviews";

export const useSubmitProductReview = () => {
  const { data: session } = useSession();

  return useMutation<
    SubmitProductReviewResponse, 
    Error,                      
    SubmitProductReviewPayload  
  >({
    mutationFn: async (payload: SubmitProductReviewPayload) => {
      if (!session?.accessToken) throw new Error("Not authenticated");
      return submitProductReview(payload, session.accessToken);
    },
  });
};
