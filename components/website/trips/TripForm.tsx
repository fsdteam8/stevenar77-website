"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTripBooking } from "../course/steps/TripBookingContext";

export function TripForm() {
  const { state, dispatch } = useTripBooking();

  const handleChange = (field: string, value: string) => {
    dispatch({ type: "SET_PERSONAL_INFO", payload: { [field]: value } });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">Your Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="First Name"
            value={state.personalInfo.name.split(" ")[0] || ""}
            onChange={(e) => 
              handleChange("name", `${e.target.value} ${state.personalInfo.name.split(" ")[1] || ""}`)
            }
            required
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            value={state.personalInfo.name.split(" ")[1] || ""}
            onChange={(e) => 
              handleChange("name", `${state.personalInfo.name.split(" ")[0] || ""} ${e.target.value}`)
            }
            required
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="+1234567890"
            value={state.personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={state.personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
      </div>
      <p className="text-xs text-[#6c757d] mt-4">
        * Required fields - All information must be completed before proceeding to payment.
      </p>
    </Card>
  );
}