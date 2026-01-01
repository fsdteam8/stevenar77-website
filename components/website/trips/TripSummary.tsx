// TripSummary.tsx
"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useTripCheckout } from "@/services/hooks/trip/useTripCheckout";
import { useTripBooking } from "../course/steps/TripBookingContext";
import { Trip } from "@/services/hooks/trip/useTrip";

interface TripSummaryProps {
  trip: Trip;
}

export function TripSummary({ trip }: TripSummaryProps) {
  const { state } = useTripBooking();
  const checkout = useTripCheckout(state.tripId);

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
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-[#6c757d]">
              Trip Cost (x{state.participants}){/* Trip Cost */}
            </span>
            {/* <span className="font-medium">
              $
              {(state.course.price * state.participants).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </span> */}
            <span className="font-medium">${state.course.price}</span>
          </div>
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
        </div>

        {checkout.isError && (
          <div className="text-red-500 text-sm text-center mt-2">
            Payment processing failed. Please try again.
          </div>
        )}
      </div>
    </Card>
  );
}
