"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useFormStore } from "@/store/formStore";

const loadHTML2Canvas = async () => {
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas;
};

const loadJsPDF = async () => {
  const { default: jsPDF } = await import("jspdf");
  return jsPDF;
};

interface StandardsFormProps {
  cartId: string;
  formTitle: string;
  onSubmitSuccess?: () => void;
}

const StandardsForm: React.FC<StandardsFormProps> = ({
  cartId,
  formTitle,
  onSubmitSuccess,
}) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  };

  const [participantName, setParticipantName] = useState("");
  const [participantSignature, setParticipantSignature] = useState("");
  const [participantDate, setParticipantDate] = useState(getCurrentDate());
  const [guardianSignature, setGuardianSignature] = useState("");
  const [guardianDate, setGuardianDate] = useState(getCurrentDate());
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Track which fields have errors
  const [errors, setErrors] = useState({
    participantName: false,
    participantSignature: false,
    participantDate: false,
  });

  const formRef = useRef<HTMLDivElement>(null);

  // ... inside component ...

  // ... inside component ...

  const store = useFormStore();

  const handleExportPDF = async () => {
    const newErrors = {
      participantName: !participantName.trim(),
      participantSignature: !participantSignature.trim(),
      participantDate: !participantDate,
    };

    setErrors(newErrors);

    const missingFields = Object.entries(newErrors)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    setIsGeneratingPDF(true);

    try {
      if (!formRef.current) throw new Error("Form reference not found");

      const html2canvas = await loadHTML2Canvas();
      const canvas = await html2canvas(formRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: formRef.current.scrollWidth,
        height: formRef.current.scrollHeight,
        ignoreElements: (el) => el.classList.contains("no-print"),
        onclone: (clonedDoc) => {
          try {
            const allEls = clonedDoc.querySelectorAll("*");
            allEls.forEach((el) => {
              const htmlEl = el as HTMLElement;
              if (htmlEl.style) {
                // Check computed styles for lab colors
                const computedStyle =
                  clonedDoc.defaultView?.getComputedStyle(htmlEl);
                if (computedStyle) {
                  const colorProps = [
                    "color",
                    "backgroundColor",
                    "borderColor",
                    "borderTopColor",
                  ];
                  colorProps.forEach((prop) => {
                    const computedValue = computedStyle.getPropertyValue(prop);
                    if (computedValue && computedValue.includes("lab")) {
                      const replacement = prop.includes("background")
                        ? "rgb(255, 255, 255)"
                        : "rgb(0, 0, 0)";
                      htmlEl.style.setProperty(prop, replacement, "important");
                    }
                  });
                }

                // Check inline styles
                const props = ["color", "backgroundColor", "borderColor"];
                props.forEach((prop) => {
                  const value = htmlEl.style.getPropertyValue(prop);
                  if (value && value.includes("lab")) {
                    const replacement =
                      prop === "backgroundColor"
                        ? "rgb(255, 255, 255)"
                        : "rgb(0, 0, 0)";
                    htmlEl.style.setProperty(prop, replacement, "important");
                  }
                });

                // Set defaults
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
          } catch (e) {
            console.warn("Color sanitization warning:", e);
          }
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const jsPDF = await loadJsPDF();
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);

      const fileName = `PADI_Standards_Form_${participantName.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;

      const pdfBlob = pdf.output("blob");
      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });

      // Save to store
      store.setFormCompleted(cartId, formTitle, pdfFile);

      toast.success("PDF generated successfully!");
      onSubmitSuccess?.();
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      toast.error(
        `Failed to generate PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 px-4">
      {/* Form Content - Professional PADI Design */}
      <div
        ref={formRef}
        className="print-area mx-auto bg-card shadow-xl rounded-lg overflow-hidden"
      >
        {/* Header with Logo and Title */}
        <div className="flex flex-col lg:flex-row items-start p-6 lg:p-8 gap-6">
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center">
              <Image
                src="/images/standard.png"
                alt="Padi logo"
                width={100}
                height={100}
                crossOrigin="anonymous"
              />
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-foreground text-background px-4 py-3 mb-4 rounded-sm">
              <h1 className="text-lg lg:text-xl font-bold text-center leading-tight">
                Standard Safe Diving Practices Statement of Understanding
              </h1>
            </div>
            <p className="text-sm font-semibold text-center lg:text-left">
              Please read carefully before signing.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 lg:px-8 pb-8">
          <p className="mb-6 text-sm leading-relaxed text-justify">
            This is a statement in which you are informed of the established
            safe diving practices for skin and scuba diving. These practices
            have been compiled for your review and acknowledgement and are
            intended to increase your comfort and safety in diving. Your
            signature on this statement is required as proof that you are aware
            of these safe diving practices. Read and discuss the statement prior
            to signing it. If you are a minor, this form must also be signed by
            a parent or guardian.
          </p>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm">I,</span>
            <input
              type="text"
              value={participantName}
              onChange={(e) => {
                setParticipantName(e.target.value);
                if (errors.participantName && e.target.value.trim()) {
                  setErrors({ ...errors, participantName: false });
                }
              }}
              placeholder="Print Name"
              className={`border-0 border-b-2 h-12 border-red-500 ${errors.participantName ? "border-red-500 bg-red-50" : "border-black"} bg-transparent px-2 py-1 min-w-0 flex-1 max-w-xs text-sm focus:outline-none focus:border-blue-600`}
            />
            <span className="text-sm">
              , understand that as a diver I should:
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:gap-8 mb-8">
            <div>
              <ol className="list-decimal ml-5 space-y-4 text-sm leading-relaxed text-justify">
                <li>
                  Maintain good mental and physical fitness for diving. Avoid
                  being under the influence of alcohol or dangerous drugs when
                  diving. Keep proficient in diving skills, striving to increase
                  them through continuing education and reviewing them in
                  controlled conditions after a period of diving inactivity, and
                  refer to my course materials to stay current and refresh
                  myself on important information.
                </li>
                <li>
                  Be familiar with my dive sites. If not, obtain a formal diving
                  orientation from a knowledgeable, local source. If diving
                  conditions are worse than those in which I am experienced,
                  postpone diving or select an alternate site with better
                  conditions. Engage only in diving activities consistent with
                  my training and experience. Do not engage in cave or technical
                  diving unless specifically trained to do so.
                </li>
                <li>
                  Use complete, well-maintained, reliable equipment with which I
                  am familiar; and inspect it for correct fit and function prior
                  to each dive. Have a buoyancy control device, low-pressure
                  buoyancy control inflation system, submersible pressure gauge
                  and alternate air source and dive planning/monitoring device
                  (dive computer, RDP/dive tables—whichever you are trained to
                  use) when scuba diving. Deny use of my equipment to
                  uncertified divers.
                </li>
                <li>
                  Listen carefully to dive briefings and directions and respect
                  the advice of those supervising my diving activities.
                  Recognize that additional training is recommended for
                  participation in specialty diving activities, in other
                  geographic areas and after periods of inactivity that exceed
                  six months.
                </li>
                <li>
                  Adhere to the buddy system throughout every dive. Plan dives –
                  including communications, procedures for reuniting in case of
                  separation and emergency procedures – with my buddy.
                </li>
              </ol>
            </div>

            <div>
              <ol
                className="list-decimal ml-5 space-y-4 text-sm leading-relaxed text-justify"
                start={6}
              >
                <li>
                  Be proficient in dive planning (dive computer or dive table
                  use). Make all dives no decompression dives and allow a margin
                  of safety. Have a means to monitor depth and time underwater.
                  Limit maximum depth to my level of training and experience.
                  Ascend at a rate of not more than 18 metres/60 feet per
                  minute. Be a SAFE diver –{" "}
                  <strong>Slowly Ascend From Every dive</strong>. Make a safety
                  stop as an added precaution, usually at 5 metres/15 feet for
                  three minutes or longer.
                </li>
                <li>
                  Maintain proper buoyancy. Adjust weighting at the surface for
                  neutral buoyancy with no air in my buoyancy control device.
                  Maintain neutral buoyancy while underwater. Be buoyant for
                  surface swimming and resting. Have weights clear for easy
                  removal, and establish buoyancy when in distress while diving.
                  Carry at least one surface signaling device (such as signal
                  tube, whistle, mirror).
                </li>
                <li>
                  Breathe properly for diving. Never breath-hold or skip-breathe
                  when breathing compressed air, and avoid excessive
                  hyperventilation when breath-hold diving. Avoid overexertion
                  while in and underwater and dive within my limitations.
                </li>
                <li>
                  Use a boat, float or other surface support station, whenever
                  feasible.
                </li>
                <li>
                  Know and obey local dive laws and regulations, including fish
                  and game and dive flag laws.
                </li>
              </ol>
            </div>
          </div>

          <p className="mb-8 text-sm leading-relaxed font-medium text-justify">
            I understand the importance and purposes of these established
            practices. I recognize they are for my own safety and well-being,
            and that failure to adhere to them can place me in jeopardy when
            diving.
          </p>

          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={participantSignature}
                  onChange={(e) => {
                    setParticipantSignature(e.target.value);
                    if (errors.participantSignature && e.target.value.trim()) {
                      setErrors({ ...errors, participantSignature: false });
                    }
                  }}
                  placeholder="Type your signature here"
                  className={`border-0 border-b-2 h-12 border-red-500 ${errors.participantSignature ? "border-red-500 bg-red-50" : "border-black"} bg-transparent w-full text-lg font-cursive italic focus:outline-none focus:border-blue-600 pb-2`}
                  style={{ fontFamily: "cursive" }}
                />
                <p className="text-xs mt-2 font-medium">
                  Participant&apos;s Signature
                </p>
              </div>
              <div>
                <input
                  type="text"
                  value={participantDate}
                  onChange={(e) => {
                    setParticipantDate(e.target.value);
                    if (errors.participantDate && e.target.value) {
                      setErrors({ ...errors, participantDate: false });
                    }
                  }}
                  className={`border-0 border-b-2 h-12 border-red-500 ${errors.participantDate ? "border-red-500 bg-red-50" : "border-black"} bg-transparent w-full text-sm focus:outline-none focus:border-blue-600 pb-1 cursor-not-allowed`}
                />
                <p className="text-xs mt-2 text-center font-medium">
                  Date (Day/Month/Year)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={guardianSignature}
                  onChange={(e) => setGuardianSignature(e.target.value)}
                  placeholder="Type guardian signature here (if applicable)"
                  className="border-0 border-b-2 h-12 border-black bg-transparent w-full text-lg font-cursive italic focus:outline-none focus:border-blue-600 pb-2"
                  style={{ fontFamily: "cursive" }}
                />
                <p className="text-xs mt-2 font-medium">
                  Signature of Parent or Guardian (where applicable)
                </p>
              </div>
              <div>
                <input
                  type="text"
                  value={guardianDate}
                  onChange={(e) => setGuardianDate(e.target.value)}
                  className="border-0 border-b-2 h-12 border-black bg-transparent w-full text-sm focus:outline-none focus:border-blue-600 pb-1 cursor-not-allowed"
                />
                <p className="text-xs mt-2 text-center font-medium">
                  Date (Day/Month/Year)
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-600 text-center">
            Product No. 10060 (Rev. 06/15) Version 2.01 © PADI 2015
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mx-auto max-w-4xl mb-6 no-print mt-6">
        <Button
          onClick={handleExportPDF}
          disabled={isGeneratingPDF}
          className={`font-semibold bg-primary py-3 px-6 rounded-lg transition duration-200 w-full ${
            isGeneratingPDF
              ? "bg-muted cursor-not-allowed text-muted-foreground"
              : "bg-primary hover:bg-emerald/90 text-accent-foreground shadow-md  "
          }`}
        >
          {isGeneratingPDF ? "Generating PDF..." : "Submit Form"}
        </Button>
      </div>
    </div>
  );
};

export default StandardsForm;
