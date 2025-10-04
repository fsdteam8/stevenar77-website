"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingState, useBooking } from "./booking-context";
import { PersonalInformationStep } from "./steps/personal-information-step";
import { MedicalHistoryStep } from "./steps/medical-history-step";
import { ActivityQuestionsStep } from "./steps/activity-questions-step";
import { LiabilityReleaseStep } from "./steps/liability-release-step";
import { DocumentUploadStep } from "./steps/document-upload-step";
import { ElectronicSignatureStep } from "./steps/electronic-signature-step";
import { AllInformationDoneStep } from "./steps/all-information-done-step";

// import { FaArrowRight } from "react-icons/fa"

const steps = [
  { id: 0, title: "Personal Information", component: PersonalInformationStep },
  // { id: 1, title: "Medical History Checklist", component: MedicalHistoryStep },
  // {
  //   id: 2,
  //   title: "Activity Specific Questions",
  //   component: ActivityQuestionsStep,
  // },
  // {
  //   id: 3,
  //   title: "Liability Release Agreement",
  //   component: LiabilityReleaseStep,
  // },
  // { id: 4, title: "Electronic Signature", component: ElectronicSignatureStep },
  {
    id: 1,
    title: "Medical Certifications & Document",
    component: DocumentUploadStep,
  },
  { id: 2, title: "All Information Done", component: AllInformationDoneStep },
];

console.log()
// Validation functions for each step
const validateStep = (stepIndex: number, state: BookingState) => {
  switch (stepIndex) {
    case 0: // Personal Information Step
      const { personalInfo } = state;
      return !!(
        (
          personalInfo.name?.trim() &&
          personalInfo.email?.trim() &&
          personalInfo.phone?.trim() &&
          personalInfo.dateOfBirth?.trim() &&
          personalInfo.address?.trim() &&
          personalInfo.postalCode?.trim() &&
          personalInfo.emergencyName?.trim() &&
          personalInfo.emergencyPhoneNumber?.trim()
        )
        // Note: gender, shoesize, height, weight need to be added to types and connected to state
      );

    // case 1: // Medical History Step
    //   // This step is considered valid if user has interacted with it
    //   // Since all conditions can be false (user has no medical conditions)
    //   // We just need to ensure the medicalHistory object exists
    //   return state.medicalHistory !== undefined;

    // case 2: // Activity Questions Step
    //   const { activityQuestions } = state;
    //   return !!(
    //     activityQuestions.swimmingLevel?.trim() &&
    //     activityQuestions.divingExperience?.trim() &&
    //     activityQuestions.lastPhysicalExam?.trim() &&
    //     activityQuestions.fitnessLevel?.trim() &&
    //     activityQuestions.physicalApproval === true &&
    //     activityQuestions.canSwim200m === true &&
    //     typeof activityQuestions.claustrophobia === "boolean" &&
    //     typeof activityQuestions.panicAttacks === "boolean"
    //   );

    // case 3: // Liability Release Step
    //   const { liabilityAgreement } = state;
    //   return !!(
    //     liabilityAgreement.releaseOfLiability === true &&
    //     liabilityAgreement.medicalFitness === true &&
    //     liabilityAgreement.equipmentTraining === true
    //   );

    // case 4: // Electronic Signature Step
    //   return !!(state.signature?.trim() && state.agreed === true);
    case 1: // Document Upload Step
      // This step might be optional depending on requirements
      // If documents are required, uncomment the next line:
      // return state.documents.length > 0;

      // If documents are optional:
      return true;
    case 2: //All information done
      return true;

    default:
      return false;
  }
};

export function MultiStepForm() {
  const { state, dispatch } = useBooking();

  const currentStepData = steps[state.currentStep];
  const CurrentStepComponent = currentStepData?.component;

  // Check if current step is valid
  const isCurrentStepValid = validateStep(state.currentStep, state);

  const handleNext = () => {
    if (isLastStep && isCurrentStepValid) {
      // Handle form completion/submission here
      console.log("Form completed!", state);
      // You might want to dispatch a completion action or call an API
      // dispatch({ type: "COMPLETE_BOOKING" });
    } else if (state.currentStep < steps.length - 1 && isCurrentStepValid) {
      dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
    }
  };

  const handleBack = () => {
    if (state.currentStep > 0) {
      dispatch({ type: "SET_STEP", payload: state.currentStep - 1 });
    }
  };

  const isLastStep = state.currentStep === steps.length - 1;

  return (
    <Card className="p-6 mt-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= state.currentStep
                  ? "bg-[#0694a2] text-white"
                  : "bg-[#c0c3c1] text-[#68706a]"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${index < state.currentStep ? "bg-[#0694a2]" : "bg-[#c0c3c1]"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {CurrentStepComponent && <CurrentStepComponent />}

      {/* Step Content */}

      {/* Navigation Buttons */}
      {/* <div className="flex justify-between mt-8">
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
          disabled={!isCurrentStepValid}
          className="px-8 py-2 bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? "Complete" : "Next"}
        </Button>
      </div> */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={state.currentStep === 0}
          className="px-8 py-2 border-[#0694a2] text-[#0694a2] hover:bg-[#0694a2] hover:text-white bg-transparent"
        >
          Back
        </Button>

        {/* Hide the Complete button on the 7th step (index 6) */}
        {state.currentStep !== 6 && (
          <Button
            onClick={handleNext}
            disabled={!isCurrentStepValid}
            className="px-8 py-2 bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastStep ? "Complete" : "Next"}
          </Button>
        )}
      </div>
    </Card>
  );
}
