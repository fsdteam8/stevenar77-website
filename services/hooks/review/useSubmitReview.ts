// hooks/useSubmitReview.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  submitReview,
  SubmitReviewPayload,
  SubmitReviewResponse,
} from "@/lib/reviews";

export const useSubmitReview = () => {
  const { data: session } = useSession();

  return useMutation<SubmitReviewResponse, Error, SubmitReviewPayload>({
    mutationFn: async (payload) => {
      if (!session?.accessToken) {
        throw new Error("You must be logged in to submit a review");
      }
      return submitReview(payload, session.accessToken);
    },
  });
};
