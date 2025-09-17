"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useBooking } from "./booking-context"
import Image from "next/image"

export function BookingContent() {
  const { state, dispatch } = useBooking()
  const [showPersonalInfo, setShowPersonalInfo] = useState(false)

  const availableTimes = [
    "12:00 PM",
    "11:00 AM",
    "10:00 AM",
    "09:00 AM",
    "09:00 AM",
    "07:00 AM",
    "08:00 PM",
    "05:00 PM",
  ]

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      dispatch({ type: "SET_DATE", payload: date })
      setShowPersonalInfo(true)
    }
  }

  const handleTimeSelect = (time: string) => {
    dispatch({ type: "SET_TIME", payload: time })
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    dispatch({ type: "SET_PERSONAL_INFO", payload: { [field]: value } })
  }

  return (
    <div className="space-y-6">
      {/* Course Selection */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#343a40]">Select Your Course</h2>
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
              The most popular scuba course in the world! Get your first scuba diving certification.
            </p>
            <div className="flex items-center gap-4 text-sm text-[#6c757d]">
              <span className="bg-[#0694a2] text-white px-2 py-1 rounded text-xs">BEST DEAL</span>
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

      {/* Number of Participants */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#343a40]">Number of Participants</h2>
        <Select
          value={state.participants.toString()}
          onValueChange={(value) => dispatch({ type: "SET_PARTICIPANTS", payload: Number.parseInt(value) })}
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
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#343a40]">Select Date or Time</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3 text-center">February 2025</h3>
            <Calendar
              mode="single"
              selected={state.selectedDate || undefined}
              onSelect={handleDateSelect}
              className="rounded-md border"
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
                  variant={state.selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimeSelect(time)}
                  className={state.selectedTime === time ? "bg-[#0694a2] hover:bg-[#0694a2]/90" : ""}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      {showPersonalInfo && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#343a40]">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Full Name Here"
                value={state.personalInfo.name}
                onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={state.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={state.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                placeholder="mm/dd/yyyy"
                value={state.personalInfo.dateOfBirth}
                onChange={(e) => handlePersonalInfoChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street Address"
                value={state.personalInfo.address}
                onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={state.personalInfo.city}
                onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                value={state.personalInfo.state}
                onChange={(e) => handlePersonalInfoChange("state", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="postal">Postal Code</Label>
              <Input
                id="postal"
                placeholder="Postal Code"
                value={state.personalInfo.postalCode}
                onChange={(e) => handlePersonalInfoChange("postalCode", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emergency">Emergency Contact</Label>
              <Input
                id="emergency"
                placeholder="Emergency Contact Number"
                value={state.personalInfo.emergencyContact}
                onChange={(e) => handlePersonalInfoChange("emergencyContact", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="courseName">Course Name</Label>
              <Select
                value={state.personalInfo.courseName}
                onValueChange={(value) => handlePersonalInfoChange("courseName", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open-water">Open Water Diver</SelectItem>
                  <SelectItem value="advanced-open-water">Advanced Open Water</SelectItem>
                  <SelectItem value="rescue-diver">Rescue Diver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
