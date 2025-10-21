"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { useBooking } from "../course/booking-context"; //  Add this
// import { quickreview } from "@/lib/quickreview";
// import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// import { useSession } from "next-auth/react";

const loadHTML2Canvas = async () => {
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas;
};

interface EnrichedAirFormProps {
  onSubmitSuccess?: () => void;
}

// const EnrichedAirForm = () => {

const EnrichedAirForm: React.FC<EnrichedAirFormProps> = ({
  onSubmitSuccess,
}) => {
  const { dispatch } = useBooking(); // ✅ Add this

  const [participantName, setParticipantName] = useState("");
  const [participantSignature, setParticipantSignature] = useState("");
  const [participantDate, setParticipantDate] = useState("");
  const [guardianSignature, setGuardianSignature] = useState("");
  const [guardianDate, setGuardianDate] = useState("");
  const [storeResort, setStoreResort] = useState("");
  const [hasInsurance, setHasInsurance] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const formRef = useRef<HTMLDivElement>(null); // ✅ Add this

  const handleExportPDF = async () => {
    if (
      !participantName ||
      !participantSignature ||
      !participantDate ||
      !storeResort
    ) {
      alert(
        "Please fill in required fields: Participant Name, Store/Resort, Signature, and Date",
      );
      return;
    }

    setIsGeneratingPDF(true);

    try {
      if (!formRef.current) throw new Error("Form reference not found");

      console.log("Generating PDF...");
      const html2canvas = await loadHTML2Canvas();

      const canvas = await html2canvas(formRef.current, {
        scale: 1, // ✅ Reduced from 2
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

      const imgData = canvas.toDataURL("image/jpeg", 0.75); // ✅ JPEG at 75%
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pdfHeight); // ✅ JPEG format

      const pdfBlob = pdf.output("blob");
      const fileSizeMB = pdfBlob.size / 1024 / 1024;

      console.log(`PDF generated: ${fileSizeMB.toFixed(2)}MB`);

      const fileName = `PADI_Enriched_Air_Form_${participantName
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .trim()}_${new Date().toISOString().split("T")[0]}.pdf`;

      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });

      //  Add to booking context
      // handelmutaion.mutate({
      //   id: id,
      //   token: token,
      //   documents: pdfFile,
      // });

      // alert("PDF created and added to your booking successfully!");
      dispatch({ type: "ADD_DOCUMENT", payload: { file: pdfFile, label: "Enriched Training" } });
      onSubmitSuccess?.();
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      toast.error("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 px-4">
      {/* Form Content */}
      <div
        ref={formRef} // ✅ Add ref
        className="print-area max-w-4xl mx-auto bg-card shadow-xl rounded-lg overflow-hidden"
      >
        {/* Header with Logo and Title */}
        <div className="flex flex-col lg:flex-row items-start p-6 lg:p-8 gap-6">
          <div className=" mx-auto lg:mx-0">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center">
              <Image
                src="/images/trainning.png"
                alt="PADI logo"
                width={100}
                height={100}
                crossOrigin="anonymous"
              />
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="text-center lg:text-left mb-4">
              <div className=" px-4 py-3 mb-4 rounded-sm">
                <h2 className="text-lg lg:text-xl font-bold text-center leading-tight">
                  Release of Liability/Assumption of Risk/Non-agency
                  Acknowledgment Form
                </h2>
                <h3 className="text-base font-bold text-center mt-2">
                  ENRICHED AIR (NITROX) DIVER TRAINING
                </h3>
              </div>
            </div>
            <p className="text-sm font-semibold text-center lg:text-left">
              Please read carefully and fill in all blanks before signing.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 lg:px-8 pb-8">
          {/* Store/Resort Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Store/Resort:
            </label>
            <input
              type="text"
              value={storeResort}
              onChange={(e) => setStoreResort(e.target.value)}
              placeholder="Enter store/resort name"
              className="border-0 border-b-2 border-black bg-transparent w-full text-sm focus:outline-none focus:border-blue-600 pb-1"
              required
            />
          </div>

          {/* Non-Agency Disclosure */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">
              Non-Agency Disclosure and Acknowledgment Agreement
            </h3>
            <p className="text-sm leading-relaxed text-justify mb-4">
              I understand and agree that PADI Members (&quot;Members&quot;),
              including{" "}
              <span className="font-medium">
                {storeResort || "_________________"}
              </span>{" "}
              and/or any individual PADI Instructors and Divemasters associated
              with the program in which I am participating, are licensed to use
              various PADI Trademarks and to conduct PADI training, but are not
              agents, employees or franchisees of PADI Americas, Inc, or its
              parent, subsidiary and affiliated corporations &quot;PADI&quot;. I
              further understand that Member business activities are
              independent, and are neither owned nor operated by PADI, and that
              while PADI establishes the standards for PADI diver training
              programs, it is not responsible for, nor does it have the right to
              control, the operation of the Members&apos; business activities
              and the day-to-day conduct of PADI programs and supervision of
              divers by the Members or their associated staff. I further
              understand and agree on behalf of myself, my heirs and my estate
              that in the event of an injury or death during this activity,
              neither I nor my estate shall seek to hold PADI liable for the
              actions, inactions or negligence of{" "}
              <span className="font-medium">
                {storeResort || "_________________"}
              </span>{" "}
              and/or the instructors and divemasters associated with the
              activity.
            </p>
          </div>

          {/* Liability Release */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">
              Liability Release and Assumption of Risk Agreement
            </h3>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm">I,</span>
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Participant Name"
                className="border-0 border-b-2 border-black bg-transparent px-2 py-1 min-w-0 flex-1 max-w-xs text-sm focus:outline-none focus:border-blue-600"
                required
              />
              <span className="text-sm">
                , hereby affirm that I am aware that scuba diving has inherent
                risks which may result in serious injury or death, and am aware
                of the particular hazards of scuba diving with oxygen enriched
                air.
              </span>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-justify">
              <p>
                I understand that diving with compressed air involves certain
                inherent risks; including but not limited to decompression
                sickness, embolism or other hyperbaric/air expansion injury that
                require treatment in a recompression chamber. I also understand
                that diving with oxygen enriched air (&quot;Enriched Air&quot;)
                involves inherent risks of oxygen toxicity and/or improper
                mixtures of breathing gas. I further understand that the open
                water diving trips which are necessary for training and for
                certification may be conducted at a site that is remote, either
                by time or distance or both, from such a recompression chamber.
                I still choose to proceed with such instructional dives in spite
                of the possible absence of a recompression chamber in proximity
                to the dive site.
              </p>

              <p>
                I understand and agree that neither my instructor(s), the
                facility through which I receive my instruction,{" "}
                <span className="font-medium">
                  {storeResort || "_________________"}
                </span>
                , nor PADI Americas, Inc., nor its affiliate and subsidiary
                corporations, nor any of their respective employees, officers,
                agents, contractors or assigns (hereinafter referred to as
                &quot;Released Parties,&quot;) may be held liable or responsible
                in any way for any injury, death or other damages to me, my
                family, estate, heirs or assigns that may occur as a result of
                my participation in this diving program or as a result of the
                negligence of any party, including the Released Parties, whether
                passive or active.
              </p>

              <p>
                In consideration of being allowed to participate in this course,
                I hereby personally assume all risks of this program, whether
                foreseen or unforeseen, that may befall me while I am a
                participant in this program including all risks connected
                therewith, whether foreseen or unforeseen.
              </p>

              <p>
                I further release, exempt and hold harmless said course and
                Released Parties from any claim or lawsuit by me, my family,
                estate, heirs or assigns, arising out of my enrollment and
                participation in this course including both claims arising
                during the course or after I receive my certification.
              </p>

              <p>
                I also understand that scuba diving is a physically strenuous
                activity and that I will be exerting myself during this course,
                and that if I am injured as a result of heart attack, panic,
                hyperventilation, drowning or any other cause, that I expressly
                assume the risk of said injuries and that I will not hold the
                Released Parties responsible for the same.
              </p>

              <p>
                I will inspect all of my equipment prior to the activities and
                will notify the Released Parties if any of my equipment is not
                working properly. I will not hold the Released Parties
                responsible for my failure to inspect my equipment prior to
                diving.
              </p>

              <p>
                I further state that I am of lawful age and legally competent to
                sign this liability release, or that I have acquired the written
                consent of my parent or guardian.
              </p>

              <p>
                I understand the terms herein are contractual and not a mere
                recital, and that I have signed this Agreement of my own free
                act and with the knowledge that I hereby agree to waive my legal
                rights. I further agree that if any provision of this Agreement
                is found to be unenforceable or invalid, that provision shall be
                severed from this Agreement. The remainder of this Agreement
                will then be construed as though the unenforceable provision had
                never been contained herein.
              </p>
            </div>
          </div>

          {/* Final Agreement Section */}
          <div className="mb-8 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-4 text-sm leading-relaxed text-justify">
              <p className="font-medium">
                I understand and agree that I am not only giving up my right to
                sue the Released Parties but also any rights my heirs, assigns,
                or beneficiaries may have to sue the Released Parties resulting
                from my death. I further represent I have the authority to do so
                and that my heirs, assigns, or beneficiaries will be estopped
                from claiming otherwise because of my representations to the
                Released Parties.
              </p>

              <p className="font-bold uppercase">
                I,{" "}
                <span className="underline">
                  {participantName || "_________________"}
                </span>
                , BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE MY INSTRUCTORS,
                THE FACILITY THROUGH WHICH I RECEIVE MY INSTRUCTION,{" "}
                <span className="underline">
                  {storeResort || "_________________"}
                </span>
                , AND PADI AMERICAS, INC., AND ALL RELATED ENTITIES AS DEFINED
                ABOVE, FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR
                PERSONAL INJURY, PROPERTY DAMAGE OR WRONGFUL DEATH, HOWEVER
                CAUSED, INCLUDING BUT NOT LIMITED TO THE NEGLIGENCE OF THE
                RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE.
              </p>

              <p className="font-bold uppercase">
                I HAVE FULLY INFORMED MYSELF AND MY HEIRS OF THE CONTENTS OF
                THIS NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT AND
                LIABILITY RELEASE AND ASSUMPTION OF RISK AGREEMENT BY READING
                BOTH BEFORE SIGNING BELOW ON BEHALF OF MYSELF AND MY HEIRS.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="space-y-8">
            {/* Participant Name Print */}
            <div>
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Participant Name (PLEASE PRINT)"
                className="border-0 border-b-2 border-black bg-transparent w-full text-lg focus:outline-none focus:border-blue-600 pb-2"
                required
              />
              <p className="text-xs mt-2 font-medium">
                Participant Name (PLEASE PRINT)
              </p>
            </div>

            {/* Participant Signature and Date */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={participantSignature}
                  onChange={(e) => setParticipantSignature(e.target.value)}
                  placeholder="Type your signature here"
                  className="border-0 border-b-2 border-black bg-transparent w-full text-lg font-cursive italic focus:outline-none focus:border-blue-600 pb-2"
                  style={{ fontFamily: "cursive" }}
                  required
                />
                <p className="text-xs mt-2 font-medium">
                  Participant Signature
                </p>
              </div>
              <div>
                <input
                  type="date"
                  value={participantDate}
                  onChange={(e) => setParticipantDate(e.target.value)}
                  className="border-0 border-b-2 border-black bg-transparent w-full text-sm focus:outline-none focus:border-blue-600 pb-1"
                  required
                />
                <p className="text-xs mt-2 text-center font-medium">
                  Date (Day/Month/Year)
                </p>
              </div>
            </div>

            {/* Guardian Signature and Date */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={guardianSignature}
                  onChange={(e) => setGuardianSignature(e.target.value)}
                  placeholder="Type guardian signature here (if applicable)"
                  className="border-0 border-b-2 border-black bg-transparent w-full text-lg font-cursive italic focus:outline-none focus:border-blue-600 pb-2"
                  style={{ fontFamily: "cursive" }}
                />
                <p className="text-xs mt-2 font-medium">
                  Signature of Parent of Guardian (where applicable)
                </p>
              </div>
              <div>
                <input
                  type="date"
                  value={guardianDate}
                  onChange={(e) => setGuardianDate(e.target.value)}
                  className="border-0 border-b-2 border-black bg-transparent w-full text-sm focus:outline-none focus:border-blue-600 pb-1"
                />
                <p className="text-xs mt-2 text-center font-medium">
                  Date (Day/Month/Year)
                </p>
              </div>
            </div>

            {/* Insurance Section */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/20 rounded-lg">
              <span className="text-sm font-medium">
                Diver Accident Insurance?
              </span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="insurance"
                    value="no"
                    checked={hasInsurance === "no"}
                    onChange={(e) => setHasInsurance(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">NO</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="insurance"
                    value="yes"
                    checked={hasInsurance === "yes"}
                    onChange={(e) => setHasInsurance(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">YES</span>
                </label>
              </div>
              {hasInsurance === "yes" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Policy Number:</span>
                  <input
                    type="text"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    placeholder="Enter policy number"
                    className="border-0 border-b-2 border-black bg-transparent px-2 py-1 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-600 text-center">
            Product No. 10078 (Rev 04/24) Version 4.05-page 2 of 2-© PADI 2024
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

export default EnrichedAirForm;
