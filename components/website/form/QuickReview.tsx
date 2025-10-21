"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";
// import { useBooking } from "../course/booking-context";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { quickreview } from "@/lib/quickreview";
import { useSession } from "next-auth/react";

const loadJsPDF = async () => {
  const { default: jsPDF } = await import("jspdf");
  return jsPDF;
};

const loadHTML2Canvas = async () => {
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas;
};


interface QuickReviewProps {
  onSubmitSuccess?: () => void;
}

// const QuickReview = () => {
const QuickReview: React.FC<QuickReviewProps> = () => {
  // const { dispatch } = useBooking();

  const [studentName, setStudentName] = useState("");
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [oxygenLimit, setOxygenLimit] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      id: 1,
      text: "If you begin to near an oxygen limit or a no decompression limit displayed on your computer, you should",
      options: [
        "a. ascend until your computer displays a longer limit and stay that shallow or shallower.",
        "b. rapidly ascend and abort the dive.",
        "c. keep a close eye on your computer and be sure you ascend exactly at the limit.",
        "d. None of the above.",
      ],
    },
    {
      id: 2,
      text: "The maximum oxygen partial pressure limit is ______ ata/bar.",
      isInput: true,
    },
    {
      id: 3,
      text: "The primary hazard of exceeding oxygen exposure limits is drowning due to central nervous system (CNS) oxygen toxicity.",
      options: ["a. True", "b. False"],
    },
    {
      id: 4,
      text: "If you experience any symptoms of oxygen toxicity you should",
      options: [
        "a. ascend until you feel better.",
        "b. shorten the dive by ten minutes.",
        "c. make a rapid [30 metres/100 feet per minute or faster] ascent.",
        "d. end the dive immediately by making a normal ascent.",
      ],
    },
    {
      id: 5,
      text: "You do not dive an enriched air cylinder unless you have personally verified the analysis of its contents.",
      options: ["a. True", "b. False"],
    },
    {
      id: 6,
      text: "Guidelines to apply when diving with an enriched air computer include",
      options: [
        "a. staying well within computer limits.",
        "b. using the maximum depth warning as a secondary alert.",
        "c. that each diver needs an individual dive computer.",
        "d. All of the above.",
      ],
    },
    {
      id: 7,
      text: "If a diver convulses underwater, you should",
      options: [
        "a. hold the regulator in the mouth if it is there.",
        "b. get the diver to the surface and check for breathing.",
        "c. get the diver to the boat or shore as quickly as possible.",
        "d. All of the above.",
      ],
    },
    {
      id: 8,
      text: "By using your computer's scroll mode or other display, or with the table in the PADI Enriched Air Diver Manual, you should determine and note",
      options: [
        "a. the amount of oxygen in the blend.",
        "b. the no stop limit for 40 metres/130 feet.",
        "c. the deepest depth you can reach without exceeding 1.4.",
        "d. All of the above.",
      ],
    },
    {
      id: 9,
      text: "Warning signs and symptoms of a CNS convulsion, if they occur, may include",
      options: [
        "a. visual disturbances.",
        "b. limb and joint pain.",
        "c. heart burn.",
        "d. All of the above.",
      ],
    },
    {
      id: 10,
      text: "The primary concerns of filling an enriched air cylinder are fire/explosion hazard and",
      options: [
        "a. percentage of oxygen in the blend.",
        "b. adjusting the maximum depth.",
        "c. finding proper equipment for analysis.",
        "d. transporting the cylinder to the dive site.",
      ],
    },
  ];

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // const handleExportPDF = async () => {
  //   if (!studentName || !signature || !date) {
  //     alert("Please fill in required fields: Name, Signature, and Date")
  //     return
  //   }

  //   setIsGeneratingPDF(true)

  //   try {
  //     if (!formRef.current) throw new Error("Form reference not found")

  //     console.log("Generating PDF...")
  //     const html2canvas = await loadHTML2Canvas()

  //     const canvas = await html2canvas(formRef.current, {
  //       scale: 1,
  //       useCORS: true,
  //       allowTaint: true,
  //       backgroundColor: "#ffffff",
  //       logging: false,
  //       ignoreElements: (element) => {
  //         return element.classList.contains("no-print") ||
  //                !!(element.tagName === "IMG" && element.getAttribute("src")?.startsWith("http"))
  //       },
  //       onclone: (clonedDoc) => {
  //         const allEls = clonedDoc.querySelectorAll("*")
  //         allEls.forEach((el) => {
  //           const htmlEl = el as HTMLElement
  //           if (htmlEl.style) {
  //             const props = ['color', 'backgroundColor', 'borderColor']
  //             props.forEach(prop => {
  //               const value = htmlEl.style.getPropertyValue(prop)
  //               if (value && value.includes('lab')) {
  //                 htmlEl.style.setProperty(prop, 'rgb(0, 0, 0)', 'important')
  //               }
  //             })

  //             if (!htmlEl.style.color || htmlEl.style.color.includes('lab')) {
  //               htmlEl.style.color = "rgb(0, 0, 0)"
  //             }
  //             if (htmlEl.tagName !== "INPUT" && (!htmlEl.style.backgroundColor || htmlEl.style.backgroundColor.includes('lab'))) {
  //               htmlEl.style.backgroundColor = "rgb(255, 255, 255)"
  //             }
  //             if (!htmlEl.style.borderColor || htmlEl.style.borderColor.includes('lab')) {
  //               htmlEl.style.borderColor = "rgb(0, 0, 0)"
  //             }

  //             htmlEl.style.removeProperty("filter")
  //             htmlEl.style.removeProperty("backdrop-filter")
  //             htmlEl.style.removeProperty("box-shadow")
  //           }
  //         })
  //       },
  //     })

  //     const imgData = canvas.toDataURL("image/jpeg", 0.75)
  //     const jsPDF = await loadJsPDF()
  //     const pdf = new jsPDF("p", "mm", "a4")
  //     const pageWidth = pdf.internal.pageSize.getWidth()
  //     const imgProps = pdf.getImageProperties(imgData)
  //     const pdfHeight = (imgProps.height * pageWidth) / imgProps.width

  //     pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pdfHeight)

  //     const pdfBlob = pdf.output("blob")
  //     const fileSizeMB = pdfBlob.size / 1024 / 1024

  //     console.log(`PDF generated: ${fileSizeMB.toFixed(2)}MB`)

  //     const fileName = `PADI_Quick_Review_${studentName
  //       .replace(/[^a-zA-Z0-9\s]/g, "")
  //       .replace(/\s+/g, "_")
  //       .trim()}_${new Date().toISOString().split("T")[0]}.pdf`

  //     const pdfFile = new File([pdfBlob], fileName, {
  //       type: "application/pdf"
  //     })

  //     dispatch({ type: "ADD_DOCUMENT", payload: pdfFile })

  //     alert("PDF created and added to your booking successfully!")

  //   } catch (error: unknown) {
  //     console.error("Error generating PDF:", error)
  //     alert("PDF generation failed. Please try again.")
  //   } finally {
  //     setIsGeneratingPDF(false)
  //   }
  // }
  const { data: session } = useSession();
  const id = session?.user?.id || '';
  const token = session?.accessToken || '';

  const handelmutaion = useMutation({
    mutationFn: async ({
      id,
      documents,
      token,
    }: {
      id: string;
      documents: File;
      token: string;
    }) => quickreview(id, token, documents),
    onSuccess: (data) => {
      console.log("Upload successful:", data);
      toast.success("PDF uploaded successfully!");
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      toast.error("Failed to upload PDF.");
    },
  });

  const handleExportPDF = async () => {
    if (!studentName || !signature || !date) {
      alert("Please fill in required fields: Name, Signature, and Date");
      return;
    }

    setIsGeneratingPDF(true);

    try {
      if (!formRef.current) throw new Error("Form reference not found");

      console.log("Generating PDF...");
      const html2canvas = await loadHTML2Canvas();

      const canvas = await html2canvas(formRef.current, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        ignoreElements: (element) => {
          return (
            element.classList.contains("no-print") ||
            !!(
              element.tagName === "IMG" &&
              element.getAttribute("src")?.startsWith("http")
            )
          );
        },
        onclone: (clonedDoc) => {
          const allEls = clonedDoc.querySelectorAll("*");
          allEls.forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.style) {
              const props = ["color", "backgroundColor", "borderColor"];
              props.forEach((prop) => {
                const value = htmlEl.style.getPropertyValue(prop);
                if (value && value.includes("lab")) {
                  htmlEl.style.setProperty(prop, "rgb(0, 0, 0)", "important");
                }
              });

              if (!htmlEl.style.color || htmlEl.style.color.includes("lab")) {
                htmlEl.style.color = "rgb(0, 0, 0)";
              }
              if (
                htmlEl.tagName !== "INPUT" &&
                (!htmlEl.style.backgroundColor ||
                  htmlEl.style.backgroundColor.includes("lab"))
              ) {
                htmlEl.style.backgroundColor = "rgb(255, 255, 255)";
              }
              if (
                !htmlEl.style.borderColor ||
                htmlEl.style.borderColor.includes("lab")
              ) {
                htmlEl.style.borderColor = "rgb(0, 0, 0)";
              }

              htmlEl.style.removeProperty("filter");
              htmlEl.style.removeProperty("backdrop-filter");
              htmlEl.style.removeProperty("box-shadow");
            }
          });
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.75);
      const jsPDF = await loadJsPDF();
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");
      const fileSizeMB = pdfBlob.size / 1024 / 1024;

      console.log(`PDF generated: ${fileSizeMB.toFixed(2)}MB`);

      const fileName = `PADI_Quick_Review_${studentName
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .trim()}_${new Date().toISOString().split("T")[0]}.pdf`;

      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });
      console.log("pdf file ", pdfFile);

      // api mutation
      handelmutaion.mutate({
        id: id,
        token: token,
        documents: pdfFile,
      });

      // dispatch({ type: "ADD_DOCUMENT", payload: pdfFile });
      

      toast.success("PDF created and added to your booking successfully!");
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      toast.error("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 px-4">
      <div
        ref={formRef}
        className="print-area max-w-4xl mx-auto bg-card shadow-xl rounded-lg overflow-hidden"
      >
        {/* Form Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {/* Logo and Title Section */}
          <div className="bg-white py-6 px-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/images/standard.png"
                  alt="PADI Logo"
                  className="w-10 h-10 object-contain"
                  width={100}
                  height={100}
                  crossOrigin="anonymous"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  PADI Enriched Air Diver Course
                </h1>
                <h2 className="text-xl font-semibold">Quick Review</h2>
              </div>
            </div>
          </div>

          <div className="px-6 lg:px-8 py-8">
            {/* Name Field */}
            <div className="mb-8 flex items-center gap-3 border-b border-gray-200 pb-4">
              <span className="text-sm font-bold">Name:</span>
              <div className="flex-1 border-b-2 border-gray-400">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="________________________"
                  className="border-0 bg-transparent px-2 py-1 w-full text-sm focus:outline-none"
                />
              </div>
            </div>

            <p className="mb-6 text-sm font-bold text-gray-700 bg-gray-100 p-3 rounded">
              Directions: Choose the best answer from the choices provided.
            </p>

            {/* Questions */}
            <div className="space-y-8">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <p className="text-sm font-medium mb-4 leading-relaxed">
                    <span className="font-bold">{question.id}.</span>{" "}
                    {question.text}
                  </p>

                  {question.isInput ? (
                    <div className="ml-6 flex items-center gap-2">
                      <div className="border-b-2 border-gray-400 w-20">
                        <input
                          type="text"
                          value={question.id === 2 ? oxygenLimit : ""}
                          onChange={(e) =>
                            question.id === 2 && setOxygenLimit(e.target.value)
                          }
                          placeholder="______"
                          className="border-0 bg-transparent px-2 py-1 w-full text-sm focus:outline-none text-center font-bold"
                        />
                      </div>
                      <span className="text-sm">ata/bar</span>
                    </div>
                  ) : (
                    <div className="ml-6 space-y-2">
                      {question.options?.map((option) => (
                        <label
                          key={option}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <div className="flex items-center justify-center w-4 h-4 border border-gray-400 rounded-sm mt-0.5">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={(e) =>
                                handleAnswerChange(question.id, e.target.value)
                              }
                              className="opacity-0 absolute"
                            />
                            {answers[question.id] === option && (
                              <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                            )}
                          </div>
                          <span
                            className={`text-sm ${answers[question.id] === option ? "font-bold text-blue-700" : "text-gray-700"}`}
                          >
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Student Statement */}
            <div className="mt-10 p-6 bg-gray-100 rounded-lg border border-gray-300">
              <p className="text-sm font-bold mb-4 text-gray-800">
                Student Statement:
              </p>
              <p className="text-sm italic mb-6 text-gray-700 leading-relaxed">
                &quot;Any questions I answered incorrectly I&apos;ve had
                explained to me and I understand what I missed.&quot;
              </p>

              {/* Signature and Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold whitespace-nowrap">
                      Signature:
                    </span>
                    <div className="flex-1 border-b-2 border-gray-400">
                      <input
                        type="text"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="________________________"
                        className="border-0 bg-transparent w-full text-sm focus:outline-none"
                        style={{ fontFamily: "cursive" }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold whitespace-nowrap">
                      Date:
                    </span>
                    <div className="flex-1 border-b-2 border-gray-400">
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border-0 bg-transparent w-full text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-300 text-center">
              <p className="text-xs text-gray-500">435DT (5/09) Version 1.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="max-w-4xl mx-auto mt-6 mb-6 no-print">
        <Button
          onClick={handleExportPDF}
          disabled={isGeneratingPDF}
          className={`font-semibold py-3 px-6 rounded-lg transition duration-200 w-full ${
            isGeneratingPDF
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isGeneratingPDF ? "Generating PDF..." : "Submit Form"}
        </Button>
      </div>
    </div>
  );
};

export default QuickReview;
