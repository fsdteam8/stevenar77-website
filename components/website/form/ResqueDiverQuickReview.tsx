"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useBooking } from "../course/booking-context";
import { useMutation } from "@tanstack/react-query";
import { quickreview } from "@/lib/quickreview";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const loadJsPDF = async () => {
  const { default: jsPDF } = await import("jspdf");
  return jsPDF;
};

const loadHTML2Canvas = async () => {
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas;
};

interface ResqueDiverQuickReviewProps {
  onSubmitSuccess?: () => void;
}

// const ResqueDiverQuickReview = () => {
const ResqueDiverQuickReview: React.FC<ResqueDiverQuickReviewProps> = () => {
const { dispatch } = useBooking();

  const [participantName, setParticipantName] = useState("");
  const [guardianSignature, setGuardianSignature] = useState("");
  const [date, setDate] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const id = session?.user?.id || "";
  const token = session?.accessToken || "";

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
  const questions = [
    {
      id: 1,
      text: "The most common cause of diver emergencies is",
      options: [
        "a. bad weather.",
        "b. malfunctioning gear.",
        "c. unexpected illness.",
        "d. poor judgment.",
      ],
    },
    {
      id: 2,
      text: "It is important to have _________________ available for divers suspected of having decompression sickness, lung overexpansion injuries or near drowning.",
      options: [
        "a. fluids",
        "b. rescue breathing masks",
        "c. emergency oxygen",
        "d. acetic acid",
      ],
    },
    {
      id: 3,
      text: "To help anticipate and prevent problems, you should",
      options: [
        "a. maintain your equipment properly and inspect it before diving.",
        "b. try to think ahead and plan for unexpected situations.",
        "c. not ignore small problems.",
        "d. All of the above.",
      ],
    },
    {
      id: 4,
      text: "A diver who struggles at the surface, does not signal for help, fails to respond to directions and/or rejects the mask and regulator is probably a(n)",
      options: [
        "a. panicked diver.",
        "b. tired diver.",
        "c. unresponsive diver.",
        "d. All of the above.",
      ],
    },
    {
      id: 5,
      text: "In an emergency, ________________ takes priority over _____________.",
      options: [
        "a. the victim's safety, your safety",
        "b. calling for help, your safety",
        "c. your safety, the victim's safety",
        "d. emergency oxygen, CPR",
      ],
    },
    {
      id: 6,
      text: "You can more easily stay out of a panicked diver's grasp if",
      options: [
        "a. you are positioned for a quick reverse.",
        "b. you have a flotation device to extend to the diver.",
        "c. you stop at a safe distance to evaluate the diver's state of mind.",
        "d. All of the above.",
      ],
    },
    {
      id: 7,
      text: "Dry flushed skin that is hot to the touch and has a lack of perspiration are symptoms of",
      options: [
        "a. heat exhaustion",
        "b. heat stroke",
        "c. hypothermia",
        "d. None of the above",
      ],
    },
    {
      id: 8,
      text: "You are looking for a missing diver. You do not believe the missing diver has gone far from where seen last. Only you and your buddy are available to search, and you do not have a line and reel. Most likely you would use a(n) __________ search pattern.",
      options: [
        "a. U-pattern",
        "b. expanding square",
        "c. circular",
        "d. surface-led",
      ],
    },
    {
      id: 9,
      text: "When deciding when and where to remove equipment from the victim and/or yourself, keep in mind that",
      options: [
        "a. it is always better to get rid of everything as soon as possible.",
        "b. it is always easier to leave everything on.",
        "c. the goal is to do what gets the victim to safety and out of the water fastest.",
        "d. you should stop swimming while removing gear.",
      ],
    },
    {
      id: 10,
      text: "You may assume an unresponsive diver would want oxygen. This is called implied consent.",
      options: ["a. True", "b. False"],
    },
    {
      id: 11,
      text: "Before attempting an inwater rescue you should consider whether",
      options: [
        "a. you need to enter the water at all.",
        "b. you have mask, fins and snorkel available.",
        "c. how far away the victim is.",
        "d. All of the above.",
      ],
    },
    {
      id: 12,
      text: "Dive skills that increase your self-rescue abilities include",
      options: [
        "a. good buoyancy control.",
        "b. proper airway control.",
        "c. handling air depletion.",
        "d. All of the above.",
      ],
    },
    {
      id: 13,
      text: "When responding from a boat or the shore to a responsive diver needing help on the surface, the equipment you take may vary, but you will almost always want",
      options: [
        "a. your mask, fins and snorkel.",
        "b. a compass.",
        "c. your weights.",
        "d. All of the above.",
      ],
    },
    {
      id: 14,
      text: "An emergency action plan",
      options: [
        "a. is necessarily detailed and complex.",
        "b. lists the information and steps for handling a diver emergency.",
        "c. eliminates the need to practice rescue skills regularly.",
        "d. All of the above.",
      ],
    },
    {
      id: 15,
      text: "Since it is difficult to determine a heartbeat for an unresponsive, nonbreathing diver while in the water, there's no need to begin rescue breaths.",
      options: ["a. True", "b. False"],
    },
    {
      id: 16,
      text: "You are rescuing an unresponsive, nonbreathing diver at the surface. You estimate it will take 10 minutes to reach the boat. The victim's arms move in response to your initial rescue breaths. You should",
      options: [
        "a. discontinue rescue breaths and tow the victim to the boat as fast as possible.",
        "b. tow the victim to the boat while providing rescue breaths.",
        "c. leave the diver and go for help.",
        "d. None of the above.",
      ],
    },
    {
      id: 17,
      text: "If you suspect a spinal injury, do not attempt to remove the patient's exposure suit, except to carefully cut it off if necessary to prevent overheating.",
      options: ["a. True", "b. False"],
    },
    {
      id: 18,
      text: "For a nonbreathing, injured diver, you would normally provide oxygen using a",
      options: [
        "a. rescue breathing mask with free flow oxygen system.",
        "b. nonresuscitator demand valve system.",
        "c. positive pressure resuscitator system.",
        "d. continuous flow with nonrebreather mask system.",
      ],
    },
    {
      id: 19,
      text: "Leave rewarming of a seriously hypothermic patient to emergency medical professionals.",
      options: ["a. True", "b. False"],
    },
    {
      id: 20,
      text: "If a panicked diver attempts to bolt for the surface, you want to",
      options: [
        "a. stop the ascent entirely.",
        "b. keep clear of the diver.",
        "c. take the diver deeper to compress bubbles.",
        "d. prevent a rapid, breath-held ascent.",
      ],
    },
  ];

  const handleAnswerChange = (
    questionId: number,
    answer: string,
    isChecked: boolean,
  ) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (isChecked) {
        return { ...prev, [questionId]: [...currentAnswers, answer] };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((a) => a !== answer),
        };
      }
    });
  };

  const handleExportPDF = async () => {
    if (!participantName) {
      alert("Please fill in the participant name");
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

      const fileName = `Rescue_Diver_Quick_Review_${participantName
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .trim()}_${new Date().toISOString().split("T")[0]}.pdf`;

      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });

      // Upload to booking context
      handelmutaion.mutate({
        id: id,
        token: token,
        documents: pdfFile,
      });

      // dispatch({ type: "ADD_DOCUMENT", payload: pdfFile });

      alert("PDF created and added to your booking successfully!");
      onSubmitSuccess?.();
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6">
        {/* Export Button */}
        <div className="max-w-6xl mx-auto mb-4 no-print">
          {/* <button
            onClick={handleExportPDF}
            disabled={isGeneratingPDF}
            className={`font-bold py-3 px-6 rounded-lg transition duration-200 w-full ${
              isGeneratingPDF
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isGeneratingPDF ? "Generating PDF..." : "Submit Form"}
          </button> */}
        </div>

        {/* Form Content */}
        <div
          ref={formRef}
          className="print-area max-w-6xl mx-auto bg-white p-10 text-sm leading-relaxed font-serif shadow-lg"
        >
          <div className="flex justify-end">
            <p className="text-xl">Name:</p>{" "}
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Participant Name"
              className="border-b border-black w-46 h-8 px-1 bg-transparent focus:outline-none"
            />{" "}
          </div>
          <div className="flex items-center pb-4">
            <div className="mr-6 flex-shrink-0">
              <Image
                src={"/images/pdf-logo.jpg"}
                alt="Padi logo"
                width={200}
                height={200}
                crossOrigin="anonymous"
              />
            </div>

            <div className="flex-1">
              <div>
                <h1 className="text-center font-bold text-gray-600 tracking-wider text-5xl mb-1">
                  Rescue Diver Course Online
                </h1>
                <h2 className="text-center text-4xl font-semibold tracking-tight mb-4">
                  Quick Review Answer Sheet
                </h2>
                <p className=" capitalize text-gray-700 text-3xl text-center">
                  Directions: Choose the best answer from the choices provided.
                </p>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="ml-10 grid grid-cols-2 gap-x-10 gap-y-6">
            {questions.map((question) => (
              <div key={question.id} className="mb-6">
                <p className="text-lg font-medium mb-3 leading-relaxed">
                  {question.id}. {question.text}
                </p>

                <div className="ml-4 space-y-2">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={`question-${question.id}`}
                        value={option}
                        checked={
                          answers[question.id]?.includes(option) || false
                        }
                        onChange={(e) =>
                          handleAnswerChange(
                            question.id,
                            e.target.value,
                            e.target.checked,
                          )
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className="text-base">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-2 p-6">
            <p className="text-base p-3 mt-4 mb-4">
              <span className="font-bold">eLearner Statement</span>: Any
              questions I answered incorrectly I&apos;ve had explained to me and
              I understand what I missed.
            </p>
            <div className="flex gap-10">
              <div className="flex-5 w-full">
                <div>
                  <label className="block text-center text-sm mb-1">
                    Parent/Guardian Signature (if applicable):
                  </label>
                  <input
                    type="text"
                    value={guardianSignature}
                    onChange={(e) => setGuardianSignature(e.target.value)}
                    placeholder="Parent/Guardian Signature"
                    className="border-b border-black w-full h-8 px-1 bg-transparent focus:outline-none"
                    style={{ fontFamily: "cursive" }}
                  />
                </div>
              </div>
              <div className="flex-2">
                <label className="block text-sm mb-1">Date (DD/MM/YYYY):</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="border-b border-black w-full h-8 px-1 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-4 mt-4 no-print">
          <button
            onClick={handleExportPDF}
            disabled={isGeneratingPDF}
            className={`font-bold py-3 px-6 rounded-lg transition duration-200 w-full ${
              isGeneratingPDF
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isGeneratingPDF ? "Generating PDF..." : "Submit Form"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResqueDiverQuickReview;
function onSubmitSuccess() {
  throw new Error("Function not implemented.");
}

