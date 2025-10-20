"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type BookingState, useBooking } from "./booking-context";
import { PersonalInformationStep } from "./steps/personal-information-step";
// import { DocumentUploadStep } from "./steps/document-upload-step";
import { AllInformationDoneStep } from "./steps/all-information-done-step";
// import { bookingReducer, createInitialState } from "./booking-reducer";

// type FormConfig = {
//   id: string;
//   label: string;
// };

const steps = [
  { id: 0, title: "Personal Information", component: PersonalInformationStep },
  { id: 1, title: "All Information Done", component: AllInformationDoneStep },
  // {
  //   id: 2,
  //   title: "Medical Certifications & Document",
  //   component: DocumentUploadStep,
  // },
];

// Detailed validation with error messages for each step
const validateStepWithErrors = (
  stepIndex: number,
  state: BookingState,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  switch (stepIndex) {
    case 0: // Personal Information Step
      const { personalInfo } = state;

      if (!personalInfo.name?.trim()) {
        errors.push("Name is required");
      }
      if (!personalInfo.email?.trim()) {
        errors.push("Email is required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
        errors.push("Please enter a valid email address");
      }
      if (!personalInfo.phone?.trim()) {
        errors.push("Phone number is required");
      }
      if (!personalInfo.dateOfBirth?.trim()) {
        errors.push("Date of birth is required");
      }
      if (!personalInfo.address?.trim()) {
        errors.push("Address is required");
      }
      if (!personalInfo.city?.trim()) {
        errors.push("City is required");
      }
      if (!personalInfo.state?.trim()) {
        errors.push("State is required");
      }
      if (!personalInfo.postalCode?.trim()) {
        errors.push("Postal code is required");
      }
      // if (!personalInfo.emergencyName?.trim()) {
      //   errors.push("Emergency contact name is required")
      // }
      // if (!personalInfo.emergencyPhoneNumber?.trim()) {
      //   errors.push("Emergency contact phone is required")
      // }
      if (!personalInfo.gender?.trim()) {
        errors.push("Gender is required");
      }
      if (
        !personalInfo.shoeSize ||
        String(personalInfo.shoeSize).trim() === ""
      ) {
        errors.push("Shoe size is required");
      }
      if (!personalInfo.hight || String(personalInfo.hight).trim() === "") {
        errors.push("Height is required");
      }
      if (!personalInfo.weight || String(personalInfo.weight).trim() === "") {
        errors.push("Weight is required");
      }
      break;

    case 1: // All Information Done Step
      // No specific fields to validate here
      break;

    default:
      errors.push("Invalid step");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Simple validation function for button state
const validateStep = (stepIndex: number, state: BookingState): boolean => {
  return validateStepWithErrors(stepIndex, state).isValid;
};



export function MultiStepForm() {
  const { state, dispatch } = useBooking();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const currentStepData = steps[state.currentStep];
  const CurrentStepComponent = currentStepData?.component;

  // Check if current step is valid
  const isCurrentStepValid = validateStep(state.currentStep, state);

  console.log("this is state",state)

  const handleNext = () => {
    // Trigger validation display in child component
    window.dispatchEvent(new Event("trigger-validation"));

    // Small delay to allow child component to update
    setTimeout(() => {
      // Validate current step and get errors
      const validation = validateStepWithErrors(state.currentStep, state);

      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setShowValidation(true);
        // Scroll to top to show error message
        window.scrollTo({ top: 0, behavior: "smooth" });
        return; // ⬅️ THIS BLOCKS PROGRESSION
      }

      // This code only runs if validation passes
      setValidationErrors([]);
      setShowValidation(false);

      if (isLastStep && validation.isValid) {
        console.log("Form completed!", state);
      } else if (state.currentStep < steps.length - 1 && validation.isValid) {
        dispatch({ type: "SET_STEP", payload: state.currentStep + 1 }); // Only advances if valid
      }
    }, 50);
  };

  const handleBack = () => {
    if (state.currentStep > 0) {
      setValidationErrors([]);
      setShowValidation(false);
      // Reset validation trigger in child component
      window.dispatchEvent(new Event("reset-validation"));
      dispatch({ type: "SET_STEP", payload: state.currentStep - 1 });
    }
  };

  const isLastStep = state.currentStep === steps.length - 1;

  return (
    <Card className="p-6 mt-6">
      {/* Validation Error Alert */}
      <div className="text-center font-bold text-2xl text-gray-700 mb-6">
        Course Booking For Single Person
      </div>
      {showValidation && validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">
                Please complete all required fields
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

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

        {/* Hide the Complete button on the last step (index 2) */}
        {state.currentStep !== 1 && (
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
