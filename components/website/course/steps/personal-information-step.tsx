"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooking } from "../booking-context";

export function PersonalInformationStep() {
  const { state, dispatch } = useBooking();

  const handleChange = (field: string, value: string) => {
    dispatch({ type: "SET_PERSONAL_INFO", payload: { [field]: value } });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-[#343a40]">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Full Name Here"
            value={state.personalInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={state.personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+1234567890"
            value={state.personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            placeholder="mm/dd/yyyy"
            value={state.personalInfo.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Street Address"
            value={state.personalInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="City"
            value={state.personalInfo.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="State"
            value={state.personalInfo.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postal">Postal Code</Label>
          <Input
            id="postal"
            placeholder="Postal Code"
            value={state.personalInfo.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergency">Emergency Contact</Label>
          <Input
            id="emergency"
            placeholder="Emergency Contact Number"
            value={state.personalInfo.emergencyContact}
            onChange={(e) => handleChange("emergencyContact", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input
            id="gender"
            placeholder="Male/Female"
            // value={state.personalInfo.postalCode}
            // onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shoesize">Shoe Sizes</Label>
          <Input
            id="shoesize"
            placeholder="Shoe Size"
            // value={state.personalInfo.emergencyContact}
            // onChange={(e) => handleChange("emergencyContact", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            placeholder="5'4''"
            // value={state.personalInfo.postalCode}
            // onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            placeholder="50lbs"
            // value={state.personalInfo.emergencyContact}
            // onChange={(e) => handleChange("emergencyContact", e.target.value)}
          />
        </div>

        {/* <div className="space-y-2" >
          <Label htmlFor="courseName">Course Name</Label>
          <Select value={state.personalInfo.courseName} onValueChange={(value) => handleChange("courseName", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open-water">Open Water Diver</SelectItem>
              <SelectItem value="advanced-open-water">Advanced Open Water</SelectItem>
              <SelectItem value="rescue-diver">Rescue Diver</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>
    </div>
  );
}
