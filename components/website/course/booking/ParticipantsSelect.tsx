"use client";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBooking } from "../booking-context";
// import { useBooking } from "./booking-context";

export function ParticipantsSelect() {
  const { state, dispatch } = useBooking();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Number of Participants
      </h2>
      <Select
        value={state.participants.toString()}
        onValueChange={(value) =>
          dispatch({ type: "SET_PARTICIPANTS", payload: Number(value) })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="1 person" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} person{num > 1 ? "s" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Card>
  );
}
