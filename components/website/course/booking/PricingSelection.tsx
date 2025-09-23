"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useBooking } from "../booking-context";

export function PricingSelection() {
  const { state, dispatch } = useBooking();

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <h2 className="text-2xl font-semibold text-[#343a40]">
          Choose Your Pricing + Add-On
        </h2>
      </CardHeader>

      <div className="flex p-6 justify-between items-center gap-5">
        {/* Pricing */}
        <div className="space-y-2">
          <p className="font-medium text-[#343a40] mb-2">Pricing</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={state.pricing === "3-day"}
              onCheckedChange={(checked) =>
                checked && dispatch({ type: "SET_PRICING", payload: "3-day" })
              }
            />
            <span>3 Day Dive Program — $199</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={state.pricing === "5-day"}
              onCheckedChange={(checked) =>
                checked && dispatch({ type: "SET_PRICING", payload: "5-day" })
              }
            />
            <span>5 Day Dive Program — $399</span>
          </label>
        </div>

        {/* Add-On */}
        <div className="space-y-2">
          <p className="font-medium text-[#343a40] mb-2">Add-On</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={state.addOn}
              onCheckedChange={(checked) =>
                dispatch({ type: "SET_ADDON", payload: checked === true })
              }
            />
            <span>Catalina Weekend — $999</span>
          </label>
        </div>
      </div>
    </Card>
  );
}
