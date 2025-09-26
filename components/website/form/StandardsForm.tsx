"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useState } from "react";

const loadJsPDF = async () => {
  const { default: jsPDF } = await import("jspdf");
  return jsPDF;
};

const StandardsForm = () => {
  const [participantName, setParticipantName] = useState("");
  const [participantSignature, setParticipantSignature] = useState("");
  const [participantDate, setParticipantDate] = useState("");
  const [guardianSignature, setGuardianSignature] = useState("");
  const [guardianDate, setGuardianDate] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExportPDF = async () => {
    if (!participantName || !participantSignature || !participantDate) {
      alert(
        "Please fill in required fields: Participant Name, Signature, and Date",
      );
      return;
    }

    setIsGeneratingPDF(true);

    try {
      const jsPDF = await loadJsPDF();
      const pdf = new jsPDF("p", "mm", "a4");

      // Page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      let yPosition = margin;

      // ---------------------------
      // Add Logo Image
      // ---------------------------
      const fetchImageAsBase64 = async (url: string) => {
        const res = await fetch(url);
        const blob = await res.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      };

      const logoBase64 = await fetchImageAsBase64("/images/standard.png");
      pdf.addImage(logoBase64, "PNG", margin, yPosition, 30, 30); // x, y, width, height

      // Header text next to logo
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      // pdf.text("PADI", margin + 35, yPosition + 10);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      // pdf.text("padi.com", margin + 35, yPosition + 15);

      yPosition += 15;

      // Title box
      pdf.setFillColor(0, 0, 0);
      pdf.rect(margin + 40, yPosition - 8, contentWidth - 40, 15, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        "Standard Safe Diving Practices Statement of Understanding",
        margin + 45,
        yPosition,
      );

      yPosition += 15; // small space below title
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        "Please read carefully before signing.",
        margin + 40, // align with title
        yPosition,
      );

      yPosition += 15;

      // Introduction paragraph
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      const introText =
        "This is a statement in which you are informed of the established safe diving practices for skin and scuba diving. These practices have been compiled for your review and acknowledgement and are intended to increase your comfort and safety in diving. Your signature on this statement is required as proof that you are aware of these safe diving practices. Read and discuss the statement prior to signing it. If you are a minor, this form must also be signed by a parent or guardian.";
      const introLines = pdf.splitTextToSize(introText, contentWidth);
      pdf.text(introLines, margin, yPosition);
      yPosition += introLines.length * 4 + 10;

      // Name line
      pdf.text(
        `I, ${participantName}, understand that as a diver I should:`,
        margin,
        yPosition,
      );
      yPosition += 10;

      // Safety practices
      const practices = [
        "1. Maintain good mental and physical fitness for diving. Avoid being under the influence of alcohol or dangerous drugs when diving. Keep proficient in diving skills, striving to increase them through continuing education and reviewing them in controlled conditions after a period of diving inactivity, and refer to my course materials to stay current and refresh myself on important information.",
        "2. Be familiar with my dive sites. If not, obtain a formal diving orientation from a knowledgeable, local source. If diving conditions are worse than those in which I am experienced, postpone diving or select an alternate site with better conditions. Engage only in diving activities consistent with my training and experience. Do not engage in cave or technical diving unless specifically trained to do so.",
        "3. Use complete, well-maintained, reliable equipment with which I am familiar; and inspect it for correct fit and function prior to each dive. Have a buoyancy control device, low-pressure buoyancy control inflation system, submersible pressure gauge and alternate air source and dive planning/monitoring device (dive computer, RDP/dive tables—whichever you are trained to use) when scuba diving. Deny use of my equipment to uncertified divers.",
        "4. Listen carefully to dive briefings and directions and respect the advice of those supervising my diving activities. Recognize that additional training is recommended for participation in specialty diving activities, in other geographic areas and after periods of inactivity that exceed six months.",
        "5. Adhere to the buddy system throughout every dive. Plan dives – including communications, procedures for reuniting in case of separation and emergency procedures – with my buddy.",
        "6. Be proficient in dive planning (dive computer or dive table use). Make all dives no decompression dives and allow a margin of safety. Have a means to monitor depth and time underwater. Limit maximum depth to my level of training and experience. Ascend at a rate of not more than 18 metres/60 feet per minute. Be a SAFE diver – Slowly Ascend From Every dive. Make a safety stop as an added precaution, usually at 5 metres/15 feet for three minutes or longer.",
        "7. Maintain proper buoyancy. Adjust weighting at the surface for neutral buoyancy with no air in my buoyancy control device. Maintain neutral buoyancy while underwater. Be buoyant for surface swimming and resting. Have weights clear for easy removal, and establish buoyancy when in distress while diving. Carry at least one surface signaling device (such as signal tube, whistle, mirror).",
        "8. Breathe properly for diving. Never breath-hold or skip-breathe when breathing compressed air, and avoid excessive hyperventilation when breath-hold diving. Avoid overexertion while in and underwater and dive within my limitations.",
        "9. Use a boat, float or other surface support station, whenever feasible.",
        "10. Know and obey local dive laws and regulations, including fish and game and dive flag laws.",
      ];

      practices.forEach((practice) => {
        const lines = pdf.splitTextToSize(practice, contentWidth);
        if (yPosition + lines.length * 4 > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * 4 + 5;
      });

      // Final statement
      yPosition += 5;
      const finalText =
        "I understand the importance and purposes of these established practices. I recognize they are for my own safety and well-being, and that failure to adhere to them can place me in jeopardy when diving.";
      const finalLines = pdf.splitTextToSize(finalText, contentWidth);
      if (yPosition + finalLines.length * 4 > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.setFont("helvetica", "bold");
      pdf.text(finalLines, margin, yPosition);
      yPosition += finalLines.length * 4 + 15;

      // Signatures
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = margin;
      }

      // Participant signature
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(participantSignature, margin, yPosition + 15);
      pdf.line(margin, yPosition + 20, margin + 80, yPosition + 20);
      pdf.setFontSize(8);
      pdf.text("Participant's Signature", margin, yPosition + 25);

      pdf.text(participantDate, margin + 120, yPosition + 15);
      pdf.line(margin + 120, yPosition + 20, margin + 170, yPosition + 20);
      pdf.text("Date (Day/Month/Year)", margin + 120, yPosition + 25);

      yPosition += 40;

      // Guardian signature (if provided)
      if (guardianSignature) {
        pdf.setFontSize(12);
        pdf.text(guardianSignature, margin, yPosition + 15);
      }
      pdf.line(margin, yPosition + 20, margin + 80, yPosition + 20);
      pdf.setFontSize(8);
      pdf.text(
        "Signature of Parent or Guardian (where applicable)",
        margin,
        yPosition + 25,
      );

      if (guardianDate) {
        pdf.setFontSize(12);
        pdf.text(guardianDate, margin + 120, yPosition + 15);
      }
      pdf.line(margin + 120, yPosition + 20, margin + 170, yPosition + 20);
      pdf.setFontSize(8);
      pdf.text("Date (Day/Month/Year)", margin + 120, yPosition + 25);

      // Footer
      yPosition += 40;
      pdf.setFontSize(7);
      pdf.text(
        "Product No. 10060 (Rev. 06/15) Version 2.01 © PADI 2015",
        margin,
        yPosition,
      );

      pdf.save(
        `PADI_Standards_Form_${participantName
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "_")
          .trim()}_${new Date().toISOString().split("T")[0]}.pdf`,
      );
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSubmitToBackend = async () => {
    if (!participantName || !participantSignature || !participantDate) {
      alert(
        "Please fill in required fields: Participant Name, Signature, and Date",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("participantName", participantName);
      formData.append("participantSignature", participantSignature);
      formData.append("guardianSignature", guardianSignature);
      formData.append("participantDate", participantDate);
      formData.append("guardianDate", guardianDate);

      const response = await fetch("/api/submit-standards-form", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Form submitted successfully!");

      // Reset form
      setParticipantName("");
      setParticipantSignature("");
      setGuardianSignature("");
      setParticipantDate("");
      setGuardianDate("");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 px-4">
      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto mb-6 no-print">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={async () => {
              // Wait for submission first, then generate PDF
              await handleSubmitToBackend();
              await handleExportPDF();
            }}
            disabled={isSubmitting || isGeneratingPDF}
            className={`font-semibold py-3 px-6  rounded-lg transition duration-200 flex-1 text-center ${
              isSubmitting || isGeneratingPDF
                ? "bg-muted cursor-not-allowed text-muted-foreground"
                : "bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? "Submitting..." : "📤 Submit"}
          </Button>
        </div>
      </div>

      {/* Form Content - Professional PADI Design */}
      <div className="print-area max-w-4xl mx-auto bg-card shadow-xl rounded-lg overflow-hidden">
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
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Print Name"
              className="border-0 border-b-2 border-black bg-transparent px-2 py-1 min-w-0 flex-1 max-w-xs text-sm focus:outline-none focus:border-blue-600"
            />
            <span className="text-sm">
              , understand that as a diver I should:
            </span>
          </div>

          <div className="grid grid-cols-1  gap-6 lg:gap-8 mb-8">
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
                  onChange={(e) => setParticipantSignature(e.target.value)}
                  placeholder="Type your signature here"
                  className="border-0 border-b-2 border-black bg-transparent w-full text-lg font-cursive italic focus:outline-none focus:border-blue-600 pb-2"
                  style={{ fontFamily: "cursive" }}
                />
                <p className="text-xs mt-2 font-medium">
                  Participant&apos;s Signature
                </p>
              </div>
              <div>
                <input
                  type="date"
                  value={participantDate}
                  onChange={(e) => setParticipantDate(e.target.value)}
                  className="border-0 border-b-2 border-black bg-transparent w-full text-sm focus:outline-none focus:border-blue-600 pb-1"
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
                  className="border-0 border-b-2 border-black bg-transparent w-full text-lg font-cursive italic focus:outline-none focus:border-blue-600 pb-2"
                  style={{ fontFamily: "cursive" }}
                />
                <p className="text-xs mt-2 font-medium">
                  Signature of Parent or Guardian (where applicable)
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
          </div>

          {/* Footer */}
          <div className="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-600 text-center">
            Product No. 10060 (Rev. 06/15) Version 2.01 © PADI 2015
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardsForm;
