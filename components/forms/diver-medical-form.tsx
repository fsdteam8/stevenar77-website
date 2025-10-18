"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/lib/forms/medical-form-pdf-generator";
import { useMutation } from "@tanstack/react-query";
import { diverMedicalForm } from "@/lib/diverMedicalForm";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useBooking } from "../website/course/booking-context";
import { useSearchParams } from "next/navigation";

interface FormData {
  participantName: string;
  birthdate: string;
  facilityName: string;
  instructorName: string;
  date: string;
  participantSignature: string;
  question1: boolean;
  question2: boolean;
  question3: boolean;
  question4: boolean;
  question5: boolean;
  question6: boolean;
  question7: boolean;
  question8: boolean;
  question9: boolean;
  question10: boolean;
  boxA1: boolean;
  boxA2: boolean;
  boxA3: boolean;
  boxA4: boolean;
  boxA5: boolean;
  boxB1: boolean;
  boxB2: boolean;
  boxB3: boolean;
  boxB4: boolean;
  boxC1: boolean;
  boxC2: boolean;
  boxC3: boolean;
  boxC4: boolean;
  boxD1: boolean;
  boxD2: boolean;
  boxD3: boolean;
  boxD4: boolean;
  boxD5: boolean;
  boxE1: boolean;
  boxE2: boolean;
  boxE3: boolean;
  boxE4: boolean;
  boxF1: boolean;
  boxF2: boolean;
  boxF3: boolean;
  boxF4: boolean;
  boxF5: boolean;
  boxG1: boolean;
  boxG2: boolean;
  boxG3: boolean;
  boxG4: boolean;
  boxG5: boolean;
  boxG6: boolean;
  medicalExaminerName: string;
  medicalExaminerSignature: string;
  medicalExaminerDate: string;
  medicalExaminerPhone: string;
  medicalExaminerClinic: string;
  medicalExaminerAddress: string;
  medicalExaminerEmail: string;
  medicalExaminerCredentials: string;
  evaluationResult: "approved" | "not-approved" | "";
}

interface DiverMedicalFormProps {
  onSubmitSuccess?: () => void;
}

const DiverMedicalForm: React.FC<DiverMedicalFormProps> = ({
  onSubmitSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const { dispatch } = useBooking();
  const token = session?.accessToken || "";

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const uploadMutation = useMutation({
    mutationFn: async ({
      id,
      documents,
      token,
    }: {
      id: string;
      documents: File;
      token: string;
    }) => {
      console.log("🚀 Mutation executing with:", {
        id,
        tokenExists: !!token,
        fileName: documents.name,
        fileSize: documents.size,
      });

      return diverMedicalForm(id, token, documents);
    },
    onSuccess: (data) => console.log("✅ Mutation onSuccess:", data),
    onError: (error) => console.error("❌ Mutation onError:", error),
  });

  const [formData, setFormData] = useState<FormData>({
    participantName: "",
    birthdate: "",
    facilityName: "",
    instructorName: "",
    date: "",
    participantSignature: "",
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
    question6: false,
    question7: false,
    question8: false,
    question9: false,
    question10: false,
    boxA1: false,
    boxA2: false,
    boxA3: false,
    boxA4: false,
    boxA5: false,
    boxB1: false,
    boxB2: false,
    boxB3: false,
    boxB4: false,
    boxC1: false,
    boxC2: false,
    boxC3: false,
    boxC4: false,
    boxD1: false,
    boxD2: false,
    boxD3: false,
    boxD4: false,
    boxD5: false,
    boxE1: false,
    boxE2: false,
    boxE3: false,
    boxE4: false,
    boxF1: false,
    boxF2: false,
    boxF3: false,
    boxF4: false,
    boxF5: false,
    boxG1: false,
    boxG2: false,
    boxG3: false,
    boxG4: false,
    boxG5: false,
    boxG6: false,
    medicalExaminerName: "",
    medicalExaminerSignature: "",
    medicalExaminerDate: "",
    medicalExaminerPhone: "",
    medicalExaminerClinic: "",
    medicalExaminerAddress: "",
    medicalExaminerEmail: "",
    medicalExaminerCredentials: "",
    evaluationResult: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExportPDF = async () => {
    try {
      setIsSubmitting(true);

      if (!bookingId) {
        toast.error("Booking ID not found in URL.");
        return;
      }

      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      console.log("📄 Generating PDF...");
      const pdfFile = await generatePDF(formData);

      console.log("✅ PDF Generated:", {
        name: pdfFile.name,
        size: `${(pdfFile.size / 1024).toFixed(2)} KB`,
        type: pdfFile.type,
      });

      if (!(pdfFile instanceof File)) {
        throw new Error("Generated file is not a valid File object");
      }

      console.log("📤 Starting upload with bookingId:", bookingId);
      await uploadMutation.mutateAsync({ id: bookingId, token, documents: pdfFile });

      dispatch({ type: "ADD_DOCUMENT", payload: { file: pdfFile, label: "Divers Medical" } });
      console.log("📋 Document added to booking context");

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("❌ [DiverMedicalForm] Error in handleExportPDF:", error);
      toast.error(error instanceof Error ? `Failed: ${error.message}` : "Failed to submit diver medical form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (page: number) => setCurrentPage(page);
  
  
  // "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { generatePDF } from "@/lib/forms/medical-form-pdf-generator";
// import Image from "next/image";
// import { useMutation } from "@tanstack/react-query";
// import { diverMedicalForm } from "@/lib/diverMedicalForm";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";
// import { useBooking } from "../website/course/booking-context";
// import { useSearchParams } from "next/navigation";

// interface FormData {
//   participantName: string;
//   birthdate: string;
//   facilityName: string;
//   instructorName: string;
//   date: string;
//   participantSignature: string;
//   question1: boolean;
//   question2: boolean;
//   question3: boolean;
//   question4: boolean;
//   question5: boolean;
//   question6: boolean;
//   question7: boolean;
//   question8: boolean;
//   question9: boolean;
//   question10: boolean;
//   boxA1: boolean;
//   boxA2: boolean;
//   boxA3: boolean;
//   boxA4: boolean;
//   boxA5: boolean;
//   boxB1: boolean;
//   boxB2: boolean;
//   boxB3: boolean;
//   boxB4: boolean;
//   boxC1: boolean;
//   boxC2: boolean;
//   boxC3: boolean;
//   boxC4: boolean;
//   boxD1: boolean;
//   boxD2: boolean;
//   boxD3: boolean;
//   boxD4: boolean;
//   boxD5: boolean;
//   boxE1: boolean;
//   boxE2: boolean;
//   boxE3: boolean;
//   boxE4: boolean;
//   boxF1: boolean;
//   boxF2: boolean;
//   boxF3: boolean;
//   boxF4: boolean;
//   boxF5: boolean;
//   boxG1: boolean;
//   boxG2: boolean;
//   boxG3: boolean;
//   boxG4: boolean;
//   boxG5: boolean;
//   boxG6: boolean;
//   medicalExaminerName: string;
//   medicalExaminerSignature: string;
//   medicalExaminerDate: string;
//   medicalExaminerPhone: string;
//   medicalExaminerClinic: string;
//   medicalExaminerAddress: string;
//   medicalExaminerEmail: string;
//   medicalExaminerCredentials: string;
//   evaluationResult: "approved" | "not-approved" | "";
// }

// interface DiverMedicalFormProps {
//   onSubmitSuccess?: () => void;
// }

// // export function DiverMedicalForm() {
// const DiverMedicalForm: React.FC<DiverMedicalFormProps> = ({
//   onSubmitSuccess,
// }) => {
//   const [, setIsSubmitting] = useState(false);
//   const { data: session } = useSession();
//   const { dispatch } = useBooking(); // 🔥 Add this
//   const id = session?.user?.id || "";
//   const token = session?.accessToken || "";

//   const uploadMutation = useMutation({
//     mutationFn: async ({
//       id,
//       documents,
//       token,
//     }: {
//       id: string;
//       documents: File;
//       token: string;
//     }) => {
//       console.log("🚀 Mutation executing with:", {
//         id,
//         tokenExists: !!token,
//         fileName: documents.name,
//         fileSize: documents.size,
//       });

//       return diverMedicalForm(id, token, documents);
//     },
//     onSuccess: (data) => {
//       console.log("✅ Mutation onSuccess:", data);
//     },
//     onError: (error) => {
//       console.error("❌ Mutation onError:", error);
//     },
//   });

//   const [formData, setFormData] = useState<FormData>({
//     participantName: "",
//     birthdate: "",
//     facilityName: "",
//     instructorName: "",
//     date: "",
//     participantSignature: "",
//     question1: false,
//     question2: false,
//     question3: false,
//     question4: false,
//     question5: false,
//     question6: false,
//     question7: false,
//     question8: false,
//     question9: false,
//     question10: false,
//     boxA1: false,
//     boxA2: false,
//     boxA3: false,
//     boxA4: false,
//     boxA5: false,
//     boxB1: false,
//     boxB2: false,
//     boxB3: false,
//     boxB4: false,
//     boxC1: false,
//     boxC2: false,
//     boxC3: false,
//     boxC4: false,
//     boxD1: false,
//     boxD2: false,
//     boxD3: false,
//     boxD4: false,
//     boxD5: false,
//     boxE1: false,
//     boxE2: false,
//     boxE3: false,
//     boxE4: false,
//     boxF1: false,
//     boxF2: false,
//     boxF3: false,
//     boxF4: false,
//     boxF5: false,
//     boxG1: false,
//     boxG2: false,
//     boxG3: false,
//     boxG4: false,
//     boxG5: false,
//     boxG6: false,
//     medicalExaminerName: "",
//     medicalExaminerSignature: "",
//     medicalExaminerDate: "",
//     medicalExaminerPhone: "",
//     medicalExaminerClinic: "",
//     medicalExaminerAddress: "",
//     medicalExaminerEmail: "",
//     medicalExaminerCredentials: "",
//     evaluationResult: "",
//   });

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const updateFormData = (field: keyof FormData, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // const handleExportPDF = async () => {
//   //   try {
//   //     setIsSubmitting(true);

//   //     // Validate session data
//   //     if (!id) {
//   //       toast.error("User ID not found. Please log in again.");
//   //       return;
//   //     }

//   //     if (!token) {
//   //       toast.error("Authentication token not found. Please log in again.");
//   //       return;
//   //     }

//   //     console.log("📄 Generating PDF...");

//   //     // Generate PDF
//   //     const pdfFile = await generatePDF(formData);

//   //     console.log("✅ PDF Generated:", {
//   //       name: pdfFile.name,
//   //       size: `${(pdfFile.size / 1024).toFixed(2)} KB`,
//   //       type: pdfFile.type,
//   //     });

//   //     // Upload PDF and WAIT for completion
//   //     if (pdfFile instanceof File) {
//   //       console.log("📤 Starting upload with ID:", id);

//   //       await uploadMutation.mutateAsync({ id, token, documents: pdfFile });

//   //       console.log("✅ Upload completed successfully!");

//   //       // 🔥 Add document to booking context
//   //       // dispatch({ type: "ADD_DOCUMENT", payload: pdfFile });
//   //       dispatch({ type: "ADD_DOCUMENT", payload: { file: pdfFile, label: "Divers Medical" } });
//   //       console.log("📋 Document added to booking context");

//   //       // Only call success after upload completes
//   //       // toast.success("Diver Medical Form uploaded successfully!");
//   //       if (onSubmitSuccess) {
//   //         console.log("🎯 [DiverMedicalForm] About to call onSubmitSuccess");
//   //         onSubmitSuccess();
//   //         console.log(
//   //           "✅ [DiverMedicalForm] onSubmitSuccess called successfully",
//   //         );
//   //       } else {
//   //         console.error("❌ [DiverMedicalForm] onSubmitSuccess is undefined!");
//   //       }
//   //     } else {
//   //       throw new Error("Generated file is not a valid File object");
//   //     }
//   //   } catch (error) {
//   //     console.error("❌ [DiverMedicalForm] Error in handleExportPDF:", error);

//   //     if (error instanceof Error) {
//   //       toast.error(`Failed: ${error.message}`);
//   //     } else {
//   //       toast.error("Failed to submit diver medical form");
//   //     }
//   //   } finally {
//   //     console.log("🏁 [DiverMedicalForm] Setting isSubmitting to false");
//   //     setIsSubmitting(false);
//   //   }
//   // };
  

//   // ✅ Get bookingId from URL instead of session user ID
//   const searchParams = useSearchParams();
//   const bookingId = searchParams.get("bookingId");
// const handleExportPDF = async () => {
//   try {
//     setIsSubmitting(true);


//     if (!bookingId) {
//       toast.error("Booking ID not found in URL.");
//       return;
//     }

//     if (!token) {
//       toast.error("Authentication token not found. Please log in again.");
//       return;
//     }

//     console.log("📄 Generating PDF...");

//     // Generate PDF
//     const pdfFile = await generatePDF(formData);

//     console.log("✅ PDF Generated:", {
//       name: pdfFile.name,
//       size: `${(pdfFile.size / 1024).toFixed(2)} KB`,
//       type: pdfFile.type,
//     });

//     // Upload PDF and WAIT for completion
//     if (pdfFile instanceof File) {
//       console.log("📤 Starting upload with bookingId:", bookingId);

//       await uploadMutation.mutateAsync({
//         id: bookingId,
//         token,
//         documents: pdfFile,
//       });

//       console.log("✅ Upload completed successfully!");

//       dispatch({
//         type: "ADD_DOCUMENT",
//         payload: { file: pdfFile, label: "Divers Medical" },
//       });
//       console.log("📋 Document added to booking context");

//       if (onSubmitSuccess) {
//         console.log("🎯 [DiverMedicalForm] About to call onSubmitSuccess");
//         onSubmitSuccess();
//         console.log(
//           "✅ [DiverMedicalForm] onSubmitSuccess called successfully"
//         );
//       } else {
//         console.error("❌ [DiverMedicalForm] onSubmitSuccess is undefined!");
//       }
//     } else {
//       throw new Error("Generated file is not a valid File object");
//     }
//   } catch (error) {
//     console.error("❌ [DiverMedicalForm] Error in handleExportPDF:", error);

//     if (error instanceof Error) {
//       toast.error(`Failed: ${error.message}`);
//     } else {
//       toast.error("Failed to submit diver medical form");
//     }
//   } finally {
//     console.log("🏁 [DiverMedicalForm] Setting isSubmitting to false");
//     setIsSubmitting(false);
//   }
// };


//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 3;

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToPage = (page: number) => {
//     setCurrentPage(page);
//   };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {currentPage === 1 && (
          <div
            className="bg-white p-8 font-sans text-sm"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* Page 1 */}
            <div className="flex justify-center items-center gap-4 mb-6 py-4">
              <Image
                src="/images/medical-form-header.png"
                alt="Logo"
                width={800}
                height={100}
                className="object-contain h-auto w-full"
              />
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-4">
                Diver Medical | Participant Questionnaire
              </h1>
            </div>

            <div className="mb-6">
              <p className="mb-4 text-justify leading-relaxed">
                Recreational scuba diving and freediving requires good physical
                and mental health. There are a few medical conditions which can
                be hazardous while diving, listed below. Those who have, or are
                predisposed to, any of these conditions, should be evaluated by
                a physician. This Diver Medical Participant Questionnaire
                provides a basis to determine if you should seek out that
                evaluation. If you have any concerns about your diving fitness
                not represented on this form, consult with your physician before
                diving. If you are feeling ill, avoid diving. If you think you
                may have a contagious disease, protect yourself and others by
                not participating in dive training and/ or dive activities.
                References to &#34;diving&#34; on this form encompass both
                recreational scuba diving and freediving. This form is
                principally designed as an initial medical screen for new
                divers, but is also appropriate for divers taking continuing
                education. For your safety, and that of others who may dive with
                you, answer all questions honestly.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-center mb-4 text-lg">Directions</h2>
              <p className="mb-3 font-bold">
                Complete this questionnaire as a prerequisite to a recreational
                scuba diving or freediving course.
              </p>
              <p className="mb-4">
                <strong>Note to women:</strong> If you are pregnant, or
                attempting to become pregnant, <em>do not dive</em>.
              </p>
            </div>

            <div className="border border-black mb-6">
              <table className="w-full border-collapse">
                <tbody>
                  {[
                    {
                      num: 1,
                      text: "I have had problems with my lungs, breathing, heart and/or blood affecting my normal physical or mental performance.",
                      goTo: "Go to box A",
                      field: "question1",
                    },
                    {
                      num: 2,
                      text: "I am over 45 years of age.",
                      goTo: "Go to box B",
                      field: "question2",
                    },
                    {
                      num: 3,
                      text: "I struggle to perform moderate exercise (for example, walk 1.6 kilometer/one mile in 14 minutes or swim 200 meters/yards without resting), OR I have been unable to participate in a normal physical activity due to fitness or health reasons within the past 12 months.",
                      asterisk: true,
                      field: "question3",
                    },
                    {
                      num: 4,
                      text: "I have had problems with my eyes, ears, or nasal passages/sinuses.",
                      goTo: "Go to box C",
                      field: "question4",
                    },
                    {
                      num: 5,
                      text: "I have had surgery within the last 12 months, OR I have ongoing problems related to past surgery.",
                      asterisk: true,
                      field: "question5",
                    },
                    {
                      num: 6,
                      text: "I have lost consciousness, had migraine headaches, seizures, stroke, significant head injury, or suffer from persistent neurologic injury or disease.",
                      goTo: "Go to box D",
                      field: "question6",
                    },
                    {
                      num: 7,
                      text: "I am currently undergoing treatment (or have required treatment within the last five years) for psychological problems, personality disorder, panic attacks, or an addiction to drugs or alcohol; or, I have been diagnosed with a learning or developmental disability.",
                      goTo: "Go to box E",
                      field: "question7",
                    },
                    {
                      num: 8,
                      text: "I have had back problems, hernia, ulcers, or diabetes.",
                      goTo: "Go to box F",
                      field: "question8",
                    },
                    {
                      num: 9,
                      text: "I have had stomach or intestine problems, including recent diarrhea.",
                      goTo: "Go to box G",
                      field: "question9",
                    },
                    {
                      num: 10,
                      text: "I am taking prescription medications (with the exception of birth control or anti-malarial drugs other than mefloquine (Lariam).",
                      asterisk: true,
                      field: "question10",
                    },
                  ].map((q) => (
                    <tr key={q.num} className="border-b border-black">
                      <td className="border-r border-black p-2 w-8 text-center font-bold align-top">
                        {q.num}
                      </td>
                      <td className="border-r border-black p-2 text-justify align-top">
                        {q.text}
                        {q.goTo && (
                          <div className="text-xs mt-1 text-center font-bold">
                            {q.goTo}
                          </div>
                        )}
                      </td>
                      <td className="border-r border-black p-2 w-16 text-center align-top">
                        <label className="flex items-center justify-center gap-1 cursor-pointer mb-1">
                          <input
                            type="checkbox"
                            checked={
                              formData[q.field as keyof FormData] as boolean
                            }
                            onChange={(e) =>
                              updateFormData(
                                q.field as keyof FormData,
                                e.target.checked,
                              )
                            }
                            className="w-4 h-4 border border-black"
                          />
                          <span className="text-sm">
                            Yes{q.asterisk && " *"}
                          </span>
                        </label>
                      </td>
                      <td className="p-2 w-16 text-center align-top">
                        <label className="flex items-center justify-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              !(formData[q.field as keyof FormData] as boolean)
                            }
                            onChange={(e) =>
                              updateFormData(
                                q.field as keyof FormData,
                                !e.target.checked,
                              )
                            }
                            className="w-4 h-4 border border-black"
                          />
                          <span className="text-sm">No</span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border border-black p-4 mb-6">
              <h3 className="font-bold text-center text-lg mb-4">
                Participant Signature
              </h3>
              <p className="mb-3 text-justify">
                <strong>If you answered NO</strong> to all 10 questions above, a
                medical evaluation is not required. Please read and agree to the
                participant statement below by signing and dating it.
              </p>
              <p className="mb-4 text-justify">
                <strong>Participant Statement:</strong> I have answered all
                questions honestly, and understand that I accept responsibility
                for any consequences resulting from any questions I may have
                answered inaccurately or for my failure to disclose any existing
                or past health conditions.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-4">
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                    <input
                      type="text"
                      value={formData.participantSignature}
                      onChange={(e) =>
                        updateFormData("participantSignature", e.target.value)
                      }
                      className="w-full border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Participant Signature (or, if a minor, participant&apos;s
                    parent/guardian signature required)
                  </div>
                </div>
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => updateFormData("date", e.target.value)}
                      className="w-full border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="text-xs text-center">Date (dd/mm/yyyy)</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-4">
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                    <input
                      type="text"
                      value={formData.participantName}
                      onChange={(e) =>
                        updateFormData("participantName", e.target.value)
                      }
                      className="w-full border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Participant Name (Print)
                  </div>
                </div>
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                    <input
                      type="text"
                      value={formData.birthdate}
                      onChange={(e) =>
                        updateFormData("birthdate", e.target.value)
                      }
                      className="w-full border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Birthdate (dd/mm/yyyy)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-4">
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                    <input
                      type="text"
                      value={formData.instructorName}
                      onChange={(e) =>
                        updateFormData("instructorName", e.target.value)
                      }
                      className="w-full border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Instructor Name (Print)
                  </div>
                </div>
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                    <input
                      type="text"
                      value={formData.facilityName}
                      onChange={(e) =>
                        updateFormData("facilityName", e.target.value)
                      }
                      className="w-full border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Facility Name (Print)
                  </div>
                </div>
              </div>

              <p className="text-sm mt-4 text-justify">
                * <strong>If you answered YES</strong> to questions 3, 5 or 10
                above <strong>OR</strong> to any of the questions on page 2,
                please read and agree to the statement above by signing and
                dating it{" "}
                <strong>
                  AND take all three pages of this form (Participant
                  Questionnaire and the Physician&apos;s Evaluation Form) to
                  your physician
                </strong>{" "}
                for a medical evaluation. Participation in a diving course
                requires your physician&apos;s approval.
              </p>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span>Version date: 2022-02-01</span>
              <span>1 of 3</span>
              <span>© 2020</span>
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div
            className="bg-white p-8 font-sans text-sm"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* Page 2 */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[25px] w-64 flex items-end">
                  <input
                    type="text"
                    value={formData.participantName}
                    onChange={(e) =>
                      updateFormData("participantName", e.target.value)
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs">Participant Name (Print)</div>
              </div>
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[25px] w-48 flex items-end">
                  <input
                    type="text"
                    value={formData.birthdate}
                    onChange={(e) =>
                      updateFormData("birthdate", e.target.value)
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs">Birthdate Date (dd/mm/yyyy)</div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">
                Diver Medical | Participant Questionnaire Continued
              </h1>
            </div>

            {/* Boxes A-G with detailed questions */}
            {[
              {
                title: "BOX A – I HAVE/HAVE HAD:",
                questions: [
                  {
                    text: "Chest surgery, heart surgery, heart valve surgery, an implantable medical device (eg, stent, pacemaker, neurostimulator), pneumothorax, and/or chronic lung disease.",
                    field: "boxA1",
                  },
                  {
                    text: "Asthma, wheezing, severe allergies, hay fever or congested airways within the last 12 months that limits my physical activity/exercise.",
                    field: "boxA2",
                  },
                  {
                    text: "A problem or illness involving my heart such as: angina, chest pain on exertion, heart failure, immersion pulmonary edema, heart attack or stroke, OR am taking medication for any heart condition.",
                    field: "boxA3",
                  },
                  {
                    text: "Recurrent bronchitis and currently coughing within the past 12 months, OR have been diagnosed with emphysema.",
                    field: "boxA4",
                  },
                  {
                    text: "Symptoms affecting my lungs, breathing, heart and/or blood in the last 30 days that impair my physical or mental performance.",
                    field: "boxA5",
                  },
                ],
              },
              {
                title: "BOX B – I AM OVER 45 YEARS OF AGE AND:",
                questions: [
                  {
                    text: "I currently smoke or inhale nicotine by other means.",
                    field: "boxB1",
                  },
                  { text: "I have a high cholesterol level.", field: "boxB2" },
                  { text: "I have high blood pressure.", field: "boxB3" },
                  {
                    text: "I have had a close blood relative die suddenly or of cardiac disease or stroke before the age of 50, OR have a family history of heart disease before age 50 (including abnormal heart rhythms, coronary artery disease or cardiomyopathy).",
                    field: "boxB4",
                  },
                ],
              },
              {
                title: "BOX C – I HAVE/HAVE HAD:",
                questions: [
                  {
                    text: "Sinus surgery within the last 6 months.",
                    field: "boxC1",
                  },
                  {
                    text: "Ear disease or ear surgery, hearing loss, or problems with balance.",
                    field: "boxC2",
                  },
                  {
                    text: "Recurrent sinusitis within the past 12 months.",
                    field: "boxC3",
                  },
                  {
                    text: "Eye surgery within the past 3 months.",
                    field: "boxC4",
                  },
                ],
              },
              {
                title: "BOX D – I HAVE/HAVE HAD:",
                questions: [
                  {
                    text: "Head injury with loss of consciousness within the past 5 years.",
                    field: "boxD1",
                  },
                  {
                    text: "Persistent neurologic injury or disease.",
                    field: "boxD2",
                  },
                  {
                    text: "Recurring migraine headaches within the past 12 months, or take medications to prevent them.",
                    field: "boxD3",
                  },
                  {
                    text: "Blackouts or fainting (full/partial loss of consciousness) within the last 5 years.",
                    field: "boxD4",
                  },
                  {
                    text: "Epilepsy, seizures, or convulsions, OR take medications to prevent them.",
                    field: "boxD5",
                  },
                ],
              },
              {
                title: "BOX E – I HAVE/HAVE HAD:",
                questions: [
                  {
                    text: "Behavioral health, mental or psychological problems requiring medical/psychiatric treatment.",
                    field: "boxE1",
                  },
                  {
                    text: "Major depression, suicidal ideation, panic attacks, uncontrolled bipolar disorder requiring medication/psychiatric treatment.",
                    field: "boxE2",
                  },
                  {
                    text: "Been diagnosed with a mental health condition or a learning/developmental disorder that requires ongoing care or special accommodation.",
                    field: "boxE3",
                  },
                  {
                    text: "An addiction to drugs or alcohol requiring treatment within the last 5 years.",
                    field: "boxE4",
                  },
                ],
              },
              {
                title: "BOX F – I HAVE/HAVE HAD:",
                questions: [
                  {
                    text: "Recurrent back problems in the last 6 months that limit my everyday activity.",
                    field: "boxF1",
                  },
                  {
                    text: "Back or spinal surgery within the last 12 months.",
                    field: "boxF2",
                  },
                  {
                    text: "Diabetes, either drug or diet controlled, OR gestational diabetes within the last 12 months.",
                    field: "boxF3",
                  },
                  {
                    text: "An uncorrected hernia that limits my physical abilities.",
                    field: "boxF4",
                  },
                  {
                    text: "Active or untreated ulcers, problem wounds, or ulcer surgery within the last 6 months.",
                    field: "boxF5",
                  },
                ],
              },
              {
                title: "BOX G – I HAVE HAD:",
                questions: [
                  {
                    text: "Ostomy surgery and do not have medical clearance to swim or engage in physical activity.",
                    field: "boxG1",
                  },
                  {
                    text: "Dehydration requiring medical intervention within the last 7 days.",
                    field: "boxG2",
                  },
                  {
                    text: "Active or untreated stomach or intestinal ulcers or ulcer surgery within the last 6 months.",
                    field: "boxG3",
                  },
                  {
                    text: "Frequent heartburn, regurgitation, or gastroesophageal reflux disease (GERD).",
                    field: "boxG4",
                  },
                  {
                    text: "Active or uncontrolled ulcerative colitis or Crohn's disease.",
                    field: "boxG5",
                  },
                  {
                    text: "Bariatric surgery within the last 12 months.",
                    field: "boxG6",
                  },
                ],
              },
            ].map((box, boxIndex) => (
              <div key={boxIndex} className="border border-black mb-4">
                <div className="bg-gray-100 p-2 border-b border-black">
                  <h3 className="font-bold">{box.title}</h3>
                </div>
                <table className="w-full border-collapse">
                  <tbody>
                    {box.questions.map((q, qIndex) => (
                      <tr
                        key={qIndex}
                        className={
                          qIndex < box.questions.length - 1
                            ? "border-b border-black"
                            : ""
                        }
                      >
                        <td className="border-r border-black p-2 text-justify align-top">
                          {q.text}
                        </td>
                        <td className="border-r border-black p-2 w-16 text-center align-top">
                          <label className="flex items-center justify-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                formData[q.field as keyof FormData] as boolean
                              }
                              onChange={(e) =>
                                updateFormData(
                                  q.field as keyof FormData,
                                  e.target.checked,
                                )
                              }
                              className="w-4 h-4 border border-black"
                            />
                            <span className="text-sm">Yes *</span>
                          </label>
                        </td>
                        <td className="p-2 w-16 text-center align-top">
                          <label className="flex items-center justify-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                !(formData[
                                  q.field as keyof FormData
                                ] as boolean)
                              }
                              onChange={(e) =>
                                updateFormData(
                                  q.field as keyof FormData,
                                  !e.target.checked,
                                )
                              }
                              className="w-4 h-4 border border-black"
                            />
                            <span className="text-sm">No</span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <div className="flex justify-between items-center text-xs mt-6">
              <span>
                *Physician&apos;s medical evaluation required (see page 1).
              </span>
              <span>2 of 3</span>
              <span>© 2020</span>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div
            className="bg-white p-8 font-sans text-sm"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* Page 3 */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[25px] w-64 flex items-end">
                  <input
                    type="text"
                    value={formData.participantName}
                    onChange={(e) =>
                      updateFormData("participantName", e.target.value)
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs">Participant Name (Print)</div>
              </div>
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[25px] w-48 flex items-end">
                  <input
                    type="text"
                    value={formData.birthdate}
                    onChange={(e) =>
                      updateFormData("birthdate", e.target.value)
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs">Birthdate Date (dd/mm/yyyy)</div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">
                Diver Medical | Medical Examiner&apos;s Evaluation Form
              </h1>
            </div>

            <div className="mb-6">
              <p className="text-justify mb-4">
                The above-named person requests your opinion of his/her medical
                suitability to participate in recreational scuba diving or
                freediving training or activity. Please visit{" "}
                <strong>uhms.org</strong> for medical guidance on medical
                conditions as they relate to diving. Review the areas relevant
                to your patient as part of your evaluation.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-lg mb-4">Evaluation Result</h2>
              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.evaluationResult === "approved"}
                    onChange={(e) => {
                      if (e.target.checked)
                        updateFormData("evaluationResult", "approved");
                    }}
                    className="w-4 h-4 border border-black mt-1"
                  />
                  <div>
                    <strong>Approved</strong> – I find no conditions that I
                    consider incompatible with recreational scuba diving or
                    freediving.
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.evaluationResult === "not-approved"}
                    onChange={(e) => {
                      if (e.target.checked)
                        updateFormData("evaluationResult", "not-approved");
                    }}
                    className="w-4 h-4 border border-black mt-1"
                  />
                  <div>
                    <strong>Not approved</strong> – I find conditions that I
                    consider incompatible with recreational scuba diving or
                    freediving.
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                  <input
                    type="text"
                    value={formData.medicalExaminerSignature}
                    onChange={(e) =>
                      updateFormData("medicalExaminerSignature", e.target.value)
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs text-center">
                  Signature of certified medical doctor or other legally
                  certified medical provider (Print)
                </div>
              </div>
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                  <input
                    type="text"
                    value={formData.medicalExaminerDate}
                    onChange={(e) =>
                      updateFormData("medicalExaminerDate", e.target.value)
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs text-center">Date (dd/mm/yyyy)</div>
              </div>
            </div>

            {[
              {
                label: "Medical Examiner's Name (Print)",
                field: "medicalExaminerName",
              },
              {
                label: "Clinical Degrees/Credentials",
                field: "medicalExaminerCredentials",
              },
              { label: "Clinic/Hospital", field: "medicalExaminerClinic" },
              { label: "Address", field: "medicalExaminerAddress" },
            ].map((item, index) => (
              <div key={index} className="mb-6">
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                  <input
                    type="text"
                    value={formData[item.field as keyof FormData] as string}
                    onChange={(e) =>
                      updateFormData(
                        item.field as keyof FormData,
                        e.target.value,
                      )
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs text-center">{item.label}</div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                  <input
                    type="text"
                    value={formData.medicalExaminerPhone}
                    onChange={(e) =>
                      updateFormData("medicalExaminerPhone", e.target.value)
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs text-center">Phone</div>
              </div>
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                  <input
                    type="text"
                    value={formData.medicalExaminerEmail}
                    onChange={(e) =>
                      updateFormData("medicalExaminerEmail", e.target.value)
                    }
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs text-center">Email</div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="border-2 border-black w-48 h-32 flex items-center justify-center">
                <span className="text-xs text-gray-500">
                  Physician/Clinic Stamp (optional)
                </span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 text-xs">
              <p className="mb-2">
                Created by the{" "}
                <span className="text-blue-600 underline">
                  Diver Medical Screen Committee
                </span>{" "}
                in association with the following bodies:
              </p>
              <div className="mb-2">
                <div>
                  <strong>The Undersea & Hyperbaric Medical Society</strong>
                </div>
                <div>
                  <strong>DAN (US)</strong>
                </div>
                <div>
                  <strong>DAN Europe</strong>
                </div>
                <div>
                  <strong>
                    Hyperbaric Medicine Division, University of California, San
                    Diego
                  </strong>
                </div>
              </div>
              <div className="flex justify-between">
                <span>3 of 3</span>
                <span>10346 EN</span>
                <span>© DMSC 2020</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              variant="outline"
              className="px-4 py-2 bg-transparent"
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  onClick={() => goToPage(page)}
                  variant={currentPage === page ? "default" : "outline"}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              variant="outline"
              className="px-4 py-2 bg-transparent"
            >
              Next
            </Button>
          </div>

          <Button
            onClick={handleExportPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {/* Export PDF */}
            Submit Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiverMedicalForm;
