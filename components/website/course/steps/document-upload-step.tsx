"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "../booking-context";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import StandardsForm from "../../form/StandardsForm";
import PadiLiabilityForm from "../../form/PadiLiabilityForm";
import DiversActivityForm from "../../form/DiversActivityForm";
import PadiQuickReview from "../../QuickReview/QuickReview";
import { toast } from "sonner";
import { DiverMedicalForm } from "@/components/forms/diver-medical-form";
import EnrichedAirForm from "../../form/EnrichedTrainning";
import PadiForm from "../../form/Equipment";

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
      showSubmit: true,
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
      title: "Divers Medical Form",
      content: <EnrichedAirForm />,
    },
    {
      id: "modal7",
      title: "Divers Medical Form",
      content: <PadiForm />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">
        Document Fill Up
      </h2>

      <p className="text-[#6c757d] mb-6">
        Upload any medical certificates, doctor&apos;s notes, or other relevant
        documents. Accepted formats: PDF, JPG, PNG. Maximum file size: 10MB per
        file.
      </p>

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
      {modalConfigs.map(({ id, title, content, showSubmit }) => (
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

            {/* <DialogFooter className="flex gap-2">
              <Button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Close
              </Button>
              {showSubmit && (
                <Button
                  onClick={() => {
                    toast.success("Form submitted successfully! ✅");
                    closeModal();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Submit
                </Button>
              )}
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}




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
// import { DiverMedicalForm } from "@/components/forms/diver-medical-form";
// import EnrichedAirForm from "../../form/EnrichedTrainning";
// import PadiForm from "../../form/Equipment";
// import { toast, Toaster } from "sonner";

// export function DocumentUploadStep() {
//   const { state, dispatch } = useBooking();
//   const [openModal, setOpenModal] = React.useState<
//     "modal1" | "modal2" | "modal3" | "modal4" | "modal5" | "modal6" | "modal7" | null
//   >(null);

//   // Store selected files for the current modal
//   const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

//   const closeModal = () => {
//     setOpenModal(null);
//     setSelectedFiles([]);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedFiles(Array.from(e.target.files));
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFiles.length) {
//       toast.error("Please select at least one file.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       selectedFiles.forEach((file) => formData.append("documents", file));

//       const res = await fetch("/api/upload-documents", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");

//       const data = await res.json();
//       dispatch({ type: "SET_DOCUMENTS", payload: data.files });

//       toast.success("Documents uploaded successfully ✅");
//       closeModal();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to upload documents.");
//     }
//   };

//   return (
//     <div>
//       <Toaster />
//       <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">
//         Document Fill Up
//       </h2>

//       <p className="text-[#6c757d] mb-6">
//         Upload any medical certificates, doctor&apos;s notes, or other relevant
//         documents. Accepted formats: PDF, JPG, PNG. Maximum file size: 10MB per file.
//       </p>

//       {/* Buttons to open modals */}
//       <div className="flex gap-4 mb-6 flex-wrap">
//         <Button onClick={() => setOpenModal("modal1")}>Standards Form</Button>
//         <Button onClick={() => setOpenModal("modal2")}>Continuing Education</Button>
//         <Button onClick={() => setOpenModal("modal3")}>Divers Activity</Button>
//         <Button onClick={() => setOpenModal("modal4")}>Quick Review</Button>
//         <Button onClick={() => setOpenModal("modal5")}>Divers Medical</Button>
//         <Button onClick={() => setOpenModal("modal6")}>Enriched Training</Button>
//         <Button onClick={() => setOpenModal("modal7")}>Equipment Rental</Button>
//       </div>

//       {/* Modal Template */}
//       {[
//         { id: "modal1", title: "Standards Form", component: <StandardsForm /> },
//         { id: "modal2", title: "Continue Education Form", component: <PadiLiabilityForm /> },
//         { id: "modal3", title: "Divers Activity Form", component: <DiversActivityForm /> },
//         { id: "modal4", title: "Quick Review Form", component: <PadiQuickReview /> },
//         { id: "modal5", title: "Divers Medical Form", component: <DiverMedicalForm /> },
//         { id: "modal6", title: "Enriched Training Form", component: <EnrichedAirForm /> },
//         { id: "modal7", title: "Equipment Rental Form", component: <PadiForm /> },
//       ].map(({ id, title, component }) => (
//         <Dialog key={id} open={openModal === id} onOpenChange={(open) => !open && closeModal()}>
//           <DialogContent className="max-w-7xl">
//             <DialogTitle>{title}</DialogTitle>

//             {/* File input */}
//             <div className="my-4">
//               <input
//                 type="file"
//                 multiple
//                 accept=".pdf,.jpg,.png"
//                 onChange={handleFileChange}
//               />
//               {selectedFiles.length > 0 && (
//                 <ul className="mt-2 text-sm text-gray-700">
//                   {selectedFiles.map((file) => (
//                     <li key={file.name}>{file.name}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className="max-h-[70vh] w-full overflow-y-auto pr-2">{component}</div>

//             <DialogFooter className="flex gap-2">
//               <Button onClick={closeModal} className="bg-red-500">Close</Button>
//               <Button onClick={handleUpload} className="bg-green-500">Upload</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       ))}
//     </div>
//   );
// }
