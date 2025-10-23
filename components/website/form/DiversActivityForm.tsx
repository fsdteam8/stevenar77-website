"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { useBooking } from "../course/booking-context"; // ✅ Add this

interface DiversActivityFormProps {
  onSubmitSuccess?: () => void;
}

const loadHTML2Canvas = async () => {
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas;
};

// const DiversActivityForm = () => {
const DiversActivityForm: React.FC<DiversActivityFormProps> = ({
  onSubmitSuccess,
}) => {
  const { dispatch } = useBooking(); // ✅ Add this

  const [participantName, setParticipantName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [hasInsurance, setHasInsurance] = useState<boolean | null>(null);
  const [signature, setSignature] = useState("");
  const [guardianSignature, setGuardianSignature] = useState("");
  const [guardianDate, setGuardianDate] = useState("");
  const [date, setDate] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  

  const formRef = useRef<HTMLDivElement>(null);

  // const handlePrint = async () => {
  //   if (!participantName || !signature || !date) {
  //     alert(
  //       "Please fill in required fields: Participant Name, Signature, Date",
  //     );
  //     return;
  //   }

  //   if (hasInsurance === null) {
  //     alert("Please select whether you have Diver Accident Insurance");
  //     return;
  //   }

  //   if (hasInsurance && !policyNumber.trim()) {
  //     alert(
  //       "Please enter your Policy Number since you have Diver Accident Insurance",
  //     );
  //     return;
  //   }

  //   setIsGeneratingPDF(true);

  //   try {
  //     if (!formRef.current) throw new Error("Form reference not found");

  //     console.log("Generating PDF...");
  //     const html2canvas = await loadHTML2Canvas();

  //     const canvas = await html2canvas(formRef.current, {
  //       scale: 1,
  //       useCORS: true,
  //       allowTaint: true,
  //       backgroundColor: "#ffffff",
  //       logging: false,
  //       ignoreElements: (el: Element): boolean => {
  //         const isNoPrint = el.classList.contains("no-print");
  //         const isExternalImg =
  //           el.tagName === "IMG" &&
  //           !!el.getAttribute("src")?.startsWith("http");
  //         return isNoPrint || isExternalImg;
  //       },

  //       onclone: (clonedDoc) => {
  //         // ✅ Clean unsupported CSS color functions
  //         const allEls = clonedDoc.querySelectorAll("*");
  //         allEls.forEach((el) => {
  //           const htmlEl = el as HTMLElement;
  //           if (htmlEl.style) {
  //             const props = ["color", "backgroundColor", "borderColor"];
  //             props.forEach((prop) => {
  //               const val = htmlEl.style.getPropertyValue(prop);
  //               if (val && val.includes("lab")) {
  //                 htmlEl.style.setProperty(prop, "rgb(0, 0, 0)", "important");
  //               }
  //             });
  //             if (!htmlEl.style.color || htmlEl.style.color.includes("lab"))
  //               htmlEl.style.color = "rgb(0, 0, 0)";
  //             if (
  //               htmlEl.tagName !== "INPUT" &&
  //               (!htmlEl.style.backgroundColor ||
  //                 htmlEl.style.backgroundColor.includes("lab"))
  //             )
  //               htmlEl.style.backgroundColor = "rgb(255, 255, 255)";
  //             if (
  //               !htmlEl.style.borderColor ||
  //               htmlEl.style.borderColor.includes("lab")
  //             )
  //               htmlEl.style.borderColor = "rgb(0, 0, 0)";

  //             htmlEl.style.removeProperty("filter");
  //             htmlEl.style.removeProperty("backdrop-filter");
  //             htmlEl.style.removeProperty("box-shadow");
  //           }
  //         });
  //       },
  //     });

  //     const imgData = canvas.toDataURL("image/jpeg", 1.25);
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = pageWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     // ✅ Add first page
  //     pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     // ✅ Add remaining pages if needed
  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     const pdfBlob = pdf.output("blob");
  //     const fileSizeMB = pdfBlob.size / 1024 / 1024;
  //     console.log(`PDF generated: ${fileSizeMB.toFixed(2)}MB`);

  //     const fileName = `PADI_Divers_Activity_Form_${participantName
  //       .replace(/[^a-zA-Z0-9\s]/g, "")
  //       .replace(/\s+/g, "_")
  //       .trim()}_${new Date().toISOString().split("T")[0]}.pdf`;

  //     const pdfFile = new File([pdfBlob], fileName, {
  //       type: "application/pdf",
  //     });

  //     // ✅ Add to booking context
  //     dispatch({ type: "ADD_DOCUMENT", payload: pdfFile });

  //     onSubmitSuccess?.();
  //   } catch (error: unknown) {
  //     console.error("Error generating PDF:", error);
  //     alert(
  //       `Failed to generate PDF: ${
  //         error instanceof Error ? error.message : "Unknown error"
  //       }`,
  //     );
  //   } finally {
  //     setIsGeneratingPDF(false);
  //   }
  // };

  const handlePrint = async () => {
    if (!participantName || !signature || !date) {
      alert(
        "Please fill in required fields: Participant Name, Signature, Date",
      );
      return;
    }

    if (hasInsurance === null) {
      alert("Please select whether you have Diver Accident Insurance");
      return;
    }

    if (hasInsurance && !policyNumber.trim()) {
      alert(
        "Please enter your Policy Number since you have Diver Accident Insurance",
      );
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
        ignoreElements: (el: Element): boolean => {
          const isNoPrint = el.classList.contains("no-print");
          const isExternalImg =
            el.tagName === "IMG" &&
            !!el.getAttribute("src")?.startsWith("http");
          return isNoPrint || isExternalImg;
        },

        // IMPORTANT: inject styles into the *cloned* document so the capture
        // renders with a white background and no shadows/filters.
        onclone: (clonedDoc: Document) => {
          try {
            // 1) Inject a stylesheet to force white background and remove visual effects
            const styleTag = clonedDoc.createElement("style");
            styleTag.innerHTML = `
            /* Force page and print-area background white */
            html, body { background-color: #ffffff !important; }
            .print-area { background-color: #ffffff !important; }

            /* Remove shadows/filters that create gray artifacts */
            * { box-shadow: none !important; filter: none !important; -webkit-filter: none !important; backdrop-filter: none !important; }

            /* Hide non-printing helpers */
            .no-print { display: none !important; }
          `;
            clonedDoc.head?.appendChild(styleTag);

            // 2) Ensure the cloned print-area element has an inline white background
            const clonedPrint = clonedDoc.querySelector(
              ".print-area",
            ) as HTMLElement | null;
            if (clonedPrint) {
              clonedPrint.style.setProperty(
                "background-color",
                "#ffffff",
                "important",
              );
              clonedPrint.style.setProperty("box-shadow", "none", "important");
            }

            // 3) Sanitize styles which may use `lab()` color functions by checking
            // computed styles and replacing any 'lab' occurrences with safe rgb values.
            const allEls = clonedDoc.querySelectorAll<HTMLElement>("*");
            allEls.forEach((el) => {
              // remove visual effects with inline style override
              el.style.setProperty("box-shadow", "none", "important");
              el.style.setProperty("filter", "none", "important");
              el.style.setProperty("backdrop-filter", "none", "important");

              // check computed style values for problematic 'lab(...)' colors
              const view = clonedDoc.defaultView;
              if (view) {
                const cs = view.getComputedStyle(el);
                [
                  "color",
                  "background-color",
                  "border-top-color",
                  "border-color",
                ].forEach((prop) => {
                  const val = cs.getPropertyValue(prop);
                  if (val && val.includes("lab")) {
                    // replace with safe rgb values
                    const replacement =
                      prop === "background-color"
                        ? "rgb(255, 255, 255)"
                        : "rgb(0, 0, 0)";
                    el.style.setProperty(prop, replacement, "important");
                  }
                });
              }

              // Also sanitize inline style declarations that might contain 'lab'
              const inlineProps = ["color", "background-color", "border-color"];
              inlineProps.forEach((p) => {
                const v = el.style.getPropertyValue(p);
                if (v && v.includes("lab")) {
                  const replacement =
                    p === "background-color"
                      ? "rgb(255, 255, 255)"
                      : "rgb(0, 0, 0)";
                  el.style.setProperty(p, replacement, "important");
                }
              });
            });
          } catch (e) {
            // don't block capture if sanitation fails — fallback still exists via html2canvas backgroundColor
            // but log so you can debug if needed
            console.warn("onclone sanitation failed:", e);
          }
        },
      });

      // Use JPEG quality <= 1.0 (1.25 is invalid)
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add remaining pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const pdfBlob = pdf.output("blob");
      const fileSizeMB = pdfBlob.size / 1024 / 1024;
      console.log(`PDF generated: ${fileSizeMB.toFixed(2)}MB`);

      const fileName = `PADI_Divers_Activity_Form_${participantName
        .replace(/[^a-zA-Z0-9\\s]/g, "")
        .replace(/\s+/g, "_")
        .trim()}_${new Date().toISOString().split("T")[0]}.pdf`;

      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });

      // Add to booking context
      dispatch({
        type: "ADD_DOCUMENT",
        payload: { file: pdfFile, label: "Divers Activity" },
      });

      onSubmitSuccess?.();
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      alert(
        `Failed to generate PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      {/* Form Content */}
      <div
        ref={formRef}
        className="print-area max-w-6xl mx-auto bg-white p-10 text-sm leading-relaxed font-serif shadow-lg"
      >
        {/* ---------------- Page 1 ---------------- */}
        <div className="flex items-center pb-4">
          <div className="flex items-center pb-4">
            <div className="mr-6 flex-shrink-0">
              <Image
                src={"/images/pdf-logo.png"}
                alt="Padi logo"
                width={200}
                height={200}
                crossOrigin="anonymous"
              />
            </div>

            <div className="flex-1">
              <div>
                <h1 className="text-center font-bold text-xl mb-1">
                  Release of Liability/Assumption of Risk/Non-agency
                  Acknowledgment Form
                </h1>
                <h2 className="text-center text-4xl font-bold mb-4">
                  DIVER ACTIVITIES
                </h2>
                <hr className="my-2 border-2 border-gray-900" />
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-10 ">
          <p className="text-basecapitalize font-bold text-start">
            Please read carefully and fill in all blanks before signing.
          </p>
          <div className="">
            <div className="mt-8">
              <h3 className="text-center font-bold text-2xl mt-2 mb-3">
                NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT
              </h3>
            </div>

            <p>
              I understand and agree that PADI Members (&qout;Members&qout;),
              including
              <span className="border-full underline border-gray-900 text-xl font-bold px-2">
                Scuba Life & their instructors
              </span>{" "}
              and/or any individual PADI Instructors and Divemasters associated
              with the program in which I am participating, are licensed to use
              various PADI Trademarks and to conduct PADI training, but are not
              agents, employees or franchisees of PADI Americas, Inc., or its
              parent, subsidiary and affiliated corporations (&qout;PADI&qout;).
              I further understand that Member business activities are
              independent, and are neither owned nor operated by PADI, and that
              while PADI establishes the standards for PADI diver training
              programs, it is not responsible for, nor does it have the right to
              control, the operation of the Members&apos; business activities
              and the day-to-day conduct of PADI programs and supervision of
              divers by the Members or their associated staff. I further
              understand and agree on behalf of myself, my heirs and my estate
              that in the event of an injury or death during this activity,
              neither I nor my estate shall seek to hold PADI liable for the
              actions, inactions or negligence of the entities listed above
              and/or the instructors and divemasters associated with the
              activity
            </p>
          </div>

          <div className="">
            <div className="mt-8">
              <h3 className="text-center font-bold text-2xl mt-2 mb-3">
                LIABILITY RELEASE AND ASSUMPTION OF RISK AGREEMENT
              </h3>
            </div>

            <p>
              I,{" "}
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Participant Name"
                className="border-b border-black w-46 h-8 px-1 bg-transparent focus:outline-none"
              />{" "}
              hereby affirm that I am a certified scuba diver trained in safe
              dive practices, or a student diver under the control and
              supervision of a certified scuba instructor. I know that skin
              diving, freediving and scuba diving have inherent risks including
              those risks associated with boat travel to and from the dive site
              (hereinafter &qout;Excursion&qout;), which may result in serious
              injury or death. understand that scuba diving with compressed air
              involves certain inherent risks; including but not limited to
              decompression sickness, embolism or other hyperbaric/air expansion
              injury that require treatment in a recompression chamber. If I am
              scuba diving with oxygen enriched air (&qout;Enriched Air&qout;)
              or other gas blends including oxygen, I also understand that it
              involves inherent risks of oxygen toxicity and/or improper
              mixtures of breathing gas. I acknowledge this Excursion includes
              risks of slipping or falling while on board the boat, being cut or
              struck by a boat while in the water, injuries occurring while
              getting on or off a boat, and other perils of the sea. I further
              understand that the Excursion will be conducted at a site that is
              remote, either by time or distance or both, from a recompression
              chamber. I still choose to proceed with the Excursion in spite of
              the absence of a recompression chamber in proximity to the dive
              site(s).
            </p>

            <p className="mt-4">
              I understand and agree that neither
              <span className="border-full underline border-gray-900 text-xl font-bold px-2">
                Scuba Life & their instructors
              </span>{" "}
              ; nor the dive professional(s) who may be present at the dive
              site, nor PADI Americas, Inc., nor any of their affiliated and
              subsidiary corporations, nor any of their respective employees,
              officers, agents, contractors and assigns (hereinafter
              &qout;Released Parties&qout;) may be held liable or responsible in
              any way for any injury, death or other damages to me, my family,
              estate, heirs or assigns that may occur during the Excursion as a
              result of my participation in the Excursion or as a result of the
              negligence of any party, including the Released Parties, whether
              passive or active.
            </p>

            <p className="mt-6">
              I affirm I am in good mental and physical fitness for the
              Excursion. I further state that I will not participate in the
              Excursion if I am under the influence of alcohol or any drugs that
              are contraindicated to diving. If I am taking medication, I affirm
              that I have seen a physician and have approval to dive while under
              the influence of the medication/drugs. I understand that diving is
              a physically strenuous activity and that I will be exerting myself
              during the Excursion and that if I am injured as a result of heart
              attack, panic, hyperventilation, drowning or any other cause, that
              I expressly assume the risk of said injuries and that I will not
              hold the Released Parties responsible for the same.
            </p>

            <p className="mt-6">
              I am aware that safe dive practices suggest diving with a buddy
              unless trained as a self-reliant diver. I am aware it is my
              responsibility to plan my dive allowing for my diving experience
              and limitations, and the prevailing water conditions and
              environment. I will not hold the Released Parties responsible for
              my failure to safely plan my dive, dive my plan, and follow the
              instructions and dive briefing of the dive professional(s).
            </p>

            <p className="mt-6">
              If diving from a boat, I will be present at and attentive to the
              briefing given by the boat crew. If there is anything I do not
              understand I will notify the boat crew or captain immediately. I
              acknowledge it is my responsibility to plan my dives as
              no-decompression dives, and within parameters that allow me to
              make a safety stop before ascending to the surface, arriving on
              board the vessel with gas remaining in my cylinder as a measure of
              safety. If I become distressed on the surface I will immediately
              drop my weights and inflate my BCD (orally or with low pressure
              inflator) to establish buoyancy on the surface.
            </p>
          </div>
          <div className="flex justify-between text-xs italic mt-6">
            <p className="">Product No. 10086 (Rev. 02/21) Version 3.0</p>{" "}
            <p className="">- page 1 of 2 -</p> <p className="">© PADI 2021</p>
          </div>
        </div>
        <div className="py-48"></div>
        {/* ---------------- Page 2 ---------------- */}
        <div className="mt-12 border-t pt-8">
          <div className="flex items-center pb-4">
            <div className="mr-6 flex-shrink-0">
              <Image
                src={"/images/pdf-logo.png"}
                alt="Padi logo"
                width={200}
                height={200}
                crossOrigin="anonymous"
              />
            </div>

            <div className="flex-1">
              <div>
                <h1 className="text-center font-bold text-xl mb-1">
                  Release of Liability/Assumption of Risk/Non-agency
                  Acknowledgment Form
                </h1>
                <h2 className="text-center text-4xl font-bold mb-4">
                  DIVER ACTIVITIES
                </h2>
                <hr className="my-2 border-2 border-gray-900" />
              </div>
            </div>
          </div>
          <div className=" ml-10 ">
            <p className="mt-6">
              I am aware safe dive practices recommend a refresher or guided
              orientation dive following a period of diving inactivity. I
              understand such refresher/guided dive is available for an
              additional fee. If I choose not to follow this recommendation I
              will not hold the Released Parties responsible for my decision.
            </p>

            <p className="mt-6">
              I acknowledge Released Parties may provide an in-water guide
              (hereinafter &qout;Guide&qout;) during the Excursion. The Guide is
              present to assist in navigation during the dive and identifying
              local flora and fauna. If I choose to dive with the Guide I
              acknowledge it is my responsibility to stay in proximity to the
              Guide during the dive. I assume all risks associated with my
              choice whether to dive in proximity to the Guide or to dive
              independent of the Guide. I acknowledge my participation in diving
              is at my own risk and peril.
            </p>

            <p className="mt-6">
              I affirm it is my responsibility to inspect all of the equipment I
              will be using prior to the leaving the dock for the Excursion and
              that I should not dive if the equipment is not functioning
              properly. I will not hold the Released Parties responsible for my
              failure to inspect the equipment prior to diving or if I choose to
              dive with equipment that may not be functioning properly.
            </p>

            <p className="mt-6">
              I acknowledge Released Parties have made no representation to me,
              implied or otherwise, that they or their crew can or will perform
              effective rescues or render first aid. In the event I show signs
              of distress or call for aid I would like assistance and will not
              hold the Released Parties, their crew, dive boats or passengers
              responsible for their actions in attempting the performance of
              rescue or first aid.
            </p>

            <p className="mt-6">
              I hereby state and agree that this Agreement will be effective for
              all Excursions in which I participate for one (1) year from the
              date on which I sign this Agreement.
            </p>

            <p className="mt-6">
              I further state that I am of lawful age and legally competent to
              sign this liability release, or that I have acquired the written
              consent of my parent or guardian. I understand the terms herein
              are contractual and not a mere recital, and that I have signed
              this Agreement of my own free act and with the knowledge that I
              hereby agree to waive my legal rights. I further agree that if any
              provision of this Agreement is found to be unenforceable or
              invalid, that provision shall be severed from this Agreement. The
              remainder of this Agreement will then be construed as though the
              unenforceable provision had never been contained herein. I
              understand and agree that I am not only giving up my right to sue
              the Released Parties but also any rights my heirs, assigns, or
              beneficiaries may have to sue the Released Parties resulting from
              my death. I further represent that I have the authority to do so
              and that my heirs, assigns, and beneficiaries will be estopped
              from claiming otherwise because of my representations to the
              Released Parties.
            </p>

            <p className="mt-6">
              I,{" "}
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Participant Name"
                className="border-b border-black w-50 h-8 px-1 bg-transparent focus:outline-none"
              />{" "}
              , BY THIS INSTRUMENT, AGREE TO EXEMPT AND RELEASE THE RELEASED
              PARTIES DEFINED ABOVE FROM ALL LIABILITY OR RESPONSIBILITY
              WHATSOEVER FOR PERSONAL INJURY, PROPERTY DAMAGE OR WRONGFUL DEATH
              HOWEVER CAUSED, INCLUDING BUT NOT LIMITED TO THE NEGLIGENCE OF THE
              RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE.
            </p>

            <p className=" mt-6 mb-6">
              I HAVE FULLY INFORMED MYSELF AND MY HEIRS OF THE CONTENTS OF THIS
              NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT, AND LIABILITY
              RELEASE AND ASSUMPTION OF RISK AGREEMENT BY READING BOTH BEFORE
              SIGNING BELOW ON BEHALF OF MYSELF AND MY HEIRS.
            </p>
          </div>
        </div>

        <div className="ml-10">
          <div className="mt-8 w-full space-y-6">
            <div className="flex gap-10">
              <div className="flex-5 w-full">
                <label className="block text-center font-semibold mb-1">
                  Participant Signature:
                </label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Signature"
                  className="border-b border-black w-full h-8 px-1 bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex-2">
                <label className="block text-sm mb-1">Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-b border-black w-full h-8 px-1 bg-transparent focus:outline-none"
                />
              </div>
            </div>

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
                    className="border-b border-black w-full h-8 px-1 bg-transparent focus:outline-none cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex-2">
                <label className="block text-sm mb-1">Date:</label>
                <input
                  type="date"
                  value={guardianDate}
                  onChange={(e) => setGuardianDate(e.target.value)}
                  className="border-b border-black w-full h-8 px-1 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-5">
            <div className="flex items-center gap-4">
              <p className="font-semibold">Diver Accident Insurance?</p>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="insurance"
                  value="yes"
                  checked={hasInsurance === true}
                  onChange={() => setHasInsurance(true)}
                  className="w-4 h-4"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="insurance"
                  value="no"
                  checked={hasInsurance === false}
                  onChange={() => {
                    setHasInsurance(false);
                    setPolicyNumber("");
                  }}
                  className="w-4 h-4"
                />
                <span>No</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label
                className={`font-semibold ${!hasInsurance ? "text-gray-400" : ""}`}
              >
                Policy Number:
              </label>
              <input
                type="text"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                placeholder={hasInsurance ? "Enter policy number" : "N/A"}
                disabled={!hasInsurance}
                className={`border-b border-black w-48 h-8 px-1 bg-transparent focus:outline-none ${
                  !hasInsurance ? "text-gray-400 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="max-w-6xl mx-auto mb-4 mt-6 no-print">
        <button
          onClick={handlePrint}
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
  );
};

export default DiversActivityForm;
