// "use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import { useBooking } from "../booking-context";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import StandardsForm from "../../form/StandardsForm";
// import PadiLiabilityForm from "../../form/PadiLiabilityForm";
// import DiversActivityForm from "../../form/DiversActivityForm";
// import PadiQuickReview from "../../QuickReview/QuickReview";
// import { toast } from "sonner";
// import { DiverMedicalForm } from "@/components/forms/diver-medical-form";
// import EnrichedAirForm from "../../form/EnrichedTrainning";
// import PadiForm from "../../form/Equipment";

// export function DocumentUploadStep() {
//   const { state, dispatch } = useBooking();

//   const [openModal, setOpenModal] = React.useState<
//     | "modal1"
//     | "modal2"
//     | "modal3"
//     | "modal4"
//     | "modal5"
//     | "modal6"
//     | "modal7"
//     | null
//   >(null);

//   const closeModal = () => setOpenModal(null);

//   const modalConfigs = [
//     {
//       id: "modal1",
//       title: "Standards Form",
//       content: <StandardsForm />,
//     },
//     {
//       id: "modal2",
//       title: "Continue Education Form",
//       content: <PadiLiabilityForm />,
//       showSubmit: true,
//     },
//     {
//       id: "modal3",
//       title: "Divers Activity Form",
//       content: <DiversActivityForm />,
//     },
//     {
//       id: "modal4",
//       title: "Quick Review Form",
//       content: <PadiQuickReview />,
//     },
//     {
//       id: "modal5",
//       title: "Divers Medical Form",
//       content: <DiverMedicalForm />,
//     },
//     {
//       id: "modal6",
//       title: "Divers Medical Form",
//       content: <EnrichedAirForm />,
//     },
//     {
//       id: "modal7",
//       title: "Divers Medical Form",
//       content: <PadiForm />,
//     },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">
//         Document Fill Up
//       </h2>

//       <p className="text-[#6c757d] mb-6">
//         Upload any medical certificates, doctor&apos;s notes, or other relevant
//         documents. Accepted formats: PDF, JPG, PNG. Maximum file size: 10MB per
//         file.
//       </p>

//       <div className="flex gap-4 mb-6 flex-wrap">
//         <Button
//           onClick={() => setOpenModal("modal1")}
//           className="bg-blue-500 hover:bg-blue-600 text-white"
//         >
//           Standards Form
//         </Button>

//         <Button
//           onClick={() => setOpenModal("modal2")}
//           className="bg-green-500 hover:bg-green-600 text-white"
//         >
//           Continuing Education
//         </Button>

//         <Button
//           onClick={() => setOpenModal("modal3")}
//           className="bg-green-500 hover:bg-green-600 text-white"
//         >
//           Divers Activity
//         </Button>

//         <Button
//           onClick={() => setOpenModal("modal4")}
//           className="bg-green-500 hover:bg-green-600 text-white"
//         >
//           Quick Review
//         </Button>

//         <Button
//           onClick={() => setOpenModal("modal5")}
//           className="bg-green-500 hover:bg-green-600 text-white"
//         >
//           Divers Medical
//         </Button>

//         <Button
//           onClick={() => setOpenModal("modal6")}
//           className="bg-green-500 hover:bg-green-600 text-white"
//         >
//           Enriched Training
//         </Button>

//         <Button
//           onClick={() => setOpenModal("modal7")}
//           className="bg-green-500 hover:bg-green-600 text-white"
//         >
//           Equipment Rental
//         </Button>
//       </div>

//       {/* Render all dialogs from modalConfigs */}
//       {modalConfigs.map(({ id, title, content, showSubmit }) => (
//         <Dialog
//           key={id}
//           open={openModal === id}
//           onOpenChange={(open) => !open && closeModal()}
//         >
//           <DialogContent className="max-w-7xl">
//             <DialogTitle>{title}</DialogTitle>

//             <div className="max-h-[80vh] max-w-7xl w-full overflow-y-auto pr-2">
//               {content}
//             </div>

//             {/* <DialogFooter className="flex gap-2">
//               <Button
//                 onClick={closeModal}
//                 className="bg-red-500 hover:bg-red-600 text-white"
//               >
//                 Close
//               </Button>
//               {showSubmit && (
//                 <Button
//                   onClick={() => {
//                     toast.success("Form submitted successfully! ✅");
//                     closeModal();
//                   }}
//                   className="bg-green-500 hover:bg-green-600 text-white"
//                 >
//                   Submit
//                 </Button>
//               )}
//             </DialogFooter> */}
//           </DialogContent>
//         </Dialog>
//       ))}
//     </div>
//   );
// }



"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "../booking-context";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import StandardsForm from "../../form/StandardsForm";
import PadiLiabilityForm from "../../form/PadiLiabilityForm";
import DiversActivityForm from "../../form/DiversActivityForm";
import PadiQuickReview from "../../QuickReview/QuickReview";
import { DiverMedicalForm } from "@/components/forms/diver-medical-form";
import EnrichedAirForm from "../../form/EnrichedTrainning";
import PadiForm from "../../form/Equipment";
import { FileText, CheckCircle2 } from "lucide-react";

export function DocumentUploadStep() {
  const { state, dispatch } = useBooking();

  const [openModal, setOpenModal] = React.useState<
    | "modal1"
    | "modal2"
    | "modal3"
    | "modal4"
    | "modal5"
    | "modal6"
    | "modal7"
    | null
  >(null);

  const closeModal = () => setOpenModal(null);

  const modalConfigs = [
    {
      id: "modal1",
      title: "Standards Form",
      content: <StandardsForm />,
    },
    {
      id: "modal2",
      title: "Continue Education Form",
      content: <PadiLiabilityForm />,
    },
    {
      id: "modal3",
      title: "Divers Activity Form",
      content: <DiversActivityForm />,
    },
    {
      id: "modal4",
      title: "Quick Review Form",
      content: <PadiQuickReview />,
    },
    {
      id: "modal5",
      title: "Divers Medical Form",
      content: <DiverMedicalForm />,
    },
    {
      id: "modal6",
      title: "Enriched Training Form",
      content: <EnrichedAirForm />,
    },
    {
      id: "modal7",
      title: "Equipment Rental Form",
      content: <PadiForm />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">
        Document Fill Up
      </h2>

      <p className="text-[#6c757d] mb-6">
        Fill out the required forms below. Each form will be converted to PDF and added to your booking.
      </p>

      {/* Document Status Display */}
      {state.documents?.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">
              Documents Added ({state.documents.length})
            </h3>
          </div>
          <ul className="space-y-2">
            {state.documents.map((doc, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-green-700"
              >
                <FileText className="w-4 h-4" />
                <span>{doc.name}</span>
                {doc.size && (
                  <span className="text-xs text-green-600">
                    ({(doc.size / 1024).toFixed(1)} KB)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4 mb-6 flex-wrap">
        <Button
          onClick={() => setOpenModal("modal1")}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Standards Form
        </Button>

        <Button
          onClick={() => setOpenModal("modal2")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Continuing Education
        </Button>

        <Button
          onClick={() => setOpenModal("modal3")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Divers Activity
        </Button>

        <Button
          onClick={() => setOpenModal("modal4")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Quick Review
        </Button>

        <Button
          onClick={() => setOpenModal("modal5")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Divers Medical
        </Button>

        <Button
          onClick={() => setOpenModal("modal6")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Enriched Training
        </Button>

        <Button
          onClick={() => setOpenModal("modal7")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Equipment Rental
        </Button>
      </div>

      {/* Render all dialogs from modalConfigs */}
      {modalConfigs.map(({ id, title, content }) => (
        <Dialog
          key={id}
          open={openModal === id}
          onOpenChange={(open) => !open && closeModal()}
        >
          <DialogContent className="max-w-7xl">
            <DialogTitle>{title}</DialogTitle>

            <div className="max-h-[80vh] max-w-7xl w-full overflow-y-auto pr-2">
              {content}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
