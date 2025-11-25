// "use client";
// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import { useBooking } from "../booking-context";
// import {
//   Dialog,
//   DialogContent,
//   // DialogFooter,
//   DialogTitle,
// } from "@/components/ui/dialog";
// // import PadiQuickReview from "../../QuickReview/QuickReview";
// import { toast } from "sonner";
// import StandardsForm from "../../form/StandardsForm";
// import PadiLiabilityForm from "../../form/PadiLiabilityForm";
// import DiversActivityForm from "../../form/DiversActivityForm";
// import PadiForm from "../../form/Equipment";
// import ResqueDiverQuickReview from "../../form/ResqueDiverQuickReview";
// import QuickReview from "../../form/QuickReview";
// import PadiQuickReview from "../../QuickReview/QuickReview";
// import DiverMedicalForm from "@/components/forms/diver-medical-form";
// import EnrichedAirForm from "../../form/EnrichedTrainning";

// type ModalId =
//   | "modal1"
//   | "modal2"
//   | "modal3"
//   | "modal4"
//   | "modal5"
//   | "modal6"
//   | "modal7"
//   | "modal8"
//   | "modal9";

// export interface FormConfig {
//   id: ModalId;
//   label: string;
//   color: string;
//   component: React.ReactNode;
// }

// export function DocumentUploadStep() {
//   const { state, dispatch } = useBooking();
//   const [submittedForms, setSubmittedForms] = React.useState<ModalId[]>([]);
//   const [openModal, setOpenModal] = React.useState<ModalId | null>(null);

//   const handleFormSubmit = (formId: ModalId) => {
//     toast.success("Form submitted successfully! ✅");
//     setOpenModal(null);
//     setSubmittedForms((prev) => [...prev, formId]); // Add formId to submittedForms
//     dispatch({ type: "MARK_FORM_SUBMITTED", payload: formId });
//   };

//   // All form configs
//   const formConfigs: FormConfig[] = [
//     {
//       id: "modal1",
//       label: "Standards Form",
//       color: "green",
//       component: (
//         <StandardsForm onSubmitSuccess={() => handleFormSubmit("modal1")} />
//       ),
//     },
//     {
//       id: "modal2",
//       label: "Continuing Education",
//       color: "green",
//       component: (
//         <PadiLiabilityForm onSubmitSuccess={() => handleFormSubmit("modal2")} />
//       ),
//     },
//     {
//       id: "modal3",
//       label: "Divers Activity",
//       color: "green",
//       component: (
//         <DiversActivityForm
//           onSubmitSuccess={() => handleFormSubmit("modal3")}
//         />
//       ),
//     },
//     {
//       id: "modal4",
//       label: "Quick Review",
//       color: "green",
//       component: (
//         <PadiQuickReview onSubmitSuccess={() => handleFormSubmit("modal4")} />
//       ),
//     },
//     {
//       id: "modal5",
//       label: "Divers Medical",
//       color: "green",
//       component: (
//         <DiverMedicalForm onSubmitSuccess={() => handleFormSubmit("modal5")} />
//       ),
//     },
//     {
//       id: "modal6",
//       label: "Enriched Training",
//       color: "green",
//       component: (
//         <EnrichedAirForm onSubmitSuccess={() => handleFormSubmit("modal6")} />
//       ),
//     },
//     {
//       id: "modal7",
//       label: "Equipment Rental",
//       color: "green",
//       component: (
//         <PadiForm onSubmitSuccess={() => handleFormSubmit("modal7")} />
//       ),
//     },
//     // {
//     //   id: "modal8",
//     //   label: "Resque Diver-Quick Review",
//     //   color: "green",
//     //   component: (
//     //     <ResqueDiverQuickReview
//     //       onSubmitSuccess={() => handleFormSubmit("modal8")}
//     //     />
//     //   ),
//     // },
//     // {
//     //   id: "modal9",
//     //   label: "Enriched Air -Quick Review",
//     //   color: "green",
//     //   component: (
//     //     <QuickReview onSubmitSuccess={() => handleFormSubmit("modal9")} />
//     //   ),
//     // },
//   ];

//   // Only show forms relevant to current course
//   const visibleForms = formConfigs.filter((f) =>
//     state.course.formTitle?.some((title) =>
//       f.label.toLowerCase().includes(title.toLowerCase()),
//     ),
//   );

//   // ✅ Check if all visible forms are completed
//   const allVisibleFormsCompleted = visibleForms.every((f) =>
//     submittedForms.includes(f.id),
//   );

//   // const handleNext = () => {
//   //   dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
//   // };

//   return (
//     <div className="">
//       {/* <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">
//         Please Fill-Up The Following Papers.
//       </h2> */}
//       <div className="flex gap-4 mb-6 justify-center flex-wrap">
//         <p className="text-[#6c757d] text-center text-xl px-3 max-w-xl mb-6">
//           {" "}
//           Please complete all required documents below to lock in your spot and
//           get ready to dive in!
//         </p>
//       </div>

//       {/* ✅ Render Form Buttons */}
//       <div className="flex gap-4 mb-6 justify-center flex-wrap">
//         {visibleForms.map((btn) => (
//           <Button
//             key={btn.id}
//             onClick={() => setOpenModal(btn.id)} // This opens the modal for the respective form
//             disabled={submittedForms.includes(btn.id)} // Disable if form is already submitted
//             // className={`bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50 hover:zoom-in-5 disabled:cursor-not-allowed`}
//             className={`bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50 hover:scale-105 transition-transform duration-300 disabled:cursor-not-allowed`}
//           >
//             {btn.label}
//           </Button>
//         ))}
//       </div>

//       {/* Render Only Open Modal */}
//       {openModal && (
//         <Dialog open onOpenChange={(open) => !open && setOpenModal(null)}>
//           <DialogContent className="max-w-7xl">
//             <DialogTitle>
//               {formConfigs.find((f) => f.id === openModal)?.label}
//             </DialogTitle>
//             <div className="max-h-[80vh] max-w-7xl w-full overflow-y-auto pr-2">
//               {formConfigs.find((f) => f.id === openModal)?.component}
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}

//       {/* ✅ Single Next Button */}
//       {/* <div className="mt-6 flex justify-end">
//         <Button
//           onClick={handleNext}
//           disabled={!allVisibleFormsCompleted}
//           className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//         </Button>
//       </div> */}

//       {/* {!allVisibleFormsCompleted && (
//         <p className="text-sm text-gray-500 mt-2">
//           Fill out all the forms to proceed to Submit.
//         </p>
//       )} */}
//     </div>
//   );
// }
