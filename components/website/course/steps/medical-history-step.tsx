"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useBooking } from "../booking-context"
import { useState } from "react"

const medicalConditions = [
  "Heart Problems or heart disease",
  "Respiratory issues or lung disease",
  "High blood pressure",
  "Diabetes",
  "Epilepsy or seizure",
  "Asthma or breathing difficulties",
  "Recent surgeries or hospitalizations",
  "Pregnancy",
  "Currently taking medications",
]

export function MedicalHistoryStep() {
  const { state, dispatch } = useBooking()
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleToggle = (condition: string, checked: boolean) => {
    dispatch({
      type: "SET_MEDICAL_HISTORY",
      payload: {
        ...state.medicalHistory,
        [condition]: checked,
      },
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">Medical History Checklist</h2>

      <p className="text-[#6c757d] mb-6">
        Please indicate if you have or have had any of the following medical conditions. This information is
        confidential and will only be used to ensure your safety during diving activities.
      </p>

      <div className="space-y-4">
        {medicalConditions.map((condition) => (
          <div key={condition} className="flex items-center justify-between p-4 border rounded-lg">
            <Label htmlFor={condition} className="text-[#68706a] cursor-pointer flex-1">
              {condition}
            </Label>
            <Switch
              id={condition}
              checked={state.medicalHistory[condition] || false}
              onCheckedChange={(checked) => handleToggle(condition, checked)}
              className="data-[state=checked]:bg-[#0694a2]"
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Label htmlFor="additional-info">Additional Medical Information (Optional)</Label>
        <Textarea
          id="additional-info"
          placeholder="Please provide any additional medical information that might be relevant..."
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="mt-2"
        />
      </div>
    </div>
  )
}
