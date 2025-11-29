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
import { CheckCircle2, Circle, ArrowDown, FileText } from "lucide-react";

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

  const handleSubmit = (cartId: string | undefined) => {
    if (!cartId) return;
    const allData = store.getFormData(cartId);
    console.log(`All data for cart ${cartId}:`, allData);
    alert("Check console for submitted data!");

    // Mark this cart as submitted
    setSubmittedCarts((prev) => new Set(prev).add(cartId));
  };

  /** Simplified mapping of form titles to components */
  const formComponentsMap: Record<string, React.ComponentType<FormProps>> = {
    "Divers Medical": DiverMedicalForm,
    "Equipment Rental": PadiForm,
    "Continuing Education": PadiLiabilityForm,
    "Enriched Training": EnrichedAirForm,
    // "Quick Review": PadiQuickReview,
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

  const isCartComplete = (cartId: string, requiredTitles: string[]) => {
    return store.checkAllFormsComplete(cartId, requiredTitles);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1
          title="Medical PDF Forms - Complete all required forms for your courses"
          className="text-5xl font-bold text-[#0694a2]"
        >
          Medical PDF Forms
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Fill out all necessary medical and course-related forms quickly and
          securely to ensure your enrollment and compliance.
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
                className="border-2 rounded-xl shadow-lg p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  {item.title}
                </h2>

                <div className="grid grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg border mb-4">
                  <p className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase font-semibold">
                      Name
                    </span>
                    <span className="text-gray-800 font-medium">
                      {item.Username}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase font-semibold">
                      Email
                    </span>
                    <span className="text-gray-800 font-medium">
                      {item.email}
                    </span>
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide ">
                    Required Forms (
                    {
                      item.formTitle.filter((title) =>
                        store.completedForms[item.cartId]?.includes(title),
                      ).length
                    }
                    /{item.formTitle.length} Completed)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
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

                {/* Animated Arrow and Submit Button */}
                <div className="relative">
                  {allFormsComplete && !isSubmitted && (
                    <div className="flex justify-center mb-2">
                      <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-2">
                    <Button
                      onClick={() => handleSubmit(item.cartId)}
                      disabled={!allFormsComplete || isSubmitted}
                      className={`w-full md:w-auto px-8 py-6 text-lg font-semibold transition-all duration-300 ${
                        allFormsComplete && !isSubmitted
                          ? "bg-[#0694a2] hover:bg-[#0284a2] shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
                          : "opacity-50 cursor-not-allowed bg-gray-400"
                      }`}
                    >
                      {isSubmitted ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Submitted Successfully
                        </span>
                      ) : allFormsComplete ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Submit All Forms
                        </span>
                      ) : (
                        "Complete All Forms to Submit"
                      )}
                    </Button>

                    {!allFormsComplete && !isSubmitted && (
                      <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                        <Circle className="w-4 h-4" />
                        Please complete all forms above to enable submission
                      </p>
                    )}

                    {isSubmitted && (
                      <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        All forms have been submitted successfully
                      </p>
                    )}
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
        className="group relative overflow-hidden rounded-lg p-4 text-left transition-all duration-300 border-2 bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-md cursor-not-allowed w-full"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="font-medium text-sm text-green-800">{title}</span>
          </div>
          <div className="text-xs font-semibold px-2 py-1 rounded-full bg-green-600 text-white">
            Done
          </div>
        </div>
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group relative overflow-hidden rounded-lg p-4 text-left transition-all duration-300 border-2 bg-white border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer w-full">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="font-medium text-sm text-gray-700">{title}</span>
            </div>
            <div className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700 group-hover:bg-blue-200">
              Open
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-teal-500/0 group-hover:from-blue-500/5 group-hover:to-teal-500/5 transition-all duration-300" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold flex items-center justify-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">{renderForm(() => setOpen(false))}</div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="px-6">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
