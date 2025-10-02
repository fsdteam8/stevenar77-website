"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useTrip } from "@/services/hooks/trip/useTrip";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function TripsDetails() {
  const params = useParams();
  const idParam = params?.id; // string | string[]
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const { data: trip, isLoading, isError, error } = useTrip(id!);
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const router = useRouter();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBookNow = () => {
    if (!trip) return; 

    const bookNowLink = `/trips/book/${trip._id}`;
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", bookNowLink);
      setShowLoginModal(true);
    } else {
      router.push(bookNowLink);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading trip...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        {error instanceof Error ? error.message : "Error fetching trip"}
      </p>
    );

  if (!trip) return <p className="text-center mt-10">Trip not found</p>;

  const totalPrice = trip.price * quantity;

  return (
    <div className="container mx-auto my-16 md:my-32 px-4">
      {/* Main Details */}
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-5 p-4 md:p-0">
          <Image
            src={trip.images[0]?.url || "/images/default.png"}
            alt={trip.title}
            width={1200}
            height={600}
            className="rounded-lg w-full"
          />
        </div>

        <div className="col-span-12 md:col-span-7 space-y-4 p-4 md:p-0">
          <h1 className="text-[#27303F] text-2xl font-semibold">
            {trip.title}
          </h1>
          <p className="text-[#27303F] text-base font-semibold">
            {new Date(trip.startDate).toLocaleDateString()} -{" "}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>
          <p
            className="text-[#68706A] text-[14px] font-medium italic"
            dangerouslySetInnerHTML={{ __html: trip.description }}
          >
            {/* {trip.description} */}
          </p>

          {/* Quantity & Price */}
          <div className="flex items-center gap-3 pb-4 mt-5">
            <Button
              onClick={decrease}
              className="border border-[#68706A] bg-transparent hover:bg-gray-200 px-3 py-1 cursor-pointer"
            >
              <Minus className="text-gray-800" />
            </Button>
            <span className="text-lg">{quantity}</span>
            <Button
              onClick={increase}
              className="border border-primary hover:bg-teal-50 px-3 py-1 cursor-pointer"
            >
              <Plus className="text-gray-800" />
            </Button>
            <span className="ml-4 text-lg font-semibold">$ {totalPrice}</span>
          </div>

          {/* Buy Now Button */}
          <Button
            onClick={handleBookNow}
            className="bg-[#0694A2] border border-[#0694A2] text-white px-24 py-2 rounded-md w-full md:w-auto"
          >
            Buy Now
          </Button>
        </div>

        {/* ✅ Login Required Modal */}
        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent className="!max-w-xl">
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
              <DialogDescription>
                You need to be logged in to book this trip. Please login to
                continue.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowLoginModal(false)}
              >
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
      </div>
    </div>
  );
}
