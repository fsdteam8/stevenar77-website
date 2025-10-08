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
import PadiQuickReview from "../../QuickReview/QuickReview";
import { toast } from "sonner";
import { DiverMedicalForm } from "@/components/forms/diver-medical-form";
import EnrichedAirForm from "../../form/EnrichedTrainning";
import StandardsForm from "../../form/StandardsForm";
import PadiLiabilityForm from "../../form/PadiLiabilityForm";
import DiversActivityForm from "../../form/DiversActivityForm";
import PadiForm from "../../form/Equipment";
import ResqueDiverQuickReview from "../../form/ResqueDiverQuickReview";
import QuickReview from "../../form/QuickReview";

export function DocumentUploadStep() {
  const { state, dispatch } = useBooking();
  const [submittedForms, setSubmittedForms] = React.useState<string[]>([]);

  const [openModal, setOpenModal] = React.useState<
    | "modal1"
    | "modal2"
    | "modal3"
    | "modal4"
    | "modal5"
    | "modal6"
    | "modal7"
    | "modal8"
    | "modal9"
    | null
  >(null);

  const closeModal = () => setOpenModal(null);

  const handleFormSubmit = (formId: string) => {
    toast.success("Form submitted successfully! ✅");
    setOpenModal(null); // Close modal
    setSubmittedForms((prev) => [...prev, formId]); // Mark as submitted
  };

  const modalConfigs = [
    // {
    //   id: "modal1",
    //   title: "Standards Form",
    //   content: <StandardsForm />,
    // },
    {
      id: "modal1",
      title: "Standards Form",
      content: (
        // <StandardsForm onSubmitSuccess={() => handleFormSubmit("modal1")} />
        <StandardsForm onSubmitSuccess={() => handleFormSubmit("modal1")} />

      ),
    },
    {
      id: "modal2",
      title: "Continue Education Form",
      content: <PadiLiabilityForm onSubmitSuccess={() => handleFormSubmit("modal2")} />,
      showSubmit: true,
    },
    {
      id: "modal3",
      title: "Divers Activity Form",
      content: <DiversActivityForm onSubmitSuccess={() => handleFormSubmit("modal3")}/>,
    },
    {
      id: "modal4",
      title: "Quick Review Form",
      content: <PadiQuickReview onSubmitSuccess={() => handleFormSubmit("modal4")}/>,
    },
    {
      id: "modal5",
      title: "Divers Medical Form",
      content: <DiverMedicalForm />,
    },
    {
      id: "modal6",
      title: "Divers Medical Form",
      content: <EnrichedAirForm onSubmitSuccess={() => handleFormSubmit("modal6")}/>,
    },
    {
      id: "modal7",
      title: "Form",
      content: <PadiForm  />,
    },
    {
      id: "modal8",
      title: "Resque Diver Quick Review Form",
      content: <ResqueDiverQuickReview />,
    },
    {
      id: "modal9",
      title: "Enriched Air Quick Review Form",
      content: <QuickReview />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">
        Please Complete The Following Form
      </h2>

      <p className="text-[#6c757d] mb-6">
        It is Required To Admit into the Course.
      </p>

      {/* <div className="flex gap-4 mb-6 flex-wrap">
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
          Quick Review-Open Waters
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

        <Button
          onClick={() => setOpenModal("modal8")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Resque Diver-Quick Review
        </Button>

        <Button
          onClick={() => setOpenModal("modal9")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Enriched Air -Quick Review
        </Button>
      </div> */}

      <div className="flex gap-4 mb-6 flex-wrap">
        {[
          { id: "modal1", label: "Standards Form", color: "green" },
          { id: "modal2", label: "Continuing Education", color: "green" },
          { id: "modal3", label: "Divers Activity", color: "green" },
          { id: "modal4", label: "Quick Review-Open Waters", color: "green" },
          { id: "modal5", label: "Divers Medical", color: "green" },
          { id: "modal6", label: "Enriched Training", color: "green" },
          { id: "modal7", label: "Equipment Rental", color: "green" },
          { id: "modal8", label: "Resque Diver-Quick Review", color: "green" },
          { id: "modal9", label: "Enriched Air -Quick Review", color: "green" },
        ]
          // Filter buttons based on formTitle
          .filter((btn) =>
            state.course.formTitle?.some((ft) =>
              btn.label.toLowerCase().includes(ft.toLowerCase()),
            ),
          )
          .map((btn) => (
            // <Button
            //   key={btn.id}

            //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
            //   onClick={() => setOpenModal(btn.id as any)}
            //   className={`bg-${btn.color}-500 hover:bg-${btn.color}-600 text-white`}
            // >
            //   {btn.label}
            // </Button>

            <Button
              key={btn.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setOpenModal(btn.id as any)}
              disabled={submittedForms.includes(btn.id)} // ✅ Add this line
              className={`bg-${btn.color}-500 hover:bg-${btn.color}-600 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {btn.label}
            </Button>
          ))}
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
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
