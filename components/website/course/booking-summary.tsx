"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useSession, signIn } from "next-auth/react";
import { Loader2, AlertCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useBooking } from "./booking-context";
import { useCreateBooking } from "@/services/hooks/profile/useCreateBooking";
import { mapBookingStateToPayload } from "@/utils/booking-mapper";
import type { CourseDetail } from "@/lib/course";

interface BookingSummaryProps {
  courseData: CourseDetail;
}

export function BookingSummary({  }: BookingSummaryProps) {
  const { state } = useBooking();
  const {  status } = useSession();
  const createBookingMutation = useCreateBooking();

  const [validationError, setValidationError] = useState<string>("");

  const isAuthenticated = status === "authenticated";
  const isOnFinalStep = state.currentStep === 1;
  const selectedTime = "10:00";

  // ✅ Format class date safely (supports array)
  const formatDate = (dateInput: string[] | string | null): string => {
    if (!dateInput) return "Not selected";
    const firstDate = Array.isArray(dateInput)
      ? new Date(dateInput[0])
      : new Date(dateInput);
    return isNaN(firstDate.getTime())
      ? "Not selected"
      : format(firstDate, "EEEE, MMMM dd");
  };

  const basePrice = Array.isArray(state.course.price)
    ? state.course.price[0]
    : state.course.price || 0;

  const addOnsTotal = state.addOns.reduce((sum, addon) => sum + addon.price, 0);
  const participants = state.participants || 1;
  const totalPrice = basePrice * participants + addOnsTotal;

  const validateBooking = (): boolean => {
    setValidationError("");

    if (!isAuthenticated) {
      setValidationError("Please sign in to proceed with booking.");
      return false;
    }
    if (!isOnFinalStep) {
      setValidationError("Please complete all booking steps before proceeding.");
      return false;
    }

    const { name, email } = state.personalInfo;
    if (!name.trim() || !email.trim()) {
      setValidationError("Please fill in all required personal information.");
      return false;
    }

    if (!state.selectedDate || state.selectedDate.length === 0) {
      setValidationError("Please select a class date before proceeding.");
      return false;
    }

    return true;
  };

  const handleProceedToPayment = async () => {
    if (!validateBooking()) return;

    try {
      const bookingPayload = {
        ...mapBookingStateToPayload(state),
        selectedTime,
      };

      console.log("✅ Final booking payload:", bookingPayload);

      await createBookingMutation.mutateAsync(bookingPayload);
    } catch (error) {
      console.error("Booking failed:", error);
      setValidationError("Failed to create booking. Please try again.");
    }
  };

  const handleSignIn = () => signIn();

  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Booking Summary
      </h2>

      <div className="space-y-4">
        {/* Course Info */}
        <div className="flex items-center gap-3">
          <Image
            src={state.course.image || "/scuba-diving-course-thumbnail.jpg"}
            alt={state.course.name || "Course thumbnail"}
            width={64}
            height={48}
            className="rounded object-cover"
          />
          <div>
            <h3 className="font-medium text-[#343a40]">
              {state.course.name || "Unknown Course"}
            </h3>
            {state.course.age && (
              <p className="text-sm text-[#6c757d]">Age: {state.course.age}</p>
            )}
          </div>
        </div>

        {/* Sign-In Alert */}
        {status === "unauthenticated" && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Sign in required for booking</span>
              <Button size="sm" onClick={handleSignIn} variant="outline">
                Sign In
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Selected Date */}
        <div className="space-y-2 text-sm text-[#6c757d]">
          <div>{formatDate(state.selectedDate)}</div>
          <div className="hidden">{selectedTime}am</div>
        </div>

        {/* Price */}
        <div className="border-t pt-4 space-y-2 text-sm text-[#6c757d]">
          <div className="flex justify-between">
            <span>Course fee (x{participants})</span>
            <span>${(basePrice * participants).toFixed(2)}</span>
          </div>

          {state.addOns.length > 0 && (
            <div className="space-y-1">
              {state.addOns.map((addon) => (
                <div key={addon.id} className="flex justify-between">
                  <span>Add-On: {addon.title}</span>
                  <span>${addon.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold text-[#343a40]">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Validation */}
        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        {/* Proceed */}
        <Button
          className="w-full bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleProceedToPayment}
          disabled={
            createBookingMutation.isPending ||
            !isAuthenticated ||
            !isOnFinalStep
          }
        >
          {createBookingMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </div>
    </Card>
  );
}