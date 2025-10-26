"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { type BookingState, useBooking } from "./booking-context";
import { DocumentUploadStep } from "./steps/document-upload-step";
import { updateCourseFormBooking } from "@/lib/courseformbookingupdate";
import { ArrowDownToDot, ChevronDown, MoveRight } from "lucide-react";

type FormConfig = { label: string };

const steps = [
  {
    id: 0,
    title: "Medical Certifications & Document",
    component: DocumentUploadStep,
  },
];

// ✅ Validation function
const validateStepWithErrors = (stepIndex: number, state: BookingState) => {
  const errors: string[] = [];

  if (stepIndex === 0) {
    const formConfigs: FormConfig[] = [
      { label: "Standards Form" },
      { label: "Continuing Education" },
      { label: "Divers Activity" },
      { label: "Quick Review" },
      { label: "Divers Medical" },
      { label: "Enriched Training" },
      { label: "Equipment Rental" },
      // { label: "Enriched Air -Quick Review" },
      // { label: "Resque Diver-Quick Review" },
    ];

    const requiredForms = formConfigs.filter((f) =>
      state.course.formTitle?.some(
        (title) => f.label.toLowerCase().trim() === title.toLowerCase().trim(),
      ),
    );

    const missingForms = requiredForms.filter(
      (f) =>
        !state.documents.some(
          (doc) =>
            doc.label.toLowerCase().trim() === f.label.toLowerCase().trim(),
        ),
    );

    if (missingForms.length > 0) {
      errors.push(
        `Please upload all required forms: ${missingForms
          .map((f) => f.label)
          .join(", ")}`,
      );
    }
  }

  return { isValid: errors.length === 0, errors };
};

export function FormFillup() {
  const { state } = useBooking();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const currentStepData = steps[state.currentStep];
  const CurrentStepComponent = currentStepData?.component;

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
        const formData = new FormData();
        state.documents.forEach((doc) =>
          formData.append("medicalDocuments", doc.file),
        );
        formData.append(
          "submittedForms",
          JSON.stringify(state.documents.map((d) => d.label)),
        );
        formData.append("participant", state.participants.toString());

        await updateCourseFormBooking(bookingId, formData);

        setShowThankYouModal(true);
      } catch (err) {
        console.error(err);
        alert("Failed to submit form. Check console for details.");
      } finally {
        setSubmitting(false);
      }
    }, 50);
  };

  const closeModal = () => setShowThankYouModal(false);
  const goHome = () => (window.location.href = "/");

  return (
    <Card className="p-3 mt-2">
      {/* Validation Errors */}
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
        {/* <div className="text-2xl max-w-2xl font-semibold text-center p-5">
          <p className="text-gray-600">
            <span className="text-primary">Thank you for Your Payment!</span>{" "}
            You&apos;re officially on your way to{" "}
            <span className="text-primary">Scuba Life Adventure</span>.
          </p>
        </div> */}
      </div>

      {CurrentStepComponent && <CurrentStepComponent />}

      <div className="flex flex-col items-center mt-4">
        {/* Arrow + Text above the button */}
        {canSubmit && !submitting && (
          <div className="mb-2 flex flex-col items-center text-[#0694a2] animate-bounce">
            <span className="mt-1 mb-4 text-lg font-medium">
              Press The Submit Button
            </span>
            {/* <ChevronDown  /> */}
            <ArrowDownToDot size={35} />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="px-8 py-2 bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </div>

      {/* ✅ Dismissable Thank You Modal */}
      {showThankYouModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg max-w-md text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              You’re all set — your documents are complete and you’re officially
              enrolled!
            </h2>
            <p className="font-semibold text-xl mb-4">
              Keep an eye out for an email from Scuba Life with your class
              details. If it doesn’t arrive soon, please check your spam folder
              just in case.
            </p>
            <p className="mb-6">
              As always, feel free to reach out with any questions — we’re here
              to help every step of the way.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={goHome}
                className="bg-primary text-white px-6 py-2"
              >
                back to home
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
