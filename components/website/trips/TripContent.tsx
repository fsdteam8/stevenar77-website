// TripContent.tsx
"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Trip } from "@/services/hooks/trip/useTrip";
import { useTripBooking } from "../course/steps/TripBookingContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TripContentProps {
  trip: Trip;
}

export function TripContent({ trip }: TripContentProps) {
  const { state, dispatch } = useTripBooking();
  const searchParams = useSearchParams();

  //  Read ?q=3 from URL
  const queryQuantity = Number(searchParams.get("q")) || 1;

  //  Local + Context synced
  const [selectedParticipants, setSelectedParticipants] = useState<number>(
    state.participants || queryQuantity,
  );

  //  On mount: set from query param if exists
  useEffect(() => {
    // We only want this to run once when queryQuantity changes (not every render)
    if (queryQuantity && queryQuantity !== selectedParticipants) {
      setSelectedParticipants(queryQuantity);
      dispatch({
        type: "SET_PARTICIPANTS",
        payload: queryQuantity,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryQuantity]);

  //  When user selects new value → update both
  // const handleSelectChange = (value: string) => {
  //   const num = Number(value);
  //   setSelectedParticipants(num);
  //   dispatch({ type: "SET_PARTICIPANTS", payload: num });
  // };

  // const participantOptions = Array.from(
  //   { length: trip.maximumCapacity },
  //   (_, i) => i + 1,
  // );

  return (
    <div className="space-y-2">
      <Card className="p-6">
        {/* Trip Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#343a40]">
            Your Selected Trip
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 p-4 border-2 border-[#0694a2] rounded-lg bg-blue-50">
            <Image
              src={trip.images[0]?.url || "/images/default.png"}
              alt={trip.title}
              width={80}
              height={64}
              className="w-20 h-16 rounded object-cover mb-3 sm:mb-0"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-[#343a40]">{trip.title}</h3>
            </div>

            {/* Price - will move below on mobile */}
            <div className="text-right sm:text-right mt-3 sm:mt-0">
              <div className="text-2xl font-bold text-[#343a40]">
                $
                {trip.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-[#6c757d]">Per Person</div>
            </div>
          </div>
        </div>

        {/* Participants Selector */}
        <div>
          {/* <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
            Number of Participants
          </h2>
          <p className="text-sm text-[#6c757d] mb-2">
            Maximum capacity: {trip.maximumCapacity} participants
          </p> */}

          {/* <Select
            value={selectedParticipants.toString()}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select participants" />
            </SelectTrigger>
            <SelectContent>
              {participantOptions.map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          {/* Total Price Display */}
          {/* <div className="mt-4 text-right text-lg font-semibold text-[#0694a2]">
            Total: $
            {(trip.price * selectedParticipants).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div> */}
        </div>
      </Card>
    </div>
  );
}
