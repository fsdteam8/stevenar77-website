import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Minus, Plus, MapPin, Calendar, Users } from "lucide-react";
import { format } from "date-fns";

interface TripsCardProps {
  image: string;
  title: string;
  shortDescription: string;
  price: number;
  bookNowLink: string;
  reverse?: boolean;
  location: string;
  startDate: string;
  endDate: string;
  maxCapacity: number;
  purchasedParticipants: number;
}

export default function TripsCard({
  image,
  title,
  shortDescription,
  price,
  bookNowLink,
  reverse = false,
  location,
  startDate,
  endDate,
  maxCapacity,
  purchasedParticipants,
}: TripsCardProps) {
  const router = useRouter();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBookNow = () => {
    // Create URL with quantity as query parameter
    const urlWithQuantity = `${bookNowLink}?q=${quantity}`;

    if (!isLoggedIn) {
      // Save redirect path with quantity
      localStorage.setItem("redirectAfterLogin", urlWithQuantity);
      setShowLoginModal(true);
    } else {
      router.push(urlWithQuantity);
    }
  };

  const formattedStartDate = startDate
    ? format(new Date(startDate), "dd MMM yyyy")
    : "";
  const formattedEndDate = endDate
    ? format(new Date(endDate), "dd MMM yyyy")
    : "";

  return (
    <div className="container mx-auto my-16 md:my-10 px-2">
      <div
        className={`grid grid-cols-1 md:grid-cols-12   gap-6 ${reverse ? "md:[direction:rtl]" : ""
          }`}
      >
        {/* ✅ Image */}
        <div className="md:col-span-6 flex justify-center md:sticky md:top-24 md:h-fit mt-6">
          <Image
            src={image}
            alt={title}
            width={730}
            height={600}
            className="rounded-md object-cover w-full h-auto"
          />
        </div>

        {/* ✅ Content */}
        <div
          className={`md:col-span-6 p-4 ${reverse ? "md:[direction:ltr]" : ""}`}
        >
          {/* Title */}
          <h1 className="text-[#27303F] text-2xl font-semibold">{title}</h1>

          {/* New Fields: Location, Date, Capacity */}
          <div className="flex flex-col gap-2 mt-2 text-gray-600">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{location}</span>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                {formattedStartDate} - {formattedEndDate}
              </span>
            </div>

            {/* Capacity */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                Max Capacity: {maxCapacity}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-[#68706A] text-base font-medium my-3 italic leading-relaxed"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />

          {/* Quantity & Price Section */}
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 bg-gray-50">
              <Button
                onClick={decrease}
                className="border border-gray-300 bg-white hover:bg-gray-100 p-2"
              >
                <Minus className="text-gray-800 w-4 h-4" />
              </Button>

              <span className="text-lg font-medium w-6 text-center">
                {quantity}
              </span>

              <Button
                onClick={increase}
                className="border border-primary bg-white hover:bg-teal-50 p-2"
              >
                <Plus className="text-gray-800 w-4 h-4" />
              </Button>
            </div>
              {/* Conditional Button */}
              <div className="">
                {maxCapacity - purchasedParticipants > 0 ? (
                  <Button
                    onClick={handleBookNow}
                    className="bg-[#0694A2] text-white px-12 py-2 md:px-20 rounded-md hover:bg-[#057c88] transition cursor-pointer"
                  >
                    Book Now
                  </Button>
                ) : (
                  <button
                    disabled
                    className="px-12 py-2 md:px-20 bg-red-400 text-white text-sm font-medium rounded-lg cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                )}
    
                {/* Spots Left Warning */}
                {maxCapacity - purchasedParticipants > 0 &&
                  maxCapacity - purchasedParticipants <= 2 && (
                    <div className="mt-4">
                      <div className="bg-red-50 border border-red-200 text-red-700 px-12 py-2 md:px-20 rounded-md animate-pulse text-center">
                        <span className="text-base font-semibold">
                          Only {maxCapacity - purchasedParticipants} spot
                          {maxCapacity - purchasedParticipants > 1 ? "s" : ""} left
                        </span>
                      </div>
                    </div>
                  )}
              </div>

            {/* Total Price */}
            <span className="ml-4 text-lg font-semibold text-gray-800">
              Total: $
              {totalPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>


        </div>
      </div>

      {/* Login Required Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="!max-w-xl">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              {/* You need to be logged in to book this trip. Please log in to
                continue. */}
              Please login to access your account, book a course and/or trip,
              leave a review, send a chat, and/or shop for products!
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
  );
}
