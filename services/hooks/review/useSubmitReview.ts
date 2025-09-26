// hooks/useSubmitReview.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  submitReview,
  SubmitReviewPayload,
  SubmitReviewResponse,
} from "@/lib/reviews";
import { toast } from "sonner";

export const useSubmitReview = () => {
  const { data: session } = useSession();
   const queryClient = useQueryClient();  
  return useMutation<SubmitReviewResponse, Error, SubmitReviewPayload>({
    mutationFn: async (payload) => {
      if (!session?.accessToken) {
        throw new Error("You must be logged in to submit a review");
      }
      return submitReview(payload, session.accessToken);
      
    },
    onSuccess:(data)=>{
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success(data.message)
    }
    
  });
};
