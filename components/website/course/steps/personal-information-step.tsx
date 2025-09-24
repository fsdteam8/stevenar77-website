"use client";

import React, { useState } from "react";
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

  // Track which fields have been touched to show errors only after user interacts
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleChange = (field: string, value: string) => {
    dispatch({ type: "SET_PERSONAL_INFO", payload: { [field]: value } });
  };

  // Mark field as touched on blur
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Simple required fields list
  const requiredFields: PersonalInfoKeys[] = [
  "name",
  "email",
  "phone",
  "dateOfBirth",
  "address",
  "postalCode",
  "emergencyContact",
  "gender",
  "shoeSize",
  "hight", // not height
  "weight",
];


  type PersonalInfoKeys = keyof typeof state.personalInfo;

  const isError = (field: PersonalInfoKeys) => {
    if (!requiredFields.includes(field)) return false;
    if (!touched[field]) return false;

    const value = state.personalInfo[field];

    if (typeof value === "string") {
      return value.trim() === "";
    }

    return !value;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-[#343a40]">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className={isError("name") ? "text-red-600" : ""}
          >
            Name
          </Label>
          <Input
            id="name"
            placeholder="Full Name Here"
            value={state.personalInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={isError("email") ? "text-red-600" : ""}
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={state.personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className={isError("phone") ? "text-red-600" : ""}
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            placeholder="+1234567890"
            value={state.personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="dob"
            className={isError("dateOfBirth") ? "text-red-600" : ""}
          >
            Date of Birth
          </Label>
          <Input
            id="dob"
            placeholder="mm/dd/yyyy"
            value={state.personalInfo.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            onBlur={() => handleBlur("dateOfBirth")}
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label
            htmlFor="address"
            className={isError("address") ? "text-red-600" : ""}
          >
            Address
          </Label>
          <Input
            id="address"
            placeholder="Street Address"
            value={state.personalInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
            onBlur={() => handleBlur("address")}
            required
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
          <Label
            htmlFor="postal"
            className={isError("postalCode") ? "text-red-600" : ""}
          >
            Postal Code
          </Label>
          <Input
            id="postal"
            placeholder="Postal Code"
            value={state.personalInfo.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            onBlur={() => handleBlur("postalCode")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="emergency"
            className={isError("emergencyContact") ? "text-red-600" : ""}
          >
            Emergency Contact
          </Label>
          <Input
            id="emergency"
            placeholder="Emergency Contact Number"
            value={state.personalInfo.emergencyContact}
            onChange={(e) => handleChange("emergencyContact", e.target.value)}
            onBlur={() => handleBlur("emergencyContact")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="gender"
            className={isError("gender") ? "text-red-600" : ""}
          >
            Gender
          </Label>
          <Select
            value={state.personalInfo.gender || ""}
            onValueChange={(value) => {
              handleChange("gender", value);
              setTouched((prev) => ({ ...prev, gender: true }));
            }}
            required
          >
            <SelectTrigger onBlur={() => handleBlur("gender")}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="shoesize"
            className={isError("shoeSize") ? "text-red-600" : ""}
          >
            Shoe Size
          </Label>
          <Input
            id="shoesize"
            placeholder="Shoe Size"
            value={state.personalInfo.shoeSize || ""}
            onChange={(e) => handleChange("shoeSize", e.target.value)}
            onBlur={() => handleBlur("shoeSize")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="hight"
            className={isError("hight") ? "text-red-600" : ""}
          >
            Height
          </Label>
          <Input
            id="hight"
            placeholder="5'4''"
            value={state.personalInfo.hight || ""}
            onChange={(e) => handleChange("hight", e.target.value)}
            onBlur={() => handleBlur("hight")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="weight"
            className={isError("weight") ? "text-red-600" : ""}
          >
            Weight
          </Label>
          <Input
            id="weight"
            placeholder="50lbs"
            value={state.personalInfo.weight || ""}
            onChange={(e) => handleChange("weight", e.target.value)}
            onBlur={() => handleBlur("weight")}
            required
          />
        </div>
      </div>
    </div>
  );
}
