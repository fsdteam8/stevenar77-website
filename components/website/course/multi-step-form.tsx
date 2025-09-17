"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBooking } from "./booking-context"
import { PersonalInformationStep } from "./steps/personal-information-step"
import { MedicalHistoryStep } from "./steps/medical-history-step"
import { ActivityQuestionsStep } from "./steps/activity-questions-step"
import { LiabilityReleaseStep } from "./steps/liability-release-step"
import { DocumentUploadStep } from "./steps/document-upload-step"
import { ElectronicSignatureStep } from "./steps/electronic-signature-step"

const steps = [
  { id: 0, title: "Personal Information", component: PersonalInformationStep },
  { id: 1, title: "Medical History Checklist", component: MedicalHistoryStep },
  { id: 2, title: "Activity Specific Questions", component: ActivityQuestionsStep },
  { id: 3, title: "Liability Release Agreement", component: LiabilityReleaseStep },
  { id: 4, title: "Medical Certifications & Document", component: DocumentUploadStep },
  { id: 5, title: "Electronic Signature", component: ElectronicSignatureStep },
]

export function MultiStepForm() {
  const { state, dispatch } = useBooking()

  const currentStepData = steps[state.currentStep]
  const CurrentStepComponent = currentStepData?.component

  const handleNext = () => {
    if (state.currentStep < steps.length - 1) {
      dispatch({ type: "SET_STEP", payload: state.currentStep + 1 })
    }
  }

  const handleBack = () => {
    if (state.currentStep > 0) {
      dispatch({ type: "SET_STEP", payload: state.currentStep - 1 })
    }
  }

  const isLastStep = state.currentStep === steps.length - 1

  return (
    <Card className="p-6 mt-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= state.currentStep ? "bg-[#0694a2] text-white" : "bg-[#c0c3c1] text-[#68706a]"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 ${index < state.currentStep ? "bg-[#0694a2]" : "bg-[#c0c3c1]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {CurrentStepComponent && <CurrentStepComponent />}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={state.currentStep === 0}
          className="px-8 py-2 border-[#0694a2] text-[#0694a2] hover:bg-[#0694a2] hover:text-white bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={isLastStep}
          className="px-8 py-2 bg-[#0694a2] hover:bg-[#0694a2]/90 text-white"
        >
          {isLastStep ? "Complete" : "Next"}
        </Button>
      </div>
    </Card>
  )
}
