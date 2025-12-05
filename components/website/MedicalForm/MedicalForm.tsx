"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";
import PadiLiabilityForm from "../form/PadiLiabilityForm";
import EnrichedAirForm from "../form/EnrichedTrainning";
import StandardsForm from "../form/StandardsForm";
import DiversActivityForm from "../form/DiversActivityForm";
import DiverMedicalForm from "@/components/forms/diver-medical-form";
import PadiForm from "../form/Equipment";
import { CheckCircle2, ArrowDown, FileText, Loader2 } from "lucide-react";
import { useCourseFormBookingUpdate } from "@/hooks/useCourseformbookingupdate";

interface CourseFormItem {
  cartId: string;
  itemId: string;
  bookingId?: string;
  formTitle: string[];
  title: string;
  Username: string;
  email: string;
}

interface FormProps {
  cartId: string;
  formTitle: string;
  onSubmitSuccess?: () => void;
}

export default function MedicalForm() {
  const [courseData, setCourseData] = useState<CourseFormItem[]>([]);
  const [submittedCarts, setSubmittedCarts] = useState<Set<string>>(new Set());
  const store = useFormStore();
  const { updateBooking, isLoading } = useCourseFormBookingUpdate();

  useEffect(() => {
    const stored = localStorage.getItem("courseFormTitles");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.course) setCourseData(parsed.course);
      } catch (error) {
        console.error("JSON parse error:", error);
      }
    }
  }, []);

  /** ----------- ONLY FILE UPLOAD SUBMIT (ARRAY FORMAT) ----------- **/
  const handleSubmit = async (
    cartId: string | undefined,
    bookingId?: string,
  ) => {
    if (!cartId || !bookingId) return;

    const allData = store.getFormData(cartId);

    const formData = new FormData();

    const medicalDocuments: File[] = [];
    const medicalDocumentsNames: string[] = [];

    // Collect files and names separately
    Object.entries(allData).forEach(([formTitle, formValue]) => {
      if (formValue?.file instanceof File) {
        medicalDocuments.push(formValue.file);
        medicalDocumentsNames.push(formTitle);
      }
    });

    // Append files exactly as Postman does
    medicalDocuments.forEach((file) => {
      formData.append("medicalDocuments", file);
    });

    // Append names exactly as Postman does (as JSON string)
    formData.append(
      "medicalDocumentsNames",
      JSON.stringify(medicalDocumentsNames),
    );

    try {
      await updateBooking({ bookingId, formData });
      setSubmittedCarts((prev) => new Set(prev).add(cartId));
    } catch (error) {
      console.log("Medical Form Submit Failed", error);
    }
  };

  /** Form mapping */
  const formComponentsMap: Record<string, React.ComponentType<FormProps>> = {
    "Divers Medical": DiverMedicalForm,
    "Equipment Rental": PadiForm,
    "Continuing Education": PadiLiabilityForm,
    "Enriched Training": EnrichedAirForm,
    "Standards Form": StandardsForm,
    "Divers Activity": DiversActivityForm,
  };

  const renderFormComponent = (
    cartId: string,
    title: string,
    closeDialog: () => void,
  ) => {
    const FormComponent = Object.entries(formComponentsMap).find(([key]) =>
      title.includes(key),
    )?.[1];

    return FormComponent ? (
      <FormComponent
        cartId={cartId}
        formTitle={title}
        onSubmitSuccess={closeDialog}
      />
    ) : (
      <p>No form available for this title.</p>
    );
  };

  const isCartComplete = (cartId: string, requiredTitles: string[]) =>
    store.checkAllFormsComplete(cartId, requiredTitles);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        {/* <h1 className="text-5xl font-bold text-[#0694a2]">Medical PDF Forms</h1> */}
        <h1 className="text-5xl font-bold text-[#0694a2]">Required Forms</h1>
        {/* <p className="mt-2 text-gray-600 text-lg">
          Fill out all necessary medical and course-related forms quickly and
          securely.
        </p> */}
        <p className="mt-2 text-gray-600 text-lg">
          Please fill out all required forms.
        </p>
      </div>

      {courseData.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No course form data found.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {courseData.map((item, index) => {
            const allFormsComplete = isCartComplete(
              item.cartId,
              item.formTitle,
            );
            const isSubmitted = submittedCarts.has(item.cartId);

            return (
              <div
                key={index}
                className="border-2 rounded-xl shadow-lg p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  {item.title}
                </h2>

                {/* User Info */}
                <div className="grid grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg border mb-4">
                  <p>
                    <span className="text-gray-500 text-xs uppercase">
                      Name
                    </span>
                    <span className="block text-gray-800 font-medium">
                      {item.Username}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-500 text-xs uppercase">
                      Email
                    </span>
                    <span className="block text-gray-800 font-medium">
                      {item.email}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-500 text-xs uppercase">
                      Booking Id
                    </span>
                    <span className="block text-gray-800 font-medium">
                      {item.bookingId}
                    </span>
                  </p>
                </div>

                {/* Forms list */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase">
                    Required Forms (
                    {store.completedForms[item.cartId]?.length || 0}/
                    {item.formTitle.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.formTitle.map((title, i) => (
                      <FormDialog
                        key={i}
                        title={title}
                        cartId={item.cartId}
                        isCompleted={store.completedForms[
                          item.cartId
                        ]?.includes(title)}
                        renderForm={(close) =>
                          renderFormComponent(item.cartId, title, close)
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="relative">
                  {allFormsComplete && !isSubmitted && (
                    <div className="flex justify-center mb-2">
                      <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-2">
                    <Button
                      onClick={() => handleSubmit(item.cartId, item.bookingId)}
                      disabled={!allFormsComplete || isSubmitted || isLoading}
                      className={`w-full md:w-auto px-8 py-6 text-lg font-semibold ${
                        allFormsComplete && !isSubmitted
                          ? "bg-[#0694a2] hover:bg-[#0284a2] text-white"
                          : "bg-gray-400 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </span>
                      ) : isSubmitted ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Submitted Successfully
                        </span>
                      ) : (
                        "Submit All Forms"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface FormDialogProps {
  title: string;
  cartId: string;
  isCompleted?: boolean;
  renderForm: (close: () => void) => React.ReactNode;
}

function FormDialog({ title, isCompleted, renderForm }: FormDialogProps) {
  const [open, setOpen] = useState(false);

  if (isCompleted) {
    return (
      <button
        disabled
        className="rounded-lg p-4 border-2 bg-green-50 border-green-300 cursor-not-allowed w-full"
      >
        <div className="flex justify-between items-center">
          <span className="font-medium text-green-800">{title}</span>
          <span className="text-xs font-semibold bg-green-600 text-white px-2 py-1 rounded">
            Done
          </span>
        </div>
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-lg p-4 border-2 bg-white hover:border-blue-400 cursor-pointer w-full">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{title}</span>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Open
            </span>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" /> {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">{renderForm(() => setOpen(false))}</div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
