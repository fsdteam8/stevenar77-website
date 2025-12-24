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
import {
  CheckCircle2,
  ArrowDown,
  FileText,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { useCourseFormBookingUpdate } from "@/hooks/useCourseformbookingupdate";
import { Schedule } from "@/types/cart";

interface CourseFormItem {
  cartId: string;
  itemId: string;
  bookingId?: string;
  formTitle: string[];
  title: string;
  Username: string;
  email: string;
  classDate?: string[];
  schedule?: Schedule[];
  scheduleId?: string;
}

interface FormProps {
  cartId: string;
  formTitle: string;
  onSubmitSuccess?: () => void;
}

export default function MedicalForm() {
  const [courseData, setCourseData] = useState<CourseFormItem[]>([]);
  const [submittedCarts, setSubmittedCarts] = useState<Set<string>>(new Set());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const store = useFormStore();
  const { updateBooking, isLoading } = useCourseFormBookingUpdate();

  useEffect(() => {
    const stored = localStorage.getItem("courseFormTitles");
    // console.log("📦 Raw localStorage data:", stored);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // console.log("✅ Parsed localStorage data:", parsed);
        // console.log("📋 Full parsed object:", JSON.stringify(parsed, null, 2));

        if (parsed?.course) {
          // console.log("🎓 Course data array:", parsed.course);
          // console.log("📊 Number of courses:", parsed.course.length);

          // Log each course item separately
          parsed.course.forEach((item: CourseFormItem, index: number) => {
            console.log(`\n🔍 Course Item [${index}]:`, item);
            // console.log(`  - Title: ${item.title}`);
            // console.log(`  - Cart ID: ${item.cartId}`);
            // console.log(`  - Booking ID: ${item.bookingId}`);
            // console.log(`  - Username: ${item.Username}`);
            // console.log(`  - Email: ${item.email}`);
            // console.log(`  - Form Titles:`, item.formTitle);
            // console.log(`  - Schedule ID: ${item.scheduleId}`);
            // console.log(`  - Class Dates:`, item.classDate);

            // Display schedule information
            if (item.schedule && item.schedule.length > 0) {
              console.log(
                `  📅 SCHEDULE INFORMATION (${item.schedule.length} schedules):`,
              );
              item.schedule.forEach((sched, schedIndex) => {
                console.log(`\n    [${schedIndex}] ${sched.title}`);
                // console.log(`        Description: ${sched.description}`);
                // console.log(
                //   `        Participants: ${sched.participents}/${sched.totalParticipents}`,
                // );
                // console.log(`        Sets (${sched.sets?.length || 0} dates):`);
                sched.sets?.forEach((set, setIndex) => {
                  console.log(
                    `          [${setIndex}] ${new Date(set.date).toLocaleString()}`,
                  );
                  // console.log(`              Location: ${set.location}`);
                  // console.log(`              Type: ${set.type}`);
                });
              });
            }

            // Check for any course-date type fields
            const itemKeys = Object.keys(item);
            const dateRelatedKeys = itemKeys.filter(
              (key) =>
                key.toLowerCase().includes("date") ||
                key.toLowerCase().includes("course-date"),
            );

            if (dateRelatedKeys.length > 0) {
              console.log(`  🗓️ DATE-RELATED FIELDS FOUND:`, dateRelatedKeys);
              dateRelatedKeys.forEach((key) => {
                console.log(
                  `    - ${key}:`,
                  (item as unknown as Record<string, unknown>)[key],
                );
              });
            }
          });

          setCourseData(parsed.course);
        }

        // Check for course-date at root level
        if (parsed["course-date"]) {
          console.log(
            "\n🗓️ COURSE-DATE FOUND at root level:",
            parsed["course-date"],
          );
        }
      } catch (error) {
        console.error("❌ JSON parse error:", error);
      }
    } else {
      // console.log("⚠️ No courseFormTitles found in localStorage");
    }
  }, []);

  /** ----------- ONLY FILE UPLOAD SUBMIT (ARRAY FORMAT) ----------- **/
  const handleSubmit = async (
    cartId: string | undefined,
    bookingId?: string,
  ) => {
    if (!cartId || !bookingId) {
      // console.log("⚠️ Submit blocked - missing cartId or bookingId");
      return;
    }

    // console.log("\n🚀 SUBMIT INITIATED:");
    // console.log("  - Cart ID:", cartId);
    // console.log("  - Booking ID:", bookingId);

    const allData = store.getFormData(cartId);
    // console.log("📝 All form data from store:", allData);

    const formData = new FormData();

    const medicalDocuments: File[] = [];
    const medicalDocumentsNames: string[] = [];

    // Collect files and names separately
    Object.entries(allData).forEach(([formTitle, formValue]) => {
      console.log(`  📄 Form: ${formTitle}`, formValue);
      if (formValue?.file instanceof File) {
        // console.log(
        //   `    ✅ File found: ${formValue.file.name} (${formValue.file.size} bytes)`,
        // );
        medicalDocuments.push(formValue.file);
        medicalDocumentsNames.push(formTitle);
      }
    });

    // console.log("\n📦 Collected Documents:");
    // console.log("  - Total files:", medicalDocuments.length);
    // console.log("  - File names:", medicalDocumentsNames);

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
      setShowSuccessModal(true);
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
                {/* User Info */}
                <div className="grid md:grid-cols-3 gap-4 text-sm bg-white p-6 rounded-xl border shadow-sm mb-6">
                  {/* User Info */}
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500 text-xs uppercase">
                        Name
                      </span>
                      <span className="block text-gray-800 font-medium">
                        {item?.Username?.replace(/([a-z])([A-Z])/g, "$1 $2")}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500 text-xs uppercase">
                        Email
                      </span>
                      <span className="block text-gray-800 font-medium">
                        {item?.email}
                      </span>
                    </p>
                    {/* <p>
                      <span className="text-gray-500 text-xs uppercase">
                        Booking ID
                      </span>
                      <span className="block text-gray-800 font-medium">
                        {item.bookingId}
                      </span>
                    </p> */}
                  </div>

                  {/* Class Dates */}
                  {item.classDate && item.classDate.length > 0 && (
                    <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg  ">
                      <span className="font-semibold text-blue-700 uppercase flex items-center gap-2 mb-2">
                        <ArrowDown className="w-4 h-4" /> Class Dates
                      </span>

                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {item.classDate.map((dateStr, i) => {
                          const date = new Date(dateStr);
                          const formatted = new Intl.DateTimeFormat("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }).format(date);

                          return (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                            >
                              📅 {formatted}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
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

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <PartyPopper className="w-10 h-10 text-green-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-green-700">
                Thank you!
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="text-center py-4 space-y-4">
            <p className="text-gray-700 text-base leading-relaxed">
              Your documents have been successfully submitted.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              You should receive an email shortly with important information
              about what to know and how to prepare for your upcoming class. If
              you don&apos;t see it, please check your spam or junk folder.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              If the email isn&apos;t found in either place, reach out to us
              through the Contact Us page on our website and we&apos;ll be happy
              to help.
            </p>
            <p className="text-gray-700 text-base leading-relaxed font-medium">
              We&apos;re looking forward to diving with you soon! 🌊
            </p>
          </div>
          <div className="flex justify-center">
            <DialogFooter className="flex justify-center ">
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#0694a2] hover:bg-[#0284a2] text-white px-12 py-2"
              >
                Go to Home
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
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
