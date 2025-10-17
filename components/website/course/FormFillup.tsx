"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { type BookingState, useBooking } from "./booking-context";
import { DocumentUploadStep } from "./steps/document-upload-step";
import { updateCourseFormBooking } from "@/lib/courseformbookingupdate";

type FormConfig = { label: string };

const steps = [
  {
    id: 0,
    title: "Medical Certifications & Document",
    component: DocumentUploadStep,
  },
];

// ✅ Validation function that checks required PDFs
const validateStepWithErrors = (stepIndex: number, state: BookingState) => {
  const errors: string[] = [];

  if (stepIndex === 0) {
    const formConfigs: FormConfig[] = [
      { label: "Standards Form" },
      { label: "Continuing Education" },
      { label: "Divers Activity" },
      { label: "Quick Review-Open Waters" },
      { label: "Divers Medical" },
      { label: "Enriched Training" },
      { label: "Equipment Rental" },
      { label: "Rescue Diver Quick Review" },
      { label: "Enriched Air Quick Review" },
    ];

    // Required forms for this course
    const requiredForms = formConfigs.filter((f) =>
      state.course.formTitle?.some(
        (title) => f.label.toLowerCase().trim() === title.toLowerCase().trim()
      )
    );

    // Find missing PDFs
    const missingForms = requiredForms.filter(
      (f) =>
        !state.documents.some(
          (doc) => doc.label.toLowerCase().trim() === f.label.toLowerCase().trim()
        )
    );

    if (missingForms.length > 0) {
      errors.push(
        `Please upload all required forms: ${missingForms
          .map((f) => f.label)
          .join(", ")}`
      );
    }
  }

  return { isValid: errors.length === 0, errors };
};

// Simple boolean for enabling submit
const validateStep = (stepIndex: number, state: BookingState) =>
  validateStepWithErrors(stepIndex, state).isValid;

export function FormFillup() {
  const { state } = useBooking();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId"); // get bookingId from URL

  const currentStepData = steps[state.currentStep];
  const CurrentStepComponent = currentStepData?.component;

  // ✅ Enable submit button automatically when all required PDFs uploaded
  useEffect(() => {
    const validation = validateStepWithErrors(state.currentStep, state);
    setCanSubmit(validation.isValid);
  }, [
    JSON.stringify(state.documents),
    state.currentStep,
    JSON.stringify(state.course.formTitle),
  ]);

  const handleSubmit = async () => {
    if (!bookingId) {
      alert("Booking ID not found in URL");
      return;
    }

    // Trigger validation in child modals
    window.dispatchEvent(new Event("trigger-validation"));

    setTimeout(async () => {
      const validation = validateStepWithErrors(state.currentStep, state);

      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setShowValidation(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setValidationErrors([]);
      setShowValidation(false);
      setSubmitting(true);

      try {
        console.log("🧾 Uploaded forms in state:", state.documents);

        // ✅ Send PDFs as FormData
        const formData = new FormData();
        state.documents.forEach((doc) => {
          formData.append("medicalDocuments", doc.file); // doc.file is the File object
        });
        formData.append(
          "submittedForms",
          JSON.stringify(state.documents.map((d) => d.label))
        );
        formData.append("participant", state.participants.toString());

        const response = await updateCourseFormBooking(bookingId, formData);
        console.log("✅ API Response:", response);
        alert(response.message || "Booking updated successfully");
      } catch (err) {
        console.error(err);
        alert("Failed to submit form. Check console for details.");
      } finally {
        setSubmitting(false);
      }
    }, 50);
  };

  return (
    <Card className="p-6 mt-6">
      {/* Show validation errors */}
      {showValidation && validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <ul className="list-disc list-inside text-red-700">
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-center mb-8">
        <div className="text-2xl max-w-2xl font-semibold text-center p-5">
          <p className="text-gray-600 ">
            <span className="text-primary">Thank you for Your Payment!</span> You&apos;r Officially On Your Way To <span className="text-primary">Scuba Life Adventure</span>.
          </p>
        </div>
      </div>

      {/* Modal step */}
      {CurrentStepComponent && <CurrentStepComponent />}

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="px-8 py-2 bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </Card>
  );
}
