"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTripCheckout } from "@/services/hooks/trip/useTripCheckout";
import { useState } from "react";
import { useTripBooking } from "../course/steps/TripBookingContext";
import { Trip } from "@/services/hooks/trip/useTrip";
import { useSearchParams } from "next/navigation";

interface TripSummaryProps {
  trip: Trip;
}

export function TripSummary({ trip }: TripSummaryProps) {
  const { state } = useTripBooking();
  const checkout = useTripCheckout(state.tripId);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Get quantity from URL (e.g. ?quantity=3)
  const searchParams = useSearchParams();
  const quantity = Number(searchParams.get("q")) || 1;

  console.log(quantity);

  // Split full name into first and last
  const [firstName, lastName] = state.personalInfo.name.split(" ");

  // Validation function
  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      state.personalInfo.email &&
      state.personalInfo.phone &&
      state.tripId
    );
  };

  const handleProceedToPayment = async () => {
    if (!isFormValid()) {
      alert("Please fill in all required information before proceeding.");
      return;
    }

    setIsProcessing(true);

    try {
      const checkoutData = {
        participants: [
          {
            firstName: firstName || "",
            lastName: lastName || "",
            email: state.personalInfo.email,
            mobile: state.personalInfo.phone,
          },
        ],
        totalParticipants: state.participants,
      };

      await checkout.mutateAsync(checkoutData);
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert("Payment processing failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Trip Summary
      </h2>

      <div className="space-y-4">
        {/* Trip Info */}
        <div className="flex items-center gap-3">
          <Image
            src={trip.images[0]?.url || "/images/default.png"}
            alt={trip.title}
            width={64}
            height={48}
            className="rounded object-cover"
          />

          <div>
            <h3 className="font-medium text-[#343a40]">{state.course.name}</h3>
            {/* <p className="text-sm text-[#6c757d]">
              Duration: {state.course.duration}
            </p> */}
            {/* <p className="text-sm text-[#6c757d]">Age: {state.course.age}</p> */}
          </div>
        </div>

        {/* User Info */}
        <div className="border-t pt-4 space-y-2 text-sm text-[#6c757d]">
          <p>
            <span className="font-medium">First Name:</span>{" "}
            {firstName || <span className="text-red-500 italic">Required</span>}
          </p>
          <p>
            <span className="font-medium">Last Name:</span>{" "}
            {lastName || <span className="text-red-500 italic">Required</span>}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {state.personalInfo.phone || (
              <span className="text-red-500 italic">Required</span>
            )}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {state.personalInfo.email || (
              <span className="text-red-500 italic">Required</span>
            )}
          </p>
        </div>

        {/* Pricing */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-[#6c757d]">
              Trip fee (x{state.participants})
            </span>
            <span className="font-medium">
              $
              {(state.course.price * state.participants).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-[#6c757d]">Equipment rental</span>
            <span className="font-medium">Included</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6c757d]">Digital certification</span>
            <span className="font-medium">Included</span>
          </div> */}
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>
              $
              {(state.course.price * state.participants).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </span>
          </div>
          {/* <p className="text-xs text-[#6c757d] mt-1">100% Safe & Secure</p> */}
          {/* <p className="text-xs text-[#6c757d]">Free Cancellation up to 24h</p> */}
        </div>

        <Button
          onClick={handleProceedToPayment}
          disabled={!isFormValid() || isProcessing || checkout.isPending}
          className="w-full bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing || checkout.isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            "Proceed to Payment"
          )}
        </Button>

        {checkout.isError && (
          <div className="text-red-500 text-sm text-center mt-2">
            Payment processing failed. Please try again.
          </div>
        )}

        {/* What's Included */}
        {/* <div className="mt-6">
          <h3 className="font-medium mb-3 text-[#343a40]">
            What&apos;s Included
          </h3>
          <ul className="space-y-2 text-sm text-[#6c757d]">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Theory sessions
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Pool training
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>4 open
              water dives
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Digital certification
            </li>
          </ul>
        </div> */}
      </div>
    </Card>
  );
}
