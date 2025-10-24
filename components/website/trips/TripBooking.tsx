// Tripboking.tsx

"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { TripForm } from "./TripForm";
import { TripSummary } from "./TripSummary";
import { useTrip } from "@/services/hooks/trip/useTrip";
import { TripBookingProvider, useTripBooking } from "../course/steps/TripBookingContext";
import { TripContent } from "./TripContent";
import AuthModal from "../reusable/AuthModal";
import { useSession } from "@/hooks/useSession";

// -------------------------
// Inner component for trip booking
// -------------------------
function TripBookingContent() {
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const { dispatch } = useTripBooking();
  const { data: trip, isLoading, isError } = useTrip(id!);

  useEffect(() => {
    if (trip && id) {
      dispatch({ type: "SET_TRIP_ID", payload: id });
      dispatch({
        type: "SET_COURSE",
        payload: {
          id: trip._id,
          name: trip.title,
          price: trip.price,
          duration: `${Math.ceil(
            (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
              (1000 * 3600 * 24)
          )} days`,
          age: "10+",
        },
      });

      // Restore participant count from sessionStorage
      const selectedQuantity = sessionStorage.getItem("selectedQuantity");
      if (selectedQuantity) {
        const quantity = parseInt(selectedQuantity, 10);
        if (quantity >= 1 && quantity <= trip.maximumCapacity) {
          dispatch({ type: "SET_PARTICIPANTS", payload: quantity });
        }
      }
    }
  }, [trip, id, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <p className="text-center text-lg">Loading trip details...</p>
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <p className="text-center text-lg text-red-500">
          Failed to load trip details. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <main className="container mx-auto px-4 py-8 relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#343a40] mb-2">Book Your Trip</h1>
          {/* <p className="text-[#6c757d]">Complete your booking in just a few steps</p> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <TripContent trip={trip} />
            <TripForm />
          </div>
          <div className="lg:col-span-1">
            <TripSummary trip={trip} />
          </div>
        </div>
      </main>
    </div>
  );
}

// -------------------------
// Main wrapper with session check
// -------------------------
const TripBooking = () => {
  const { session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <TripBookingProvider>
      <TripBookingContent />

      {/* Auth Modal Overlay */}
      {!session && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AuthModal onClose={() => {}} />
        </div>
      )}
    </TripBookingProvider>
  );
};

export default TripBooking;
