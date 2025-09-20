"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useBooking } from "./booking-context";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

export function BookingContent() {
  const { state, dispatch } = useBooking();
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  // New local state for pricing and add-ons
  const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
  // const [addOnSelected, setAddOnSelected] = useState<boolean>(false);

  const availableTimes = [
    "12:00 PM",
    "11:00 AM",
    "10:00 AM",
    "09:00 AM",
    "07:00 AM",
    "06:00 AM",
    "08:00 PM",
    "05:00 PM",
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      dispatch({ type: "SET_DATE", payload: date });
      setShowPersonalInfo(true);
    }
  };

  const handleTimeSelect = (timeLabel: string) => {
    if (state.selectedDate) {
      // Parse the human-readable time string
      const [hoursMinutes, modifier] = timeLabel.split(" ");
      const [rawHours, minutes] = hoursMinutes.split(":").map(Number);
      let hours = rawHours;

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const selectedDateTime = new Date(state.selectedDate);
      selectedDateTime.setHours(hours, minutes, 0, 0);

      dispatch({
        type: "SET_TIME",
        payload: {
          label: timeLabel, // 👈 for showing to users
          iso: selectedDateTime.toISOString(), // 👈 for sending to API
        },
      });
    } else {
      dispatch({
        type: "SET_TIME",
        payload: { label: timeLabel, iso: null },
      });
    }
  };

  

  const handlePricingChange = (value: string) => {
    setSelectedPricing(value);
    dispatch({ type: "SET_PRICING", payload: value });
  };

  const handleAddOnChange = (
    checked: boolean | "indeterminate" | undefined,
  ) => {
    dispatch({ type: "SET_ADDON", payload: checked === true });
  };
console.log(state);
console.log("finding class/course id",state.course)
  return (
    <div className="space-y-6">
      {/* Course Selection */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
          Select Your Course
        </h2>
        <div className="flex items-center gap-4 p-4 border-2 border-[#0694a2] rounded-lg bg-blue-50">
          <Image
            src="/scuba-diving-underwater-scene.jpg"
            alt="Open Water Diver Course"
            width={20}
            height={16}
            className="w-20 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-[#343a40]">Open Water Diver</h3>
            <p className="text-sm text-[#6c757d] mb-2">
              The most popular scuba course in the world! Get your first scuba
              diving certification.
            </p>
            <div className="flex items-center gap-4 text-sm text-[#6c757d]">
              <span className="bg-[#0694a2] text-white px-2 py-1 rounded text-xs">
                BEST DEAL
              </span>
              <span>⏱️ 3-4 days</span>
              <span>👥 Age 10+</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#343a40]">$ 450</div>
            <div className="text-sm text-[#6c757d]">Per Person</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader className="pb-4">
          <h2 className="text-2xl font-semibold text-[#343a40]">
            Choose Your Pricing + Add-On
          </h2>
        </CardHeader>

        <div className="flex p-6 justify-between items-center gap-5">
          <div className="space-y-8 ">
            <div className="space-y-2">
              <p className="font-medium text-[#343a40] mb-2">Pricing</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedPricing === "3-day"}
                  onCheckedChange={(checked) =>
                    checked && handlePricingChange("3-day")
                  }
                  id="pricing-3-day"
                  className="w-5 h-5 border border-[#6c757d] "
                  aria-labelledby="label-3-day"
                />
                <span id="label-3-day">3 Day Dive Program — $199</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedPricing === "5-day"}
                  onCheckedChange={(checked) =>
                    checked && handlePricingChange("5-day")
                  }
                  id="pricing-5-day"
                  className="w-5 h-5"
                  aria-labelledby="label-5-day"
                />
                <span id="label-5-day">5 Day Dive Program — $399</span>
              </label>
            </div>
          </div>

          {/* Add-On */}
          <div className=" space-y-2">
            <div className="">
              <p className="font-medium text-[#343a40] mb-2">Add-On</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={state.addOn}
                  onCheckedChange={handleAddOnChange}
                  id="addon-catalina"
                  className="w-5 h-5"
                  aria-labelledby="label-addon-catalina"
                />

                <span id="label-addon-catalina">Catalina Weekend — $999</span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Number of Participants */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
          Number of Participants
        </h2>
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
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} person{num > 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Date Selection */}
      {/* <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
          Select Date or Time
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={state.selectedDate || undefined}
              onSelect={handleDateSelect}
              className="rounded-md border w-full"
              classNames={{
                day_selected:
                  "bg-[#0694a2] text-white hover:bg-[#0694a2] hover:text-white focus:bg-[#0694a2] focus:text-white",
                day_today: "bg-[#0694a2] text-white",
              }}
            />
          </div>

          <div>
            <h3 className="font-medium mb-3">Available Time</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time, index) => (
                <Button
                  key={time + index}
                  variant={
                    state.selectedTime?.label === time ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleTimeSelect(time)}
                  className={
                    state.selectedTime?.label === time
                      ? "bg-[#0694a2] hover:bg-[#0694a2]/90"
                      : ""
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card> */}

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#343a40]">Select Date or Time</h2>
        <div className="space-y-6">
          <div>
            <Calendar
              mode="single"
              selected={state.selectedDate || undefined}
              onSelect={handleDateSelect}
              className="rounded-md border w-full"
              classNames={{
                day_selected:
                  "bg-[#0694a2] text-white hover:bg-[#0694a2] hover:text-white focus:bg-[#0694a2] focus:text-white",
                day_today: "bg-[#0694a2] text-white",
              }}
            />
            {state.selectedDate && <p className="text-red-500 text-sm mt-2"></p>}
          </div>

          <div>
            {/* <h3 className="font-medium mb-3">Available Time</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time, index) => (
                <Button
                  key={time + index}
                  variant={
                    state.selectedTime?.label === time ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleTimeSelect(time)}
                  className={
                    state.selectedTime?.label === time
                      ? "bg-[#0694a2] hover:bg-[#0694a2]/90"
                      : ""
                  }
                >
                  {time}
                </Button>
              ))}
            </div> */}
        </div>
        </div>
      </Card>
    </div>
  );
}
