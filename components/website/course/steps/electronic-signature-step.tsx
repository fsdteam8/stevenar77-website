"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useBooking } from "../booking-context"
import { useState } from "react"

export function ElectronicSignatureStep() {
  const { state, dispatch } = useBooking()
  const [agreed, setAgreed] = useState(false)

  const handleSignatureChange = (value: string) => {
    dispatch({ type: "SET_SIGNATURE", payload: value })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-[#343a40]">Electronic Signature</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="signature" className="text-base font-medium">
            Name
          </Label>
          <Input
            id="signature"
            placeholder="Full Name Here"
            value={state.signature}
            onChange={(e) => handleSignatureChange(e.target.value)}
            className="mt-2 text-lg"
          />
          <p className="text-sm text-[#6c757d] mt-2">
            By typing your name above, you are creating a legally binding electronic signature.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="agreement"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="mt-1 data-[state=checked]:bg-[#0694a2] data-[state=checked]:border-[#0694a2]"
          />
          <Label htmlFor="agreement" className="text-[#68706a] cursor-pointer">
            I agree that my electronic signature is the legal equivalent of my handwritten signature.
          </Label>
        </div>
      </div>
    </div>
  )
}
