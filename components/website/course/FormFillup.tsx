"use client";
import React from 'react'
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type BookingState, useBooking } from "./booking-context";
import { PersonalInformationStep } from "./steps/personal-information-step";
import { DocumentUploadStep } from "./steps/document-upload-step";
import { AllInformationDoneStep } from "./steps/all-information-done-step";
// import { bookingReducer, createInitialState } from "./booking-reducer";

type FormConfig = {
  id: string;
  label: string;
};

const steps = [
  {
    id: 0,
    title: "Medical Certifications & Document",
    component: DocumentUploadStep,
  },
];

// Detailed validation with error messages for each step
const validateStepWithErrors = (
  stepIndex: number,
  state: BookingState,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  switch (stepIndex) {

    case 0: // Document Upload Step
      // Check if all visible forms for current course are completed
      const formConfigs: FormConfig[] = [
        { id: "modal1", label: "Standards Form" },
        { id: "modal2", label: "Continuing Education" },
        { id: "modal3", label: "Divers Activity" },
        { id: "modal4", label: "Quick Review-Open Waters" },
        { id: "modal5", label: "Divers Medical" },
        { id: "modal6", label: "Enriched Training" },
        { id: "modal7", label: "Equipment Rental" },
        { id: "modal8", label: "Rescue Diver Quick Review" },
        { id: "modal9", label: "Enriched Air Quick Review" },
      ];

      // Filter forms relevant to current course
      const visibleForms = formConfigs.filter((f) =>
        state.course.formTitle?.some((title) =>
          f.label.toLowerCase().includes(title.toLowerCase()),
        ),
      );

      // ✅ Check if all visible forms are completed
      const incompleteForms = visibleForms.every((f) =>
        state.submittedForms.includes(f.id),
      );

      // Find missing forms
      // const incompleteForms = visibleForms.filter(
      //   (f) => !state.submittedForms?.includes(f.id),
      // );

      if (!incompleteForms) {
        errors.push("Please complete all required forms before continuing.");
      }
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

export function FormFillup() {
  const { state, dispatch } = useBooking();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const currentStepData = steps[state.currentStep];
  const CurrentStepComponent = currentStepData?.component;

  // Check if current step is valid
  const isCurrentStepValid = validateStep(state.currentStep, state);

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
                Please Click complete all required fields
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
              className={ ` p-5 rounded-md flex items-center justify-center text-sm font-medium ${
                index <= state.currentStep
                  ? "bg-[#0694a2] text-white"
                  : "bg-[#c0c3c1] text-[#68706a]"
              }`}
            >
              <p className='text-xl font-bold'>
                Fill-Up The Forms, It is Required To Get Access To The Course.
              </p>
            </div>
            
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
        {state.currentStep !== 2 && (
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
