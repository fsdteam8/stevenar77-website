// PadiLiabilityForm.tsx
"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useFormStore } from "@/store/formStore";
import { generatePaginatedPDF } from "@/lib/pdf-utils";

interface PadiLiabilityFormProps {
  cartId: string;
  formTitle: string;
  onSubmitSuccess?: () => void;
}

export default function PadiLiabilityForm({
  cartId,
  formTitle,
  onSubmitSuccess,
}: PadiLiabilityFormProps) {
  const store = useFormStore();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  const [participantName, setParticipantName] = useState("");
  const [signature, setSignature] = useState("");
  const [guardianSignature, setGuardianSignature] = useState("");
  const [date] = useState(getCurrentDate());
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [errors, setErrors] = useState({
    participantName: true,
    signature: true,
    date: false,
  });

  const formRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    // Reset errors
    const newErrors = {
      participantName: !participantName.trim(),
      signature: !signature.trim(),
      date: !date.trim(),
    };

    // Mapping keys to user-friendly names
    const fieldNames: Record<string, string> = {
      participantName: "Name",
      signature: "Signature",
      date: "Date",
    };

    setErrors(newErrors);

    const missingFields = Object.entries(newErrors)
      .filter(([_, value]) => value)
      .map(([key]) => fieldNames[key]);
    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following required fields: ${missingFields.join(", ")}`,
      );
      return;
    }
    setIsGeneratingPDF(true);

    try {
      if (!formRef.current) throw new Error("Form reference not found");

      const fileName = `PADI_Liability_Form_${participantName
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .trim()}_${new Date().toISOString().split("T")[0]}.pdf`;

      // *** THE FIX IS APPLIED VIA THIS FUNCTION CALL NOW ***
      const pdfFile = await generatePaginatedPDF(formRef.current, fileName);

      // Save to store
      store.setFormCompleted(cartId, formTitle, pdfFile);

      // Auto-download (uncomment next line to enable auto-download using utility function)
      // downloadPDF(pdfFile);

      toast.success("PDF generated successfully!");
      onSubmitSuccess?.();
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      toast.error(
        `Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className=" bg-gray-100 py-6">
      {/* Form Content */}
      <div
        className="max-w-4xl w-full mx-auto shadow-lg overflow-auto"
        style={{ maxHeight: "calc(100vh - 3rem)" }}
      >
        <div
          ref={formRef}
          className="print-area bg-white p-6 text-sm leading-relaxed font-serif"
        >
          {/* ---------------- Page 1 ---------------- */}
          <div className="no-split"> {/* Added no-split here to help contain page 1 content */}
            <div className="flex items-center pb-4">
              <div className="mr-6 flex-shrink-0">
                <Image
                  src={"/images/pdf-logo.png"}
                  alt="Padi logo"
                  width={100}
                  height={100}
                  priority
                  crossOrigin="anonymous"
                />
              </div>
              <div className="flex-1">
                <div>
                  <h1 className="text-center max-w-8xl font-bold text-base mb-1">
                    Release of Liability/Assumption of Risk/Non-agency
                    Acknowledgment Form
                  </h1>
                  <h2 className="text-center text-2xl font-bold mb-4">
                    Continuing Education Administrative Document
                  </h2>
                  <hr className="my-2 border-2 border-gray-900" />
                  <p className="capitalize text-center font-bold text-base mb-6 no-split">
                    NOTE: Also complete and attach the Diver Medical Form
                    (Product No. 10346)
                  </p>
                </div>
              </div>
            </div>
            <div className="pdf-columns grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
              <div className="pr-4">
                <p className="mb-4 no-split">
                  This is a statement in which you are informed of the
                  established safe diving practices for skin and scuba diving.
                  These practices have been compiled for your review and
                  acknowledgment and are intended to increase your comfort and
                  safety in diving.
                  <span className="font-bold">
                    Your signature on this statement is required
                  </span>{" "}
                  as proof that you are aware of these safe diving practices.
                  Read and discuss the statement prior to signing it. If you are
                  a minor,this form must also be signed by a parent or guardian.
                </p>

                <p className="mb-2">
                  I,{" "}
                  <input
                    type="text"
                    value={participantName}
                    onChange={(e) => {
                      setParticipantName(e.target.value);
                      if (errors.participantName && e.target.value.trim()) {
                        setErrors({ ...errors, participantName: false });
                      }
                    }}
                    placeholder="Participant Name"
                    className={`border-b ${errors.participantName ? "border-red-500 bg-red-50" : "border-black"} w-46 h-12 px-1 bg-transparent focus:outline-none`}
                  />{" "}
                  understand that as a diver I should:
                </p>

                <ol className="!list-decimal ml-6 space-y-2">
                  <li className="no-split"> {/* Added no-split */}
                    Maintain good mental and physical fitness for diving. Avoid
                    being under the influence of alcohol or dangerous drugs when
                    diving. Keep proficient in diving skills, striving to
                    increase them through continuing education and reviewing
                    them in controlled conditions after a period of diving
                    inactivity, and refer to my course materials to stay current
                    and refresh myself on important information.
                  </li>
                  <li className="no-split"> {/* Added no-split */}
                    Be familiar with my dive sites. If not, obtain a formal
                    diving orientation from a knowledgeable, local source. If
                    diving conditions are worse than those in which I am
                    experienced, postpone diving or select an alternate site
                    with better conditions. Engage only in diving activities
                    consistent with my training and experience. Do not engage in
                    cave or technical diving unless specifically trained to do
                    so.
                  </li>
                  <li className="no-split"> {/* Added no-split */}
                    Use complete, well-maintained, reliable equipment with which
                    I am familiar, and inspect it for correct fit and function
                    prior to each dive. Have a buoyancy control device,
                    low-pressure buoyancy control inflation system, submersible
                    pressure gauge and alternate air source and dive
                    planning/monitoring device (dive computer, RDP/dive
                    tables—whichever you are trained to use) when scuba diving.
                    Deny use of my equipment to uncertified divers.
                  </li>
                  <li className="no-split"> {/* Added no-split */}
                    Listen carefully to dive briefings and directions and
                    respect the advice of those supervising my diving
                    activities. Recognize that additional training is
                    recommended for participation in specialty diving
                    activities, in other geographic areas and after periods of
                    inactivity that exceed six months.
                  </li>
                </ol>
              </div>
              <div className="pr-4">
                <ol className="!list-decimal ml-6 space-y-2" start={5}>
                  <li className="no-split"> {/* Added no-split */}
                    Adhere to the buddy system throughout every dive. Plan dives
                    – including communications, procedures for reuniting in case
                    of separation and emergency procedures – with my buddy.
                  </li>
                  <li className="no-split"> {/* Added no-split */}
                    Be proficient in dive planning (dive computer or dive table
                    use). Make all dives no decompression dives and allow a
                    margin of safety. Have a means to monitor depth and time
                    underwater. Limit maximum depth to my level of training and
                    experience. Ascend at a rate of not more than 18 metres/60
                    feet per minute. Be a SAFE diver – Slowly Ascend From Every
                    dive. Make a safety stop as an added precaution, usually at
                    5 metres/15 feet for three minutes or longer.
                  </li>
                  <li className="no-split"> {/* Added no-split */}
                    Maintain proper buoyancy. Adjust weighting at the surface
                    for neutral buoyancy with no air in my buoyancy control
                    device. Maintain neutral buoyancy while underwater. Be
                    buoyant for surface swimming and resting. Have weights clear
                    for easy removal, and establish buoyancy when in distress
                    while diving. Carry at least one surface signaling device
                    (such as signal tube, whistle, mirror).
                  </li>
                  <li className="no-split"> {/* Added no-split */}
                    Breathe properly for diving. Never breath-hold or
                    skip-breathe when breathing compressed air, and avoid
                    excessive hyperventilation when breath-hold diving. Avoid
                    overexertion while in and underwater and dive within my
                    limitations.
                  </li>
                  <li className="no-split"> {/* Added no-split */}
                    Use a boat, float or other surface support station, whenever
                    feasible.
                  </li>
                  <li className="no-split"> {/* Added no-split */}
                    Know and obey local dive laws and regulations, including
                    fish and game and dive flag laws. I have read the above
                    statements and have had any questions answered to my
                    satisfaction.
                  </li>
                </ol>

                <p className="mt-4 no-split"> {/* Added no-split */}
                  I understand the importance and purposes of these established
                  practices. I recognize they are for my own safety and
                  well-being, and that failure to adhere to them can place me in
                  jeopardy when diving.
                </p>
              </div>
            </div>
            <hr className="my-2 border-2 border-gray-900" />
            <h3 className="text-start font-bold text-2xl mt-2 mb-3 no-split">
              NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT
            </h3>

            <p className="no-split"> {/* Added no-split */}
              I understand and agree that PADI Members (&quot;Members&quot;),
              including
              <span className="border-full underline border-gray-900 text-xl font-bold px-2">
                Scuba Life & their instructors
              </span>
              and/or any individual PADI Instructors and Divemasters associated
              with the program in which I am participating, are licensed to use
              various PADI Trademarks and to conduct PADI training, but are not
              agents, employees or franchisees of PADI Americas, Inc, or its
              parent, subsidiary and affiliated corporations (&quot;PADI&quot;).
              I further understand that Member business activities are
              independent, and are neither owned nor operated by PADI...
            </p>

            <div className="flex justify-between text-xs italic mt-2 no-split"> {/* Added no-split */}
              <p className="">Product No. 10038 (Rev. 02/21)</p>{" "}
              <p className="">Version 2.0</p>{" "}
              <p className="">Page 1 of 2 © PADI 2021</p>
            </div>
          </div>

          {/* ---------------- Page 2 ---------------- */}
          <div className="mt-4 border-t pt-2">
            <div className="flex items-center ">
              <div className="flex-1">
                <div>
                  <h1 className="text-center max-w-8xl font-bold text-base mb-1">
                    Release of Liability/Assumption of Risk/Non-agency
                    Acknowledgment Form
                  </h1>
                  <h2 className="text-center text-2xl font-bold mb-4">
                    Continuing Education Administrative Document.{" "}
                    <span className="text-end text-sm italic">(Continued)</span>
                  </h2>
                  <hr className="my-2 border-2 border-gray-900" />
                </div>
              </div>
            </div>

            <h3 className="text-start font-bold text-2xl mt-2 mb-3 no-split">
              Liability Release and Assumption of Risk Agreement
            </h3>

            <div className="pdf-columns grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
              <div className="pr-4">
                <p className="mb-4 no-split">
                  I,{" "}
                  <input
                    type="text"
                    value={participantName}
                    onChange={(e) => {
                      setParticipantName(e.target.value);
                      if (errors.participantName && e.target.value.trim()) {
                        setErrors({ ...errors, participantName: false });
                      }
                    }}
                    placeholder="Participant Name"
                    className={`border-b ${errors.participantName ? "border-red-500 " : "border-black"} w-46 h-12 px-1`}
                  />{" "}
                  hereby affirm that I am aware that skin and scuba diving have
                  inherent risks which may result in serious injury or death. I
                  understand that diving with compressed air involves certain
                  inherent risks; including but not limited to decompression
                  sickness, embolism or other hyperbaric/air expansion injury
                  that require treatment in a recompression chamber. I further
                  understand that the open water diving trips which are
                  necessary for training and for certification may be conducted
                  at a site that is remote, either by time or distance or both,
                  from such a recompression chamber. I still choose to proceed
                  with such dives in spite of the possible absence of a
                  recompression chamber in proximity to the dive site.
                </p>

                <p className="mb-4 no-split">
                  I understand this Liability Release and Assumption of Risk
                  Agreement (Agreement) hereby encompasses and applies to all
                  diver training activities and courses in which I choose to
                  participate. These activities and courses may include, but are
                  not limited to, altitude, boat, cavern, AWARE, deep, enriched
                  air, photography/videography, diver propulsion vehicle, drift,
                  dry suit, ice, multilevel, night, peak performance buoyancy,
                  search & recovery, rebreather, underwater naturalist,
                  navigator, wreck, adventure diver, rescue diver and other
                  distinctive specialties (hereinafter &quot;Programs&quot;).
                </p>

                <p className="mb-4 no-split">
                  I understand and agree that neither my instructor(s),
                  divemasters(s), the facility which provides the Programs{" "}
                  <span className="border-full underline border-gray-900 text-xl font-bold px-2">
                    Scuba Life & their instructors
                  </span>
                  nor PADI Americas, Inc., nor its affiliate and subsidiary
                  corporations, nor any of their respective employees, officers,
                  agents, contractors or assigns (hereinafter referred to as
                  &quot;Released Parties&quot;) may be held liable or
                  responsible in any way for any injury, death or other damages
                  to me, my family, estate, heirs or assigns that may occur as a
                  result of my participation in the Programs or as a result of
                  the negligence of any party, including the Released Parties,
                  whether passive or active.
                </p>

                <p className="mb-4 no-split">
                  In consideration of being allowed to participate in the
                  Programs, I hereby personally assume all risks of the
                  Programs, whether foreseen or unforeseen, that may befall me
                  while I am a participant in the Programs including, but not
                  limited to, the academics, confined water and/or open water
                  activities. I further release, exempt and hold harmless said
                  Programs and Released Parties from any claim or lawsuit by me,
                  my family, estate, heirs or assigns, arising out of my
                  enrollment and participation in this program including both
                  claims arising during the program or after I receive my
                  certification(s).
                </p>
              </div>

              <div className="pl-4">
                <p className="mb-4 no-split">
                  I understand that past or present medical conditions may be
                  contraindicative to my participation in the Programs. I
                  declare that I am in good mental and physical fitness for
                  diving, and that I am not under the influence of alcohol, nor
                  am I under the influence of any drugs that are contraindicated
                  to diving. If I am taking medication, I declare that I have
                  seen a physician and have approval to dive while under the
                  influence of the medication/drugs. I affirm it is my
                  responsibility to inform my instructor of any and all changes
                  to my health condition at any time during my participation in
                  the Programs and agree to accept responsibility for my failure
                  to do so.
                </p>

                <p className="mb-4 no-split">
                  I also understand that skin diving and scuba diving are
                  physically strenuous activities and that I will be exerting
                  myself during this program, and that if I am injured as a
                  result of heart attack, panic, hyperventilation, drowning or
                  any other cause, that I expressly assume the risk of said
                  injuries and that I will not hold the Released Parties
                  responsible for the same.
                </p>

                <p className="mb-4 no-split">
                  I further state that I am of lawful age and legally competent
                  to sign this Liability Release and Assumption of Risk
                  Agreement, or that I have acquired the written consent of my
                  parent or guardian. I understand the terms herein are
                  contractual and not a mere recital, and that I have signed
                  this Agreement of my own free act and with the knowledge that
                  I hereby agree to waive my legal rights. I further agree that
                  if any provision of this Agreement is found to be
                  unenforceable or invalid, that provision shall be severed from
                  this Agreement. The remainder of this Agreement will then be
                  construed as though the unenforceable provision had never been
                  contained herein.
                </p>

                <p className="mb-4 no-split">
                  I hereby state and agree this Agreement will be effective for
                  all activities associated with the Programs in which I
                  participate within one year from the date on which I sign this
                  Agreement. I understand and agree that I am not only giving up
                  my right to sue the Released Parties but also any rights my
                  heirs, assigns, or beneficiaries may have to sue the Released
                  Parties resulting from my death. I further represent I have
                  the authority to do so and that my heirs, assigns, or
                  beneficiaries will be estopped from claiming otherwise because
                  of my representations to the Released Parties.
                </p>
              </div>
            </div>

            <hr className="my-2 border-2 border-gray-900" />
            <p className="mb-4 no-split">
              I,{" "}
              <input
                type="text"
                value={participantName}
                onChange={(e) => {
                  setParticipantName(e.target.value);
                  if (errors.participantName && e.target.value.trim()) {
                    setErrors({ ...errors, participantName: false });
                  }
                }}
                placeholder="Participant Name"
                className={`border-b ${errors.participantName ? "border-red-500 bg-red-50" : "border-black"} w-46 h-12 px-1 bg-transparent focus:outline-none`}
              />{" "}
              HAVE COMPLETED THE ATTACHED DIVER MEDICAL FORM (10346) AND I
              AFFIRM IT IS MY RESPONSIBILITY TO INFORM MY INSTRUCTOR OF ANY AND
              ALL CHANGES TO MEDICAL HISTORY AT ANY TIME DURING MY PARTICIPATION
              IN SCUBA PROGRAMS. I AGREE TO ACCEPT RESPONSIBILITY FOR OMISSIONS
              REGARDING MY FAILURE TO DISCLOSE ANY EXISTING OR PAST HEALTH
              CONDITION, OR ANY CHANGES THERETO.
            </p>

            <p className="mb-4 no-split">
              I,{" "}
              <input
                type="text"
                value={participantName}
                onChange={(e) => {
                  setParticipantName(e.target.value);
                  if (errors.participantName && e.target.value.trim()) {
                    setErrors({ ...errors, participantName: false });
                  }
                }}
                placeholder="Participant Name"
                className={`border-b ${errors.participantName ? "border-red-500 bg-red-50" : "border-black"} w-46 h-12 px-1 bg-transparent focus:outline-none`}
              />{" "}
              BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE MY INSTRUCTORS,
              DIVEMASTERS, THE FACILITY WHICH OFFERS THE PROGRAMS AND PADI
              AMERICAS, INC., AND ALL RELATED ENTITIES AND RELEASED PARTIES AS
              DEFINED ABOVE, FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR
              PERSONAL INJURY, PROPERTY DAMAGE OR WRONGFUL DEATH HOWEVER CAUSED,
              INCLUDING, BUT NOT LIMITED TO, THE NEGLIGENCE OF THE RELEASED
              PARTIES, WHETHER PASSIVE OR ACTIVE.
            </p>

            <p className="mb-6 no-split">
              I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS NON-AGENCY
              DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT, LIABILITY RELEASE AND
              ASSUMPTION OF RISK AGREEMENT, DIVER MEDICAL AND STANDARD SAFE
              DIVING PRACTICES STATEMENT OF UNDERSTANDING BY READING THEM BEFORE
              SIGNING BELOW ON BEHALF OF MYSELF AND MY HEIRS.
            </p>

            <div className="mt-8 w-full space-y-6 no-split"> {/* Added no-split */}
              <div className="flex gap-10 signature-block no-split"> {/* Added no-split */}
                <div className="flex-5 w-full">
                  <label className="block font-semibold mb-1">
                    Participant Signature:
                  </label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => {
                      setSignature(e.target.value);
                      if (errors.signature && e.target.value.trim()) {
                        setErrors({ ...errors, signature: false });
                      }
                    }}
                    placeholder="Signature"
                    autoComplete="off"
                    className={`border-b ${errors.signature ? "border-red-500 bg-red-50" : "border-black"} w-full h-12 px-1 bg-transparent focus:outline-none text-xl italic`}
                    style={{ fontFamily: "cursive" }}
                  />
                </div>
                <div className="flex-2">
                  <label className="block text-sm mb-1">
                    Date (MM/DD/YYYY):
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => {
                      // setDate(e.target.value);
                      if (errors.date && e.target.value.trim()) {
                        setErrors({ ...errors, date: false });
                      }
                    }}
                    placeholder="MM/DD/YYYY"
                    className={`border-b ${errors.date ? "border-red-500 bg-red-50" : "border-black"} w-full h-12 px-1 bg-transparent focus:outline-none`}
                  />
                </div>
              </div>

              <div className="flex gap-10 signature-block no-split"> {/* Added no-split */}
                <div className="flex-5 w-full">
                  <div>
                    <label className="block text-sm mb-1">
                      Parent/Guardian Signature (if applicable):
                    </label>
                    <input
                      type="text"
                      value={guardianSignature}
                      onChange={(e) => setGuardianSignature(e.target.value)}
                      placeholder="Parent/Guardian Signature"
                      className="border-b border-black w-full h-12 px-1 bg-transparent focus:outline-none text-xl italic"
                      style={{ fontFamily: "cursive" }}
                    />
                  </div>
                </div>
                <div className="flex-2">
                  <label className="block text-sm mb-1">
                    Date (DD/MM/YYYY):
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => {
                      // setDate(e.target.value);
                      if (errors.date && e.target.value.trim()) {
                        setErrors({ ...errors, date: false });
                      }
                    }}
                    placeholder="DD/MM/YYYY"
                    className={`border-b ${errors.date ? "border-red-500 bg-red-50" : "border-black"} w-full h-12 px-1 bg-transparent focus:outline-none `}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between text-xs italic mt-6 no-split"> {/* Added no-split */}
              <p className=""></p> <p className="">Version 2.0</p>{" "}
              <p className="">Page 2 of 2-© PADI 2021</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-xl mt-6 mx-auto mb-4 no-print">
        <button
          onClick={handlePrint}
          disabled={isGeneratingPDF}
          className={`font-bold py-3 px-6 rounded-lg cursor-pointer transition duration-200 w-full ${isGeneratingPDF
            ? "bg-gray-400 cursor-not-allowed text-gray-700"
            : "bg-primary hover:bg-teal-700 text-white"
            }`}
        >
          {isGeneratingPDF ? "Generating PDF..." : "Submit Form "}
        </button>
      </div>
    </div>
  );
}
