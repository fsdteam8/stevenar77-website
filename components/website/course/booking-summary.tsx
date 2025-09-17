"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBooking } from "./booking-context"
import { format } from "date-fns"
import Image from "next/image"

export function BookingSummary() {
  const { state } = useBooking()

  const formatDate = (date: Date | null) => {
    if (!date) return "Not selected"
    return format(date, "EEEE, MMMM dd")
  }

  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">Booking Summary</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Image src="/scuba-diving-course-thumbnail.jpg" alt="Course thumbnail" width={16} height={12} className=" rounded object-cover" />
          <div>
            <h3 className="font-medium text-[#343a40]">{state.course.name}</h3>
            <p className="text-sm text-[#6c757d]">Age: {state.course.age}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-[#6c757d]">
            <span>📅</span>
            <span>{formatDate(state.selectedDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6c757d]">
            <span>⏰</span>
            <span>{state.selectedTime || "Not selected"}</span>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-[#6c757d]">Course fee (x{state.participants})</span>
            <span className="font-medium">${state.course.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6c757d]">Equipment rental</span>
            <span className="font-medium">Included</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6c757d]">Digital certification</span>
            <span className="font-medium">Included</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${state.course.price * state.participants}</span>
          </div>
          <p className="text-xs text-[#6c757d] mt-1">100% Safe & Secure</p>
          <p className="text-xs text-[#6c757d]">Free Cancellation up to 24h</p>
        </div>

        <Button className="w-full bg-[#0694a2] hover:bg-[#0694a2]/90 text-white">Proceed to Payment</Button>

        <div className="mt-6">
          <h3 className="font-medium mb-3 text-[#343a40]">What&apos;s Included</h3>
          <ul className="space-y-2 text-sm text-[#6c757d]">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Theory sessions
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Pool training
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>4 open water dives
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Digital certification
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
