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
import { toast, Toaster } from "sonner";

export function DocumentUploadStep() {
  const { state, dispatch } = useBooking();

  // State to manage which modal is open
  const [openModal, setOpenModal] = React.useState<
    "modal1" | "modal2" | "modal3" | "modal4" | null
  >(null);

  const closeModal = () => setOpenModal(null);

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

      {/* Buttons to open modals */}
      <div className="flex gap-4 mb-6">
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
      </div>

      {/* Modal 1 - StandardsForm */}
      {/* <Dialog open={openModal === "modal1"} onOpenChange={(open) => !open && closeModal()} >
        <DialogContent className=""> */}
      {/* Optional title */}
      {/* <DialogTitle>Standards Form</DialogTitle> */}

      {/* Embed the form */}
      {/* <StandardsForm /> */}

      {/* <DialogFooter>
            <Button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Modal 1 - StandardsForm */}
      <Dialog
        open={openModal === "modal1"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-7xl">
          <DialogTitle>Standards Form</DialogTitle>

          <div className="max-h-[80vh] max-w-7xl w-full overflow-y-auto pr-2">
            <StandardsForm />
            {/* <PadiLiabilityForm /> */}
          </div>

          <DialogFooter>
            <Button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal 2 */}

      <Dialog
        open={openModal === "modal2"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-7xl">
          <DialogTitle>Continue Education Form</DialogTitle>

          <div className="max-h-[80vh] max-w-7xl w-full overflow-y-auto pr-2">
            <PadiLiabilityForm />
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>

            <Button
              onClick={() => {
                toast.success("Form submitted successfully! ✅");
                closeModal();
              }}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <Dialog
        open={openModal === "modal2"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-7xl"> */}
      {/* <DialogTitle>Continue Education Form</DialogTitle> */}

      {/* <div className="max-h-[80vh] max-w-7xl w-full overflow-y-auto pr-2"> */}
      {/* <StandardsForm /> */}
      {/* <PadiLiabilityForm /> */}
      {/* </div> */}

      {/* <DialogFooter>
            <Button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </DialogFooter> */}
      {/* </DialogContent>
      </Dialog> */}

      {/* Modal 3 */}
      <Dialog
        open={openModal === "modal3"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-7xl">
          <DialogTitle>Divers Activity Form</DialogTitle>

          <div className="max-h-[80vh] max-w-7xl w-full overflow-y-auto pr-2">
            <DiversActivityForm />
          </div>

          <DialogFooter>
            <Button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal 4*/}
      <Dialog
        open={openModal === "modal4"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-7xl">
          <DialogTitle>Quick Review Form</DialogTitle>

          <div className="max-h-[80vh] max-w-7xl w-full overflow-y-auto pr-2">
            <PadiQuickReview />
          </div>

          <DialogFooter>
            <Button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
