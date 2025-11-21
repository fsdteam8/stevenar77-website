"use client";

import React from "react";
import ReviewForm from "@/components/website/reusable/ReviewForm";
import { useSubmitReview } from "@/services/hooks/review/useSubmitReview";
// import { useReviewsByCourse } from "@/services/hooks/review/useReviews";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // ✅ fixed import
import { useSession } from "next-auth/react";

interface CourseReviewProps {
  // userId: string;
  classId: string;
}



const CourseReview: React.FC<CourseReviewProps> = ({  classId }) => {
  const { mutate, isPending, isError, isSuccess, error } = useSubmitReview();
  // const { data, isLoading } = useReviewsByCourse(classId);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const router = useRouter();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const userID = useSession();
  const userId = userID?.data?.user?.id as string;
  console.log("cudlinkpung",userID);

  const handleReviewSubmit = (reviewData: {
    rating: number;
    description: string;
    purchaseDate: string;
  }) => {
    const redirectPath = `/courses/${classId}`;
    //  Then check login
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", redirectPath);
      setShowLoginModal(true);
      return;
    }

    

    //  Validate first
    if (reviewData.rating === 0) {
      return alert("Please select a rating");
    }

    if (!reviewData.description.trim()) {
      return alert("Please enter a description");
    }


    //  Submit review
    mutate(
      {
        userId,
        classId,
        star: reviewData.rating,
        comment: reviewData.description,
        purchaseDate: reviewData.purchaseDate
      },
      {
        onSuccess: () => {
          // Redirect only after success
          router.push(redirectPath);
        },
      }
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <ReviewForm
        onSubmit={handleReviewSubmit}
        isSubmitting={isPending}
        submitStatus={
          isSuccess
            ? { type: "success", message: "Review submitted successfully!" }
            : isError
            ? {
                type: "error",
                message: error?.message || "Failed to submit review",
              }
            : null
        }
      />

      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="!max-w-xl">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to book this course. Please login to
              continue.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowLoginModal(false);
                router.push("/login");
              }}
            >
              Login Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CourseReview;
