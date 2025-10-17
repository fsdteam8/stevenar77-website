// "use client";
// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation"; // To get bookingId from URL
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useBooking, type BookingState } from "./booking-context";
// import { DocumentUploadStep } from "./steps/document-upload-step";
// import { updateCourseFormBooking } from "@/lib/courseformbookingupdate";

// type FormConfig = {
//   id: string;
//   label: string;
// };

// const steps = [
//   {
//     id: 0,
//     title: "Medical Certifications & Document",
//     component: DocumentUploadStep,
//   },
// ];

// const validateStepWithErrors = (stepIndex: number, state: BookingState) => {
//   const errors: string[] = [];
//   if (stepIndex === 0) {
//     const formConfigs: FormConfig[] = [
//       { id: "modal1", label: "Standards Form" },
//       { id: "modal2", label: "Continuing Education" },
//       { id: "modal3", label: "Divers Activity" },
//       { id: "modal4", label: "Quick Review-Open Waters" },
//       { id: "modal5", label: "Divers Medical" },
//       { id: "modal6", label: "Enriched Training" },
//       { id: "modal7", label: "Equipment Rental" },
//       { id: "modal8", label: "Rescue Diver Quick Review" },
//       { id: "modal9", label: "Enriched Air Quick Review" },
//     ];
//     const visibleForms = formConfigs.filter((f) =>
//       state.course.formTitle?.some((title) =>
//         f.label.toLowerCase().includes(title.toLowerCase()),
//       ),
//     );
//     const allFormsCompleted = visibleForms.every((f) =>
//       state.submittedForms.includes(f.id),
//     );
//     if (!allFormsCompleted)
//       errors.push("Please complete all required forms before continuing.");
//   }
//   return { isValid: errors.length === 0, errors };
// };

// const validateStep = (stepIndex: number, state: BookingState) =>
//   validateStepWithErrors(stepIndex, state).isValid;

// export function FormFillup() {
//   const { state } = useBooking();
//   const [validationErrors, setValidationErrors] = useState<string[]>([]);
//   const [showValidation, setShowValidation] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const searchParams = useSearchParams();
//   const bookingId = searchParams.get("bookingId"); // get from URL

//   const currentStepData = steps[state.currentStep];
//   const CurrentStepComponent = currentStepData?.component;

//   const isCurrentStepValid = validateStep(state.currentStep, state);

//   const handleSubmit = async () => {
//     if (!bookingId) {
//       alert("Booking ID not found in URL");
//       return;
//     }

//     // Trigger validation in child components
//     window.dispatchEvent(new Event("trigger-validation"));

//     setTimeout(async () => {
//       const validation = validateStepWithErrors(state.currentStep, state);
//       if (!validation.isValid) {
//         setValidationErrors(validation.errors);
//         setShowValidation(true);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         return;
//       }

//       setValidationErrors([]);
//       setShowValidation(false);
//       setSubmitting(true);

//       try {
//         const response = await updateCourseFormBooking(bookingId, {
//           submittedForms: state.submittedForms,
//           medicalDocuments: state.documents, // send any other data you want
//           course: state.course,
//           participant: state.participants,
//         });

//         console.log("✅ API Response:", response);
//         // alert(response.message || "Booking updated successfully");
//       } catch (err) {
//         alert("Failed to submit form. Check console for details.");
//       } finally {
//         setSubmitting(false);
//       }
//     }, 50);
//   };

//   return (
//     <Card className="p-6 mt-6">
//       {showValidation && validationErrors.length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <ul className="list-disc list-inside text-red-700">
//             {validationErrors.map((err, i) => (
//               <li key={i}>{err}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Info Message */}
//       <div className="flex items-center justify-center mb-8">
//         <div className="text-2xl font-semibold text-center p-5">
//           <p className="text-primary">
//             Thank you for Your Payment! You&apos;re now officially choosing
//             DiveInScuba. Please complete the forms below to finalize your
//             booking.
//           </p>
//         </div>
//       </div>

//       {CurrentStepComponent && <CurrentStepComponent />}

//       <div className="flex justify-end mt-8">
//         <Button
//           onClick={handleSubmit}
//           disabled={!isCurrentStepValid || submitting}
//           className="px-8 py-2 bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {submitting ? "Submitting..." : "Submit"}
//         </Button>
//       </div>
//     </Card>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useSearchParams } from "next/navigation";
// import { type BookingState, useBooking } from "./booking-context";
// import { DocumentUploadStep } from "./steps/document-upload-step";
// import { updateCourseFormBooking } from "@/lib/courseformbookingupdate";

// type FormConfig = {
//   label: string;
// };

// const steps = [
//   {
//     id: 0,
//     title: "Medical Certifications & Document",
//     component: DocumentUploadStep,
//   },
// ];

// // const validateStepWithErrors = (stepIndex: number, state: BookingState) => {
// //   const errors: string[] = [];
// //   if (stepIndex === 0) {
// //     const formConfigs: FormConfig[] = [
// //       { label: "Standards Form" },
// //       { label: "Continuing Education" },
// //       { label: "Divers Activity" },
// //       { label: "Quick Review-Open Waters" },
// //       { label: "Divers Medical" },
// //       { label: "Enriched Training" },
// //       { label: "Equipment Rental" },
// //       { label: "Rescue Diver Quick Review" },
// //       { label: "Enriched Air Quick Review" },
// //     ];

// //     // Filter only forms required by this course
// //     const visibleForms = formConfigs.filter((f) =>
// //       state.course.formTitle?.some((title) =>
// //         f.label.toLowerCase().includes(title.toLowerCase())
// //       )
// //     );

// //     // ✅ Check if all required PDF forms are uploaded
// //     const allFormsCompleted = visibleForms.every((f) =>
// //       state.documents.some(doc => doc.label === f.label)
// //     );

// //     if (!allFormsCompleted)
// //       errors.push("Please complete all required forms before continuing.");
// //   }

// //   return { isValid: errors.length === 0, errors };
// // };
// const validateStepWithErrors = (stepIndex: number, state: BookingState) => {
//   const errors: string[] = [];

//   if (stepIndex === 0) {
//     const formConfigs: FormConfig[] = [
//       { label: "Standards Form" },
//       { label: "Continuing Education" },
//       { label: "Divers Activity" },
//       { label: "Quick Review-Open Waters" },
//       { label: "Divers Medical" },
//       { label: "Enriched Training" },
//       { label: "Equipment Rental" },
//       { label: "Rescue Diver Quick Review" },
//       { label: "Enriched Air Quick Review" },
//     ];

//     // Only required forms for this course
//     const requiredForms = formConfigs.filter((f) =>
//       state.course.formTitle?.some((title) =>
//         f.label.toLowerCase().trim() === title.toLowerCase().trim()
//       )
//     );

//     // Check if all required PDFs are uploaded
//     const missingForms = requiredForms.filter(
//       (f) =>
//         !state.documents.some(
//           (doc) => doc.label.toLowerCase().trim() === f.label.toLowerCase().trim()
//         )
//     );

//     if (missingForms.length > 0) {
//       errors.push(
//         `Please upload all required forms: ${missingForms.map(f => f.label).join(", ")}`
//       );
//     }
//   }

//   return { isValid: errors.length === 0, errors };
// };

// const validateStep = (stepIndex: number, state: BookingState) =>
//   validateStepWithErrors(stepIndex, state).isValid;

// export function FormFillup() {
//   const { state } = useBooking();
//   const [validationErrors, setValidationErrors] = useState<string[]>([]);
//   const [showValidation, setShowValidation] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [canSubmit, setCanSubmit] = useState(false);

//   const searchParams = useSearchParams();
//   const bookingId = searchParams.get("bookingId"); // get from URL

//   const currentStepData = steps[state.currentStep];
//   const CurrentStepComponent = currentStepData?.component;

//   // ✅ Automatically check if submit should be enabled
//   // useEffect(() => {
//   //   const isValid = validateStep(state.currentStep, state);
//   //   setCanSubmit(isValid);
//   // }, [
//   //   JSON.stringify(state.documents),
//   //   state.currentStep,
//   //   JSON.stringify(state.course.formTitle),
//   // ]);

//   useEffect(() => {
//   const validation = validateStepWithErrors(state.currentStep, state);
//   setCanSubmit(validation.isValid);
// }, [JSON.stringify(state.documents), state.currentStep, JSON.stringify(state.course.formTitle)]);

//   const handleSubmit = async () => {
//     if (!bookingId) {
//       alert("Booking ID not found in URL");
//       return;
//     }

//     // Trigger validation in child modals
//     window.dispatchEvent(new Event("trigger-validation"));

//     setTimeout(async () => {
//       const validation = validateStepWithErrors(state.currentStep, state);
//       if (!validation.isValid) {
//         setValidationErrors(validation.errors);
//         setShowValidation(true);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         return;
//       }

//       setValidationErrors([]);
//       setShowValidation(false);
//       setSubmitting(true);

//       try {
//         console.log("🧾 Uploaded forms in state:", state.documents);

//         // ✅ Send PDF forms as FormData
//         const formData = new FormData();
//         state.documents.forEach(doc => {
//           formData.append("medicalDocuments", doc.file); // doc.file contains the File object
//         });
//         formData.append(
//           "submittedForms",
//           JSON.stringify(state.documents.map(d => d.label))
//         );
//         formData.append("participant", state.participants.toString());

//         const response = await updateCourseFormBooking(bookingId, formData);
//         console.log("✅ API Response:", response);
//         alert(response.message || "Booking updated successfully");
//       } catch (err) {
//         console.error(err);
//         alert("Failed to submit form. Check console for details.");
//       } finally {
//         setSubmitting(false);
//       }
//     }, 50);
//   };

//   return (
//     <Card className="p-6 mt-6">
//       {showValidation && validationErrors.length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <ul className="list-disc list-inside text-red-700">
//             {validationErrors.map((err, i) => (
//               <li key={i}>{err}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="flex items-center justify-center mb-8">
//         <div className="text-2xl font-semibold text-center p-5">
//           <p className="text-primary">
//             Thank you for Your Payment! Please complete the forms below to finalize your booking.
//           </p>
//         </div>
//       </div>

//       {/* Modal step */}
//       {CurrentStepComponent && <CurrentStepComponent />}

//       <div className="flex justify-end mt-8">
//         <Button
//           onClick={handleSubmit}
//           disabled={!canSubmit || submitting}
//           className="px-8 py-2 bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {submitting ? "Submitting..." : "Submit"}
//         </Button>
//       </div>
//     </Card>
//   );
// }

















// "use client";
// import React, { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { type BookingState, useBooking } from "./booking-context";
// import { DocumentUploadStep } from "./steps/document-upload-step";

// type FormConfig = {
//   id: string;
//   label: string;
// };

// const steps = [
//   {
//     id: 0,
//     title: "Medical Certifications & Document",
//     component: DocumentUploadStep,
//   },
// ];

// const validateStepWithErrors = (
//   stepIndex: number,
//   state: BookingState,
// ): { isValid: boolean; errors: string[] } => {
//   const errors: string[] = [];

//   switch (stepIndex) {
//     case 0:
//       const formConfigs: FormConfig[] = [
//         { id: "modal1", label: "Standards Form" },
//         { id: "modal2", label: "Continuing Education" },
//         { id: "modal3", label: "Divers Activity" },
//         { id: "modal4", label: "Quick Review-Open Waters" },
//         { id: "modal5", label: "Divers Medical" },
//         { id: "modal6", label: "Enriched Training" },
//         { id: "modal7", label: "Equipment Rental" },
//         { id: "modal8", label: "Rescue Diver Quick Review" },
//         { id: "modal9", label: "Enriched Air Quick Review" },
//       ];

//       // Filter forms relevant to current course
//       // const visibleForms = formConfigs.filter((f) =>
//       //   state.course.formTitle?.some((title) =>
//       //     f.label.toLowerCase().includes(title.toLowerCase())
//       //   )
//       // );
//       const visibleForms = formConfigs.filter((f) =>
//         state.course.formTitle?.some(
//           (title) => f.label.toLowerCase() === title.toLowerCase(),
//         ),
//       );

//       // ✅ Check if all required PDF forms are completed
//       const allFormsCompleted = visibleForms.every((f) =>
//         state.submittedForms.includes(f.id),
//       );

//       if (!allFormsCompleted) {
//         errors.push("Please complete all required forms before continuing.");
//       }
//       break;

//     default:
//       errors.push("Invalid step");
//   }

//   return {
//     isValid: errors.length === 0,
//     errors,
//   };
// };

// const validateStep = (stepIndex: number, state: BookingState): boolean => {
//   return validateStepWithErrors(stepIndex, state).isValid;
// };

// export function FormFillup() {
//   const { state } = useBooking();
//   const [validationErrors, setValidationErrors] = useState<string[]>([]);
//   const [showValidation, setShowValidation] = useState(false);

//   const currentStepData = steps[state.currentStep];
//   const CurrentStepComponent = currentStepData?.component;

//   const isCurrentStepValid = validateStep(state.currentStep, state);

//   const handleSubmit = () => {
//     window.dispatchEvent(new Event("trigger-validation"));

//     setTimeout(() => {
//       const validation = validateStepWithErrors(state.currentStep, state);

//       if (!validation.isValid) {
//         setValidationErrors(validation.errors);
//         setShowValidation(true);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         return;
//       }

//       // ✅ If all forms are completed, show the full form data
//       setValidationErrors([]);
//       setShowValidation(false);

//       console.log("✅ FORM SUBMITTED SUCCESSFULLY!");
//       console.log("📦 Full Booking State:", state);

//       // Example: If you want only submitted forms data
//       console.log("🧾 Submitted Forms:", state.submittedForms);

//       // Optional: send to backend
//       // fetch("/api/submit", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify(state),
//       // });
//     }, 50);
//   };

//   return (
//     <Card className="p-6 mt-6">
//       {/* Validation Error Alert */}
//       {showValidation && validationErrors.length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-start">
//             <div className="flex-shrink-0">
//               <svg
//                 className="h-5 w-5 text-red-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div className="ml-3 flex-1">
//               <h3 className="text-sm font-medium text-red-800">
//                 Please complete all required forms
//               </h3>
//               <div className="mt-2 text-sm text-red-700">
//                 <ul className="list-disc list-inside space-y-1">
//                   {validationErrors.map((error, index) => (
//                     <li key={index}>{error}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Info Message */}
//       <div className="flex items-center justify-center mb-8">
//         <div className="text-2xl font-semibold text-center p-5">
//           <p className="text-primary">
//             Thank you for Your Payment! You&apos;re now officially choosing
//             DiveInScuba. Please complete the forms below to finalize your
//             booking.
//           </p>
//         </div>
//       </div>

//       {/* Step Content */}
//       {CurrentStepComponent && <CurrentStepComponent />}

//       {/* Submit Button */}
//       <div className="flex justify-end mt-8">
//         <Button
//           onClick={handleSubmit}
//           disabled={!isCurrentStepValid}
//           className="px-8 py-2 bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Submit
//         </Button>
//       </div>
//     </Card>
//   );
// }


















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
        <div className="text-2xl font-semibold text-center p-5">
          <p className="text-primary">
            Thank you for Your Payment! Please complete the forms below to finalize your booking.
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
