"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Trip } from "@/services/hooks/trip/useTrip";
import { useTripBooking } from "../course/steps/TripBookingContext";

interface TripContentProps {
  trip: Trip;
}

export function TripContent({ trip }: TripContentProps) {
  const { state, dispatch } = useTripBooking();

  // Generate participant options based on trip's maximum capacity
  const participantOptions = Array.from(
    { length: Math.min(trip.maximumCapacity, 10) },
    (_, i) => i + 1,
  );

  return (
    <div className="space-y-6">
      {/* Combined Card */}
      <Card className="p-6 space-y-6">
        {/* Trip Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
            Your Selected Trip
          </h2>
          <div className="flex items-center gap-4 p-4 border-2 border-[#0694a2] rounded-lg bg-blue-50">
            <Image
              src={trip.images[0]?.url || "/images/default.png"}
              alt={trip.title}
              width={80}
              height={64}
              className="w-20 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-[#343a40]">{trip.title}</h3>
              <p
                className="text-sm text-[#6c757d] mb-2"
                dangerouslySetInnerHTML={{
                  __html:
                    trip.description.length > 100
                      ? `${trip.description.substring(0, 120)}...`
                      : trip.description,
                }}
              />

              <div className="flex items-center gap-4 text-sm text-[#6c757d]">
                <span className="bg-[#0694a2] text-white px-2 py-1 rounded text-xs">
                  BEST DEAL
                </span>
                <span>📍 {trip.location}</span>
                <span>📅 {new Date(trip.startDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#343a40]">
                ${trip.price}
              </div>
              <div className="text-sm text-[#6c757d]">Per Person</div>
            </div>
          </div>
        </div>

        {/* Number of Participants */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
            Number of Participants
          </h2>
          <p className="text-sm text-[#6c757d] mb-2">
            Maximum capacity: {trip.maximumCapacity} participants
          </p>
          <Select
            value={state.participants.toString()}
            onValueChange={(value) =>
              dispatch({
                type: "SET_PARTICIPANTS",
                payload: Number.parseInt(value),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="1 person" />
            </SelectTrigger>
            <SelectContent>
              {participantOptions.map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} person{num > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
}
