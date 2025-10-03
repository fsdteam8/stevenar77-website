// "use client";

// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useBooking } from "../booking-context";

// export function PersonalInformationStep() {
//   const { state, dispatch } = useBooking();

//   // Track which fields have been touched to show errors only after user interacts
//   const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

//   const handleChange = (field: string, value: string) => {
//     dispatch({ type: "SET_PERSONAL_INFO", payload: { [field]: value } });
//   };

//   // Mark field as touched on blur
//   const handleBlur = (field: string) => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//   };

//   // Simple required fields list
//   const requiredFields: PersonalInfoKeys[] = [
//   "name",
//   "email",
//   "phone",
//   "dateOfBirth",
//   "address",
//   "postalCode",
//   "emergencyContact",
//   "gender",
//   "shoeSize",
//   "hight", // not height
//   "weight",
// ];


//   type PersonalInfoKeys = keyof typeof state.personalInfo;

//   const isError = (field: PersonalInfoKeys) => {
//     if (!requiredFields.includes(field)) return false;
//     if (!touched[field]) return false;

//     const value = state.personalInfo[field];

//     if (typeof value === "string") {
//       return value.trim() === "";
//     }

//     return !value;
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-6 text-[#343a40]">
//         Personal Information
//       </h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label
//             htmlFor="name"
//             className={isError("name") ? "text-red-600" : ""}
//           >
//             Name
//           </Label>
//           <Input
//             id="name"
//             placeholder="Full Name Here"
//             value={state.personalInfo.name}
//             onChange={(e) => handleChange("name", e.target.value)}
//             onBlur={() => handleBlur("name")}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="email"
//             className={isError("email") ? "text-red-600" : ""}
//           >
//             Email Address
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="example@example.com"
//             value={state.personalInfo.email}
//             onChange={(e) => handleChange("email", e.target.value)}
//             onBlur={() => handleBlur("email")}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="phone"
//             className={isError("phone") ? "text-red-600" : ""}
//           >
//             Phone Number
//           </Label>
//           <Input
//             id="phone"
//             placeholder="+1234567890"
//             value={state.personalInfo.phone}
//             onChange={(e) => handleChange("phone", e.target.value)}
//             onBlur={() => handleBlur("phone")}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="dob"
//             className={isError("dateOfBirth") ? "text-red-600" : ""}
//           >
//             Date of Birth
//           </Label>
//           <Input
//             id="dob"
//             placeholder="mm/dd/yyyy"
//             value={state.personalInfo.dateOfBirth}
//             onChange={(e) => handleChange("dateOfBirth", e.target.value)}
//             onBlur={() => handleBlur("dateOfBirth")}
//             required
//           />
//         </div>

//         <div className="md:col-span-2 space-y-2">
//           <Label
//             htmlFor="address"
//             className={isError("address") ? "text-red-600" : ""}
//           >
//             Address
//           </Label>
//           <Input
//             id="address"
//             placeholder="Street Address"
//             value={state.personalInfo.address}
//             onChange={(e) => handleChange("address", e.target.value)}
//             onBlur={() => handleBlur("address")}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="city">City</Label>
//           <Input
//             id="city"
//             placeholder="City"
//             value={state.personalInfo.city}
//             onChange={(e) => handleChange("city", e.target.value)}
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="state">State</Label>
//           <Input
//             id="state"
//             placeholder="State"
//             value={state.personalInfo.state}
//             onChange={(e) => handleChange("state", e.target.value)}
//           />
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="postal"
//             className={isError("postalCode") ? "text-red-600" : ""}
//           >
//             Postal Code
//           </Label>
//           <Input
//             id="postal"
//             placeholder="Postal Code"
//             value={state.personalInfo.postalCode}
//             onChange={(e) => handleChange("postalCode", e.target.value)}
//             onBlur={() => handleBlur("postalCode")}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="emergency"
//             className={isError("emergencyContact") ? "text-red-600" : ""}
//           >
//             Emergency Contact
//           </Label>
//           <Input
//             id="emergency"
//             placeholder="Emergency Contact Number"
//             value={state.personalInfo.emergencyContact}
//             onChange={(e) => handleChange("emergencyContact", e.target.value)}
//             onBlur={() => handleBlur("emergencyContact")}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="gender"
//             className={isError("gender") ? "text-red-600" : ""}
//           >
//             Gender
//           </Label>
//           <Select
//             value={state.personalInfo.gender || ""}
//             onValueChange={(value) => {
//               handleChange("gender", value);
//               setTouched((prev) => ({ ...prev, gender: true }));
//             }}
//             required
//           >
//             <SelectTrigger onBlur={() => handleBlur("gender")}>
//               <SelectValue placeholder="Select gender" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="male">Male</SelectItem>
//               <SelectItem value="female">Female</SelectItem>
//               <SelectItem value="others">Others</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="shoesize"
//             className={isError("shoeSize") ? "text-red-600" : ""}
//           >
//             Shoe Size
//           </Label>
//           <Input
//             id="shoesize"
//             placeholder="Shoe Size"
//             value={state.personalInfo.shoeSize || ""}
//             onChange={(e) => handleChange("shoeSize", e.target.value)}
//             onBlur={() => handleBlur("shoeSize")}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="hight"
//             className={isError("hight") ? "text-red-600" : ""}
//           >
//             Height
//           </Label>
//           <Input
//             id="hight"
//             placeholder="5'4''"
//             value={state.personalInfo.hight || ""}
//             onChange={(e) => handleChange("hight", e.target.value)}
//             onBlur={() => handleBlur("hight")}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label
//             htmlFor="weight"
//             className={isError("weight") ? "text-red-600" : ""}
//           >
//             Weight
//           </Label>
//           <Input
//             id="weight"
//             placeholder="50lbs"
//             value={state.personalInfo.weight || ""}
//             onChange={(e) => handleChange("weight", e.target.value)}
//             onBlur={() => handleBlur("weight")}
//             required
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBooking } from "../booking-context"

type PersonalInfoKeys =
  | "name"
  | "email"
  | "phone"
  | "dateOfBirth"
  | "address"
  | "city"
  | "state"
  | "postalCode"
  | "emergencyContact"
  | "gender"
  | "shoeSize"
  | "hight"
  | "weight"

export function PersonalInformationStep() {
  const { state, dispatch } = useBooking()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(() => {
    if (state.personalInfo.dateOfBirth) {
      const [month, day, year] = state.personalInfo.dateOfBirth.split("/").map(Number)
      return new Date(year, month - 1, day)
    }
    return undefined
  })

  const [heightFeet, setHeightFeet] = useState<string>(() => {
    const match = state.personalInfo.height?.match(/^(\d+)'/)
    return match ? match[1] : ""
  })

  const [heightInches, setHeightInches] = useState<string>(() => {
    const match = state.personalInfo.height?.match(/'(\d+)"$/)
    return match ? match[1] : ""
  })

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
    "hight",
    "weight",
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateField = (field: PersonalInfoKeys, rawValue: any): string => {
    const value = String(rawValue ?? "").trim()

    if (!value) {
      return "This field is required"
    }

    switch (field) {
      case "name":
        if (value.length < 2) {
          return "Name must be at least 2 characters"
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          return "Name can only contain letters, spaces, hyphens, and apostrophes"
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address"
        }
        break

      case "phone":
        const phoneDigits = value.replace(/\D/g, "")
        if (phoneDigits.length < 10) {
          return "Phone number must be at least 10 digits"
        }
        if (phoneDigits.length > 15) {
          return "Phone number is too long"
        }
        break

      case "emergencyContact":
        const emergencyDigits = value.replace(/\D/g, "")
        if (emergencyDigits.length < 10) {
          return "Emergency contact must be at least 10 digits"
        }
        if (emergencyDigits.length > 15) {
          return "Emergency contact is too long"
        }
        break

      case "dateOfBirth":
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/
        if (!dateRegex.test(value)) {
          return "Please use MM/DD/YYYY format"
        }

        const [month, day, year] = value.split("/").map(Number)
        const date = new Date(year, month - 1, day)
        const today = new Date()

        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
          return "Please enter a valid date"
        }

        const minAge = new Date()
        minAge.setFullYear(minAge.getFullYear() - 5)
        if (date > minAge) {
          return "Must be at least 5 years old"
        }

        const maxAge = new Date()
        maxAge.setFullYear(maxAge.getFullYear() - 120)
        if (date < maxAge) {
          return "Please enter a valid birth date"
        }
        break

      case "address":
        if (value.length < 5) {
          return "Please enter a complete address"
        }
        break

      case "postalCode":
        if (!/^[A-Za-z0-9\s-]{3,10}$/.test(value)) {
          return "Please enter a valid postal code"
        }
        break

      case "shoeSize":
        const shoeSize = Number.parseFloat(value)
        if (isNaN(shoeSize)) {
          return "Please enter a valid shoe size"
        }
        if (shoeSize < 1 || shoeSize > 20) {
          return "Shoe size must be between 1 and 20"
        }
        break

      case "hight":
        const heightMatch = value.match(/^(\d+)'(\d+)"$/)
        if (!heightMatch) {
          return "Please enter both feet and inches"
        }

        const feet = Number.parseInt(heightMatch[1], 10)
        const inches = Number.parseInt(heightMatch[2], 10)

        if (isNaN(feet) || feet < 3 || feet > 8) {
          return "Feet must be between 3 and 8"
        }

        if (isNaN(inches) || inches < 0 || inches > 11) {
          return "Inches must be between 0 and 11"
        }
        break

      case "weight":
        const weightMatch = value.match(/^(\d+\.?\d*)\s?(lbs?|kgs?|kg|pounds?|kilograms?)?$/i)
        if (!weightMatch) {
          return "Please enter a valid weight (e.g., 50lbs or 70kg)"
        }

        const weightValue = Number.parseFloat(weightMatch[1])
        if (isNaN(weightValue) || weightValue < 20 || weightValue > 500) {
          return "Weight must be between 20 and 500"
        }
        break

      case "gender":
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          return "Please select a valid gender"
        }
        break
    }

    return ""
  }

  useEffect(() => {
    const newErrors: Record<string, string> = {}

    requiredFields.forEach((field) => {
      const value = state.personalInfo[field] || ""
      const error = validateField(field, value)
      if (error) {
        newErrors[field] = error
      }
    })

    setErrors(newErrors)
  }, [state.personalInfo])

  const handleChange = (field: PersonalInfoKeys, value: string) => {
    dispatch({ type: "SET_PERSONAL_INFO", payload: { [field]: value } })
  }

  const handleHeightChange = (type: "feet" | "inches", value: string) => {
    const numValue = value.replace(/\D/g, "")

    if (type === "feet") {
      setHeightFeet(numValue)
      if (numValue && heightInches) {
        handleChange("hight", `${numValue}'${heightInches}"`)
      } else if (numValue) {
        handleChange("hight", `${numValue}'0"`)
      }
    } else {
      setHeightInches(numValue)
      if (heightFeet && numValue) {
        handleChange("hight", `${heightFeet}'${numValue}"`)
      } else if (heightFeet) {
        handleChange("hight", `${heightFeet}'0"`)
      }
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    setDateOfBirth(date)
    if (date) {
      const formattedDate = format(date, "MM/dd/yyyy")
      dispatch({ type: "SET_PERSONAL_INFO", payload: { dateOfBirth: formattedDate } })
    } else {
      dispatch({ type: "SET_PERSONAL_INFO", payload: { dateOfBirth: "" } })
    }
  }

  const hasError = (field: PersonalInfoKeys): boolean => {
    return !!errors[field]
  }

  const getErrorMessage = (field: PersonalInfoKeys): string => {
    return errors[field] || ""
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-[#343a40]">Personal Information</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className={hasError("name") ? "text-red-600" : ""}>
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Full Name Here"
            value={state.personalInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={hasError("name") ? "border-red-500 focus-visible:ring-red-500" : ""}
            aria-invalid={hasError("name")}
            aria-describedby={hasError("name") ? "name-error" : undefined}
          />
          {hasError("name") && (
            <p id="name-error" className="text-sm text-red-600">
              {getErrorMessage("name")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className={hasError("email") ? "text-red-600" : ""}>
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={state.personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={hasError("email") ? "border-red-500 focus-visible:ring-red-500" : ""}
            aria-invalid={hasError("email")}
            aria-describedby={hasError("email") ? "email-error" : undefined}
          />
          {hasError("email") && (
            <p id="email-error" className="text-sm text-red-600">
              {getErrorMessage("email")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className={hasError("phone") ? "text-red-600" : ""}>
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="+1234567890"
            value={state.personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={hasError("phone") ? "border-red-500 focus-visible:ring-red-500" : ""}
            aria-invalid={hasError("phone")}
            aria-describedby={hasError("phone") ? "phone-error" : undefined}
          />
          {hasError("phone") && (
            <p id="phone-error" className="text-sm text-red-600">
              {getErrorMessage("phone")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob" className={hasError("dateOfBirth") ? "text-red-600" : ""}>
            Date of Birth <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dob"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateOfBirth && "text-muted-foreground",
                  hasError("dateOfBirth") && "border-red-500 focus-visible:ring-red-500",
                )}
                aria-invalid={hasError("dateOfBirth")}
                aria-describedby={hasError("dateOfBirth") ? "dob-error" : undefined}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateOfBirth ? format(dateOfBirth, "MM/dd/yyyy") : "MM/DD/YYYY"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateOfBirth}
                onSelect={handleDateChange}
                captionLayout="dropdown-months"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                defaultMonth={dateOfBirth || new Date(2000, 0)}
                disabled={(date) => {
                  const minAge = new Date()
                  minAge.setFullYear(minAge.getFullYear() - 5)
                  const maxAge = new Date()
                  maxAge.setFullYear(maxAge.getFullYear() - 120)
                  return date > minAge || date < maxAge
                }}
              />
            </PopoverContent>
          </Popover>
          {hasError("dateOfBirth") && (
            <p id="dob-error" className="text-sm text-red-600">
              {getErrorMessage("dateOfBirth")}
            </p>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="address" className={hasError("address") ? "text-red-600" : ""}>
            Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            placeholder="Street Address"
            value={state.personalInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className={hasError("address") ? "border-red-500 focus-visible:ring-red-500" : ""}
            aria-invalid={hasError("address")}
            aria-describedby={hasError("address") ? "address-error" : undefined}
          />
          {hasError("address") && (
            <p id="address-error" className="text-sm text-red-600">
              {getErrorMessage("address")}
            </p>
          )}
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
          <Label htmlFor="postal" className={hasError("postalCode") ? "text-red-600" : ""}>
            Postal Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="postal"
            placeholder="Postal Code"
            value={state.personalInfo.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            className={hasError("postalCode") ? "border-red-500 focus-visible:ring-red-500" : ""}
            aria-invalid={hasError("postalCode")}
            aria-describedby={hasError("postalCode") ? "postal-error" : undefined}
          />
          {hasError("postalCode") && (
            <p id="postal-error" className="text-sm text-red-600">
              {getErrorMessage("postalCode")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergency" className={hasError("emergencyContact") ? "text-red-600" : ""}>
            Emergency Contact <span className="text-red-500">*</span>
          </Label>
          <Input
            id="emergency"
            placeholder="Emergency Contact Number"
            value={state.personalInfo.emergencyContact}
            onChange={(e) => handleChange("emergencyContact", e.target.value)}
            className={hasError("emergencyContact") ? "border-red-500 focus-visible:ring-red-500" : ""}
            aria-invalid={hasError("emergencyContact")}
            aria-describedby={hasError("emergencyContact") ? "emergency-error" : undefined}
          />
          {hasError("emergencyContact") && (
            <p id="emergency-error" className="text-sm text-red-600">
              {getErrorMessage("emergencyContact")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className={hasError("gender") ? "text-red-600" : ""}>
            Gender <span className="text-red-500">*</span>
          </Label>
          <Select value={state.personalInfo.gender || ""} onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger
              className={hasError("gender") ? "border-red-500 focus:ring-red-500" : ""}
              aria-invalid={hasError("gender")}
              aria-describedby={hasError("gender") ? "gender-error" : undefined}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
          {hasError("gender") && (
            <p id="gender-error" className="text-sm text-red-600">
              {getErrorMessage("gender")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="shoesize" className={hasError("shoeSize") ? "text-red-600" : ""}>
            Shoe Size <span className="text-red-500">*</span>
          </Label>
          <Input
            id="shoesize"
            placeholder="e.g., 8.5"
            value={state.personalInfo.shoeSize || ""}
            onChange={(e) => handleChange("shoeSize", e.target.value)}
            className={hasError("shoeSize") ? "border-red-500 focus-visible:ring-red-500" : ""}
            aria-invalid={hasError("shoeSize")}
            aria-describedby={hasError("shoeSize") ? "shoesize-error" : undefined}
          />
          {hasError("shoeSize") && (
            <p id="shoesize-error" className="text-sm text-red-600">
              {getErrorMessage("shoeSize")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className={hasError("hight") ? "text-red-600" : ""}>
            Height <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                id="heightFeet"
                type="number"
                placeholder="Feet"
                min="3"
                max="8"
                value={heightFeet}
                onChange={(e) => handleHeightChange("feet", e.target.value)}
                className={hasError("hight") ? "border-red-500 focus-visible:ring-red-500" : ""}
                aria-invalid={hasError("hight")}
                aria-describedby={hasError("hight") ? "height-error" : undefined}
                aria-label="Height in feet"
              />
            </div>
            <div className="flex-1">
              <Input
                id="heightInches"
                type="number"
                placeholder="Inches"
                min="0"
                max="11"
                value={heightInches}
                onChange={(e) => handleHeightChange("inches", e.target.value)}
                className={hasError("hight") ? "border-red-500 focus-visible:ring-red-500" : ""}
                aria-invalid={hasError("hight")}
                aria-describedby={hasError("hight") ? "height-error" : undefined}
                aria-label="Height in inches"
              />
            </div>
          </div>
          {hasError("hight") && (
            <p id="height-error" className="text-sm text-red-600">
              {getErrorMessage("hight")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className={hasError("weight") ? "text-red-600" : ""}>
            Weight <span className="text-red-500">*</span>
          </Label>
          <Input
            id="weight"
            placeholder="e.g., 50lbs or 70kg"
            value={state.personalInfo.weight || ""}
            onChange={(e) => handleChange("weight", e.target.value)}
            className={hasError("weight") ? "border-red-500 focus-visible:ring-red-500" : ""}
            aria-invalid={hasError("weight")}
            aria-describedby={hasError("weight") ? "weight-error" : undefined}
          />
          {hasError("weight") && (
            <p id="weight-error" className="text-sm text-red-600">
              {getErrorMessage("weight")}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
