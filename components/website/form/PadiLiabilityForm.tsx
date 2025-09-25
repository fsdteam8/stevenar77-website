// "use client";

// import Image from "next/image";
// import { useState } from "react";

// export default function PadiLiabilityForm() {
//   const [participantName, setParticipantName] = useState("");
//   const [signature, setSignature] = useState("");
//   const [guardianSignature, setGuardianSignature] = useState("");
//   const [date, setDate] = useState("");

//   return (
//     <section className="  p-5">
//       <div className="max-w-6xl mx-auto bg-white p-10 text-sm leading-relaxed font-serif shadow">
//         {/*  Added PADI logo and proper header styling to match screenshot */}
//         <div className="flex items-start  pb-4">
//           <div className="mr-6 flex justify-between items-center">
//             <Image
//               src={"/images/pdf-logo.png"}
//               alt="Padi logo"
//               width={200}
//               height={200}
//             />

//             <div className="flex flex-col">
//               <div className="">
//                 {" "}
//                 <h1 className="text-center font-bold text-xl  mb-1">
//                   Release of Liability/Assumption of Risk/Non-agency
//                   Acknowledgment Form
//                 </h1>
//                 <h2 className="text-center text-4xl font-bold mb-4">
//                   Continuing Education Administrative Document
//                 </h2>
//                 <hr className="my-2 border-2 border-gray-900" />
//                 <p className="capitalize text-center font-bold text-2xl mb-6">
//                   NOTE: Also complete and attach the Diver Medical Form (Product No. 10346)
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ---------------- Page 1 ---------------- */}

//         <div className="flex">
//           <div className="flex-1 pr-4">
//             <p className="mb-4">
//               This is a statement in which you are informed of the established
//               safe diving practices for skin and scuba diving. These practices
//               have been compiled for your review and acknowledgment and are
//               intended to increase your comfort and safety in diving.{" "}
//               <strong>Your signature on this statement is required</strong> as
//               proof that you are aware of these safe diving practices. Read and
//               discuss the statement prior to signing it. If you are a minor,
//               this form must also be signed by a parent or guardian.
//             </p>

//             <p className="mb-2">
//               I,{" "}
//               <input
//                 type="text"
//                 value={participantName}
//                 onChange={(e) => setParticipantName(e.target.value)}
//                 placeholder="Participant Name"
//                 className="border-b border-black w-72 px-1"
//               />{" "}
//               understand that as a diver I should:
//             </p>

//             <ol className="ml-6 space-y-2 !list-decimal">
//               <li>
//                 Maintain good mental and physical fitness for diving. Avoid
//                 being under the influence of alcohol or dangerous drugs when
//                 diving. Keep proficient in diving skills, striving to increase
//                 them through continuing education and reviewing them in
//                 controlled conditions after a period of diving inactivity, and
//                 refer to my course materials to stay current and refresh myself
//                 on important information.
//               </li>
//               <li>
//                 Be familiar with my dive sites. If not, obtain a formal diving
//                 orientation from a knowledgeable, local source. If diving
//                 conditions are worse than those in which I am experienced,
//                 postpone diving or select an alternate site with better
//                 conditions. Engage only in diving activities consistent with my
//                 training and experience. Do not engage in cave or technical
//                 diving unless specifically trained to do so.
//               </li>
//               <li>
//                 Use complete, well-maintained, reliable equipment with which I
//                 am familiar, and inspect it for correct fit and function prior
//                 to each dive. Have a buoyancy control device, low-pressure
//                 buoyancy control inflation system, submersible pressure gauge
//                 and alternate air source and dive planning/monitoring device
//                 (dive computer, RDP/dive tables—whichever you are trained to
//                 use) when scuba diving. Deny use of my equipment to uncertified
//                 divers.
//               </li>
//               <li>
//                 Listen carefully to dive briefings and directions and respect
//                 the advice of those supervising my diving activities. Recognize
//                 that additional training is recommended for participation in
//                 specialty diving activities, in other geographic areas and after
//                 periods of inactivity that exceed six months.
//               </li>
//             </ol>
//           </div>

//           <div className="flex-1 pl-4">
//             <ol className="ml-6 space-y-2 !list-decimal " start={5}>
//               <li>
//                 Adhere to the buddy system throughout every dive. Plan dives –
//                 including communications, procedures for reuniting in case of
//                 separation and emergency procedures – with my buddy.
//               </li>
//               <li>
//                 Be proficient in dive planning (dive computer or dive table
//                 use). Make all dives no decompression dives and allow a margin
//                 of safety. Have a means to monitor depth and time underwater.
//                 Limit maximum depth to my level of training and experience.
//                 Ascend at a rate of not more than 18 metres/60 feet per minute.
//                 Be a SAFE diver – Slowly Ascend From Every dive. Make a safety
//                 stop as an added precaution, usually at 5 metres/15 feet for
//                 three minutes or longer.
//               </li>
//               <li>
//                 Maintain proper buoyancy. Adjust weighting at the surface for
//                 neutral buoyancy with no air in my buoyancy control device.
//                 Maintain neutral buoyancy while underwater. Be buoyant for
//                 surface swimming and resting. Have weights clear for easy
//                 removal, and establish buoyancy when in distress while diving.
//                 Carry at least one surface signaling device (such as signal
//                 tube, whistle, mirror).
//               </li>
//               <li>
//                 Breathe properly for diving. Never breath-hold or skip-breathe
//                 when breathing compressed air, and avoid excessive
//                 hyperventilation when breath-hold diving. Avoid overexertion
//                 while in and underwater and dive within my limitations.
//               </li>
//               <li>
//                 Use a boat, float or other surface support station, whenever
//                 feasible.
//               </li>
//               <li>
//                 Know and obey local dive laws and regulations, including fish
//                 and game and dive flag laws. I have read the above statements
//                 and have had any questions answered to my satisfaction.
//               </li>
//             </ol>

//             <p className="mt-4">
//               I understand the importance and purposes of these established
//               practices. I recognize they are for my own safety and well-being,
//               and that failure to adhere to them can place me in jeopardy when
//               diving.
//             </p>
//           </div>
//         </div>

//         <hr className="my-2 border-2 border-gray-900" />
//         <h3 className="text-center font-bold mt-6 mb-2">
//           NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT
//         </h3>

//         <p className="mb-4">
//           I understand and agree that PADI Members (“Members”), including{" "}
//           <span className="border-b-2 border-gray-900 text-xl  font-bold px-2">
//             Scuba Life & their instructors
//           </span>{" "}
//           and/or any individual PADI Instructors and Divemasters associated with
//           the program in which I am participating, are licensed to use various
//           PADI Trademarks and to conduct PADI training, but are not agents,
//           employees or franchisees of PADI Americas, Inc, or its parent,
//           subsidiary and affiliated corporations (“PADI”). I further understand
//           that Member business activities are independent, and are neither owned
//           nor operated by PADI, and that while PADI establishes the standards
//           for PADI diver training programs, it is not responsible for, nor does
//           it have the right to control, the operation of the Members&apos;
//           business activities and the day-to-day conduct of PADI programs and
//           supervision of divers by the Members or their associated staff. I
//           further understand and agree on behalf of myself, my heirs and my
//           estate that in the event of an injury or death during this activity,
//           neither I nor my estate shall seek to hold PADI liable for the
//           actions, inactions or negligence of
//           <span className="border-b-2 border-gray-900 text-xl  font-bold px-2">
//             Scuba Life & their instructors
//           </span>{" "}
//           and/or the instructors and divemasters associated with the activity.
//         </p>

//         <p className="text-xs italic mt-6">
//           Product No. 10038 (Rev. 02/21) Version 2.0 — Page 1 of 2 © PADI 2021
//         </p>

//         {/* ---------------- Page 2 ---------------- */}
//         <div className="mt-12 border-t pt-8">
//           <h2 className="text-center font-bold uppercase mb-4">
//             Liability Release and Assumption of Risk Agreement
//           </h2>

//           <div className="flex">
//             <div className="flex-1 pr-4">
//               <p className="mb-4">
//                 I,{" "}
//                 <input
//                   type="text"
//                   value={participantName}
//                   onChange={(e) => setParticipantName(e.target.value)}
//                   placeholder="Participant Name"
//                   className="border-b border-black w-40 px-1"
//                 />{" "}
//                 hereby affirm that I am aware that skin and scuba diving have
//                 inherent risks which may result in serious injury or death. I
//                 understand that diving with compressed air involves certain
//                 inherent risks; including but not limited to decompression
//                 sickness, embolism or other hyperbaric/air expansion injury that
//                 require treatment in a recompression chamber. I further
//                 understand that the open water diving trips which are necessary
//                 for training and for certification may be conducted at a site
//                 that is remote, either by time or distance or both, from such a
//                 recompression chamber. I still choose to proceed with such dives
//                 in spite of the possible absence of a recompression chamber in
//                 proximity to the dive site.
//               </p>

//               <p className="mb-4">
//                 I understand this Liability Release and Assumption of Risk
//                 Agreement (Agreement) hereby encompasses and applies to all
//                 diver training activities and courses in which I choose to
//                 participate. These activities and courses may include, but are
//                 not limited to, altitude, boat, cavern, AWARE, deep, enriched
//                 air, photography/videography, diver propulsion vehicle, drift,
//                 dry suit, ice, multilevel, night, peak performance buoyancy,
//                 search & recovery, rebreather, underwater naturalist, navigator,
//                 wreck, adventure diver, rescue diver and other distinctive
//                 specialties (hereinafter “Programs”).
//               </p>

//               <p className="mb-4">
//                 I understand and agree that neither my instructor(s),
//                 divemasters(s), the facility which provides the Programs{" "}
//                 <span className="border-b-2 border-gray-900 text-xl font-bold px-2">
//                   Scuba Life & their instructors
//                 </span>
//                 nor PADI Americas, Inc., nor its affiliate and subsidiary
//                 corporations, nor any of their respective employees, officers,
//                 agents, contractors or assigns (hereinafter referred to as
//                 “Released Parties”) may be held liable or responsible in any way
//                 for any injury, death or other damages to me, my family, estate,
//                 heirs or assigns that may occur as a result of my participation
//                 in the Programs or as a result of the negligence of any party,
//                 including the Released Parties, whether passive or active.
//               </p>

//               <p className="mb-4">
//                 In consideration of being allowed to participate in the
//                 Programs, I hereby personally assume all risks of the Programs,
//                 whether foreseen or unforeseen, that may befall me while I am a
//                 participant in the Programs including, but not limited to, the
//                 academics, confined water and/or open water activities. I
//                 further release, exempt and hold harmless said Programs and
//                 Released Parties from any claim or lawsuit by me, my family,
//                 estate, heirs or assigns, arising out of my enrollment and
//                 participation in this program including both claims arising
//                 during the program or after I receive my certification(s).
//               </p>
//             </div>

//             <div className="flex-1 pl-4">
//               <p className="mb-4">
//                 I understand that past or present medical conditions may be
//                 contraindicative to my participation in the Programs. I declare
//                 that I am in good mental and physical fitness for diving, and
//                 that I am not under the influence of alcohol, nor am I under the
//                 influence of any drugs that are contraindicated to diving. If I
//                 am taking medication, I declare that I have seen a physician and
//                 have approval to dive while under the influence of the
//                 medication/drugs. I affirm it is my responsibility to inform my
//                 instructor of any and all changes to my health condition at any
//                 time during my participation in the Programs and agree to accept
//                 responsibility for my failure to do so.
//               </p>

//               <p className="mb-4">
//                 I also understand that skin diving and scuba diving are
//                 physically strenuous activities and that I will be exerting
//                 myself during this program, and that if I am injured as a result
//                 of heart attack, panic, hyperventilation, drowning or any other
//                 cause, that I expressly assume the risk of said injuries and
//                 that I will not hold the Released Parties responsible for the
//                 same.
//               </p>

//               <p className="mb-4">
//                 I further state that I am of lawful age and legally competent to
//                 sign this Liability Release and Assumption of Risk Agreement, or
//                 that I have acquired the written consent of my parent or
//                 guardian. I understand the terms herein are contractual and not
//                 a mere recital, and that I have signed this Agreement of my own
//                 free act and with the knowledge that I hereby agree to waive my
//                 legal rights. I further agree that if any provision of this
//                 Agreement is found to be unenforceable or invalid, that
//                 provision shall be severed from this Agreement. The remainder of
//                 this Agreement will then be construed as though the
//                 unenforceable provision had never been contained herein.
//               </p>

//               <p className="mb-4">
//                 I hereby state and agree this Agreement will be effective for
//                 all activities associated with the Programs in which I
//                 participate within one year from the date on which I sign this
//                 Agreement. I understand and agree that I am not only giving up
//                 my right to sue the Released Parties but also any rights my
//                 heirs, assigns, or beneficiaries may have to sue the Released
//                 Parties resulting from my death. I further represent I have the
//                 authority to do so and that my heirs, assigns, or beneficiaries
//                 will be estopped from claiming otherwise because of my
//                 representations to the Released Parties.
//               </p>
//             </div>
//           </div>

//           <hr className="my-2 border-2 border-gray-900" />
//           <p className="mb-4">
//             I,{" "}
//             <input
//               type="text"
//               value={participantName}
//               onChange={(e) => setParticipantName(e.target.value)}
//               placeholder="Participant Name"
//               className="border-b border-black w-40 px-1"
//             />{" "}
//             HAVE COMPLETED THE ATTACHED DIVER MEDICAL FORM (10346) AND I AFFIRM
//             IT IS MY RESPONSIBILITY TO INFORM MY INSTRUCTOR OF ANY AND ALL
//             CHANGES TO MEDICAL HISTORY AT ANY TIME DURING MY PARTICIPATION IN
//             SCUBA PROGRAMS. I AGREE TO ACCEPT RESPONSIBILITY FOR OMISSIONS
//             REGARDING MY FAILURE TO DISCLOSE ANY EXISTING OR PAST HEALTH
//             CONDITION, OR ANY CHANGES THERETO.
//           </p>

//           <p className="mb-4">
//             I,{" "}
//             <input
//               type="text"
//               value={participantName}
//               onChange={(e) => setParticipantName(e.target.value)}
//               placeholder="Participant Name"
//               className="border-b border-black w-40 px-1"
//             />{" "}
//             BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE MY INSTRUCTORS,
//             DIVEMASTERS, THE FACILITY WHICH OFFERS THE PROGRAMS AND PADI
//             AMERICAS, INC., AND ALL RELATED ENTITIES AND RELEASED PARTIES AS
//             DEFINED ABOVE, FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR
//             PERSONAL INJURY, PROPERTY DAMAGE OR WRONGFUL DEATH HOWEVER CAUSED,
//             INCLUDING, BUT NOT LIMITED TO, THE NEGLIGENCE OF THE RELEASED
//             PARTIES, WHETHER PASSIVE OR ACTIVE.
//           </p>

//           <p className="mb-6">
//             I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS NON-AGENCY
//             DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT, LIABILITY RELEASE AND
//             ASSUMPTION OF RISK AGREEMENT, DIVER MEDICAL AND STANDARD SAFE DIVING
//             PRACTICES STATEMENT OF UNDERSTANDING BY READING THEM BEFORE SIGNING
//             BELOW ON BEHALF OF MYSELF AND MY HEIRS.
//           </p>

//           {/* ---------------- Signature Section ---------------- */}
//           <div className="mt-8 w-full space-y-6">
//             <div className="flex gap-5">
//               <div className="">
//                 <label className="block font-semibold mb-1">
//                   Participant Signature:
//                 </label>
//                 <input
//                   type="text"
//                   value={signature}
//                   onChange={(e) => setSignature(e.target.value)}
//                   placeholder="Signature"
//                   className="border-b border-black w-72 px-1"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1">Date (DD/MM/YYYY):</label>
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="border-b border-black w-40 px-1"
//                 />
//               </div>
//             </div>

//             <div className="flex space-x-12">
//               <div>
//                 <label className="block text-sm mb-1">
//                   Parent/Guardian Signature (if applicable):
//                 </label>
//                 <input
//                   type="text"
//                   value={guardianSignature}
//                   onChange={(e) => setGuardianSignature(e.target.value)}
//                   placeholder="Parent/Guardian Signature"
//                   className="border-b border-black w-72 px-1"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1">Date (DD/MM/YYYY):</label>
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="border-b border-black w-40 px-1"
//                 />
//               </div>
//             </div>
//           </div>

//           <p className="text-xs italic mt-6">
//             Page 2 of 2 — Release of Liability/Assumption of Risk/Non-agency
//             Acknowledgment Form
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }










// "use client";

// import Image from "next/image";
// import { useState, useRef } from "react";

// export default function PadiLiabilityForm() {
//   const [participantName, setParticipantName] = useState("");
//   const [signature, setSignature] = useState("");
//   const [guardianSignature, setGuardianSignature] = useState("");
//   const [date, setDate] = useState("");

//   const formRef = useRef<HTMLDivElement>(null);

//   const handlePrint = () => {
//     if (!participantName || !signature || !date) {
//       alert(
//         "Please fill in required fields: Participant Name, Signature, Date",
//       );
//       return;
//     }
//     window.print();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-6">
//       {/* Print Button */}
//       <div className="max-w-6xl mx-auto mb-4 no-print">
//         <button
//           onClick={handlePrint}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 w-full"
//         >
//           Print / Save as PDF
//         </button>
//       </div>

//       {/* Form Content */}
//       <div
//         ref={formRef}
//         className="print-area max-w-6xl mx-auto bg-white p-10 text-sm leading-relaxed font-serif shadow"
//       >
//         {/* ---------------- Page 1 ---------------- */}
//         <div className="flex items-center pb-4">
//           <div className="mr-6 flex-shrink-0">
//             <Image
//               src={"/images/pdf-logo.png"}
//               alt="Padi logo"
//               width={200}
//               height={200}
//             />
//           </div>
//           <div className="flex-1">
//             <div>
//               <h1 className="text-center font-bold text-xl mb-1">
//                 Release of Liability/Assumption of Risk/Non-agency
//                 Acknowledgment Form
//               </h1>
//               <h2 className="text-center text-4xl font-bold mb-4">
//                 Continuing Education Administrative Document
//               </h2>
//               <hr className="my-2 border-2 border-gray-900" />
//               <p className="capitalize text-center font-bold text-2xl mb-6">
//                 NOTE: Also complete and attach the Diver Medical Form (Product
//                 No. 10346)
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex">
//           <div className="flex-1 pr-4">
//             <p className="mb-4">
//               This is a statement in which you are informed of the established
//               safe diving practices for skin and scuba diving. These practices
//               have been compiled for your review and acknowledgment and are
//               intended to increase your comfort and safety in diving.{" "}
//               <strong>Your signature on this statement is required</strong> as
//               proof that you are aware of these safe diving practices. Read and
//               discuss the statement prior to signing it. If you are a minor,
//               this form must also be signed by a parent or guardian.
//             </p>

//             <p className="mb-2">
//               I,{" "}
//               <input
//                 type="text"
//                 value={participantName}
//                 onChange={(e) => setParticipantName(e.target.value)}
//                 placeholder="Participant Name"
//                 className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
//               />{" "}
//               understand that as a diver I should:
//             </p>

//             <ol className="!list-decimal ml-6 space-y-2">
//               <li>
//                 Maintain good mental and physical fitness for diving. Avoid
//                 being under the influence of alcohol or dangerous drugs when
//                 diving. Keep proficient in diving skills, striving to increase
//                 them through continuing education and reviewing them in
//                 controlled conditions after a period of diving inactivity, and
//                 refer to my course materials to stay current and refresh myself
//                 on important information.
//               </li>
//               <li>
//                 Be familiar with my dive sites. If not, obtain a formal diving
//                 orientation from a knowledgeable, local source. If diving
//                 conditions are worse than those in which I am experienced,
//                 postpone diving or select an alternate site with better
//                 conditions. Engage only in diving activities consistent with my
//                 training and experience. Do not engage in cave or technical
//                 diving unless specifically trained to do so.
//               </li>
//               <li>
//                 Use complete, well-maintained, reliable equipment with which I
//                 am familiar, and inspect it for correct fit and function prior
//                 to each dive. Have a buoyancy control device, low-pressure
//                 buoyancy control inflation system, submersible pressure gauge
//                 and alternate air source and dive planning/monitoring device
//                 (dive computer, RDP/dive tables—whichever you are trained to
//                 use) when scuba diving. Deny use of my equipment to uncertified
//                 divers.
//               </li>
//               <li>
//                 Listen carefully to dive briefings and directions and respect
//                 the advice of those supervising my diving activities. Recognize
//                 that additional training is recommended for participation in
//                 specialty diving activities, in other geographic areas and after
//                 periods of inactivity that exceed six months.
//               </li>
//             </ol>
//           </div>
//           <div className="flex-1 pr-4">
//             <ol className="!list-decimal ml-6 space-y-2" start={5}>
//               <li>
//                 Adhere to the buddy system throughout every dive. Plan dives –
//                 including communications, procedures for reuniting in case of
//                 separation and emergency procedures – with my buddy.
//               </li>
//               <li>
//                 Be proficient in dive planning (dive computer or dive table
//                 use). Make all dives no decompression dives and allow a margin
//                 of safety. Have a means to monitor depth and time underwater.
//                 Limit maximum depth to my level of training and experience.
//                 Ascend at a rate of not more than 18 metres/60 feet per minute.
//                 Be a SAFE diver – Slowly Ascend From Every dive. Make a safety
//                 stop as an added precaution, usually at 5 metres/15 feet for
//                 three minutes or longer.
//               </li>
//               <li>
//                 Maintain proper buoyancy. Adjust weighting at the surface for
//                 neutral buoyancy with no air in my buoyancy control device.
//                 Maintain neutral buoyancy while underwater. Be buoyant for
//                 surface swimming and resting. Have weights clear for easy
//                 removal, and establish buoyancy when in distress while diving.
//                 Carry at least one surface signaling device (such as signal
//                 tube, whistle, mirror).
//               </li>
//               <li>
//                 Breathe properly for diving. Never breath-hold or skip-breathe
//                 when breathing compressed air, and avoid excessive
//                 hyperventilation when breath-hold diving. Avoid overexertion
//                 while in and underwater and dive within my limitations.
//               </li>
//               <li>
//                 Use a boat, float or other surface support station, whenever
//                 feasible.
//               </li>
//               <li>
//                 Know and obey local dive laws and regulations, including fish
//                 and game and dive flag laws. I have read the above statements
//                 and have had any questions answered to my satisfaction.
//               </li>
//             </ol>

//             <p className="mt-4">
//               I understand the importance and purposes of these established
//               practices. I recognize they are for my own safety and well-being,
//               and that failure to adhere to them can place me in jeopardy when
//               diving.
//             </p>
//           </div>
//         </div>

//         <h3 className="text-center font-bold mt-6 mb-2">
//           NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT
//         </h3>

//         <p>
//           I understand and agree that PADI Members (“Members”), including{" "}
//           <span className="border-b-2 border-gray-900 text-xl font-bold px-2">
//             Scuba Life & their instructors
//           </span>{" "}
//           and/or any individual PADI Instructors and Divemasters associated with
//           the program in which I am participating, are licensed to use various
//           PADI Trademarks and to conduct PADI training, but are not agents,
//           employees or franchisees of PADI Americas, Inc, or its parent,
//           subsidiary and affiliated corporations (“PADI”). I further understand
//           that Member business activities are independent, and are neither owned
//           nor operated by PADI...
//         </p>

//         <p className="text-xs italic mt-6">
//           Product No. 10038 (Rev. 02/21) Version 2.0 — Page 1 of 2 © PADI 2021
//         </p>

//         {/* ---------------- Page 2 ---------------- */}
//         <div className="mt-12 border-t pt-8">
//           <h2 className="text-center font-bold uppercase mb-4">
//             Liability Release and Assumption of Risk Agreement
//           </h2>

//           <div className="flex">
//             <div className="flex-1 pr-4">
//               <p className="mb-4">
//                 I,{" "}
//                 <input
//                   type="text"
//                   value={participantName}
//                   onChange={(e) => setParticipantName(e.target.value)}
//                   placeholder="Participant Name"
//                   className="border-b border-black w-40 px-1"
//                 />{" "}
//                 hereby affirm that I am aware that skin and scuba diving have
//                 inherent risks which may result in serious injury or death. I
//                 understand that diving with compressed air involves certain
//                 inherent risks; including but not limited to decompression
//                 sickness, embolism or other hyperbaric/air expansion injury that
//                 require treatment in a recompression chamber. I further
//                 understand that the open water diving trips which are necessary
//                 for training and for certification may be conducted at a site
//                 that is remote, either by time or distance or both, from such a
//                 recompression chamber. I still choose to proceed with such dives
//                 in spite of the possible absence of a recompression chamber in
//                 proximity to the dive site.
//               </p>

//               <p className="mb-4">
//                 I understand this Liability Release and Assumption of Risk
//                 Agreement (Agreement) hereby encompasses and applies to all
//                 diver training activities and courses in which I choose to
//                 participate. These activities and courses may include, but are
//                 not limited to, altitude, boat, cavern, AWARE, deep, enriched
//                 air, photography/videography, diver propulsion vehicle, drift,
//                 dry suit, ice, multilevel, night, peak performance buoyancy,
//                 search & recovery, rebreather, underwater naturalist, navigator,
//                 wreck, adventure diver, rescue diver and other distinctive
//                 specialties (hereinafter “Programs”).
//               </p>

//               <p className="mb-4">
//                 I understand and agree that neither my instructor(s),
//                 divemasters(s), the facility which provides the Programs{" "}
//                 <span className="border-b-2 border-gray-900 text-xl font-bold px-2">
//                   Scuba Life & their instructors
//                 </span>
//                 nor PADI Americas, Inc., nor its affiliate and subsidiary
//                 corporations, nor any of their respective employees, officers,
//                 agents, contractors or assigns (hereinafter referred to as
//                 “Released Parties”) may be held liable or responsible in any way
//                 for any injury, death or other damages to me, my family, estate,
//                 heirs or assigns that may occur as a result of my participation
//                 in the Programs or as a result of the negligence of any party,
//                 including the Released Parties, whether passive or active.
//               </p>

//               <p className="mb-4">
//                 In consideration of being allowed to participate in the
//                 Programs, I hereby personally assume all risks of the Programs,
//                 whether foreseen or unforeseen, that may befall me while I am a
//                 participant in the Programs including, but not limited to, the
//                 academics, confined water and/or open water activities. I
//                 further release, exempt and hold harmless said Programs and
//                 Released Parties from any claim or lawsuit by me, my family,
//                 estate, heirs or assigns, arising out of my enrollment and
//                 participation in this program including both claims arising
//                 during the program or after I receive my certification(s).
//               </p>
//             </div>

//             <div className="flex-1 pl-4">
//               <p className="mb-4">
//                 I understand that past or present medical conditions may be
//                 contraindicative to my participation in the Programs. I declare
//                 that I am in good mental and physical fitness for diving, and
//                 that I am not under the influence of alcohol, nor am I under the
//                 influence of any drugs that are contraindicated to diving. If I
//                 am taking medication, I declare that I have seen a physician and
//                 have approval to dive while under the influence of the
//                 medication/drugs. I affirm it is my responsibility to inform my
//                 instructor of any and all changes to my health condition at any
//                 time during my participation in the Programs and agree to accept
//                 responsibility for my failure to do so.
//               </p>

//               <p className="mb-4">
//                 I also understand that skin diving and scuba diving are
//                 physically strenuous activities and that I will be exerting
//                 myself during this program, and that if I am injured as a result
//                 of heart attack, panic, hyperventilation, drowning or any other
//                 cause, that I expressly assume the risk of said injuries and
//                 that I will not hold the Released Parties responsible for the
//                 same.
//               </p>

//               <p className="mb-4">
//                 I further state that I am of lawful age and legally competent to
//                 sign this Liability Release and Assumption of Risk Agreement, or
//                 that I have acquired the written consent of my parent or
//                 guardian. I understand the terms herein are contractual and not
//                 a mere recital, and that I have signed this Agreement of my own
//                 free act and with the knowledge that I hereby agree to waive my
//                 legal rights. I further agree that if any provision of this
//                 Agreement is found to be unenforceable or invalid, that
//                 provision shall be severed from this Agreement. The remainder of
//                 this Agreement will then be construed as though the
//                 unenforceable provision had never been contained herein.
//               </p>

//               <p className="mb-4">
//                 I hereby state and agree this Agreement will be effective for
//                 all activities associated with the Programs in which I
//                 participate within one year from the date on which I sign this
//                 Agreement. I understand and agree that I am not only giving up
//                 my right to sue the Released Parties but also any rights my
//                 heirs, assigns, or beneficiaries may have to sue the Released
//                 Parties resulting from my death. I further represent I have the
//                 authority to do so and that my heirs, assigns, or beneficiaries
//                 will be estopped from claiming otherwise because of my
//                 representations to the Released Parties.
//               </p>
//             </div>
//           </div>

//           <hr className="my-2 border-2 border-gray-900" />
//           <p className="mb-4">
//             I,{" "}
//             <input
//               type="text"
//               value={participantName}
//               onChange={(e) => setParticipantName(e.target.value)}
//               placeholder="Participant Name"
//               className="border-b border-black w-40 px-1"
//             />{" "}
//             HAVE COMPLETED THE ATTACHED DIVER MEDICAL FORM (10346) AND I AFFIRM
//             IT IS MY RESPONSIBILITY TO INFORM MY INSTRUCTOR OF ANY AND ALL
//             CHANGES TO MEDICAL HISTORY AT ANY TIME DURING MY PARTICIPATION IN
//             SCUBA PROGRAMS. I AGREE TO ACCEPT RESPONSIBILITY FOR OMISSIONS
//             REGARDING MY FAILURE TO DISCLOSE ANY EXISTING OR PAST HEALTH
//             CONDITION, OR ANY CHANGES THERETO.
//           </p>

//           <p className="mb-4">
//             I,{" "}
//             <input
//               type="text"
//               value={participantName}
//               onChange={(e) => setParticipantName(e.target.value)}
//               placeholder="Participant Name"
//               className="border-b border-black w-40 px-1"
//             />{" "}
//             BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE MY INSTRUCTORS,
//             DIVEMASTERS, THE FACILITY WHICH OFFERS THE PROGRAMS AND PADI
//             AMERICAS, INC., AND ALL RELATED ENTITIES AND RELEASED PARTIES AS
//             DEFINED ABOVE, FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR
//             PERSONAL INJURY, PROPERTY DAMAGE OR WRONGFUL DEATH HOWEVER CAUSED,
//             INCLUDING, BUT NOT LIMITED TO, THE NEGLIGENCE OF THE RELEASED
//             PARTIES, WHETHER PASSIVE OR ACTIVE.
//           </p>

//           <p className="mb-6">
//             I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS NON-AGENCY
//             DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT, LIABILITY RELEASE AND
//             ASSUMPTION OF RISK AGREEMENT, DIVER MEDICAL AND STANDARD SAFE DIVING
//             PRACTICES STATEMENT OF UNDERSTANDING BY READING THEM BEFORE SIGNING
//             BELOW ON BEHALF OF MYSELF AND MY HEIRS.
//           </p>

//           {/* shortened for brevity but should include full 2nd page text */}

//           <div className="mt-8 space-y-6">
//             <div className="flex gap-10">
//               <div>
//                 <label className="block font-semibold mb-1">
//                   Participant Signature:
//                 </label>
//                 <input
//                   type="text"
//                   value={signature}
//                   onChange={(e) => setSignature(e.target.value)}
//                   placeholder="Signature"
//                   className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1">Date (DD/MM/YYYY):</label>
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   placeholder="DD/MM/YYYY"
//                   className="border-b border-black w-40 px-1 bg-transparent focus:outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm mb-1">
//                 Parent/Guardian Signature (if applicable):
//               </label>
//               <input
//                 type="text"
//                 value={guardianSignature}
//                 onChange={(e) => setGuardianSignature(e.target.value)}
//                 placeholder="Parent/Guardian Signature"
//                 className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
//               />
//             </div>
//           </div>

//           <p className="text-xs italic mt-6">
//             Page 2 of 2 — Release of Liability/Assumption of Risk/Non-agency
//             Acknowledgment Form
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }









// "use client";

// import Image from "next/image";
// import { useState, useRef } from "react";

// export default function PadiLiabilityForm() {
//   const [participantName, setParticipantName] = useState("");
//   const [signature, setSignature] = useState("");
//   const [guardianSignature, setGuardianSignature] = useState("");
//   const [date, setDate] = useState("");
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

//   const formRef = useRef<HTMLDivElement>(null);

//   const handlePrint = async () => {
//     if (!participantName || !signature || !date) {
//       alert(
//         "Please fill in required fields: Participant Name, Signature, Date",
//       );
//       return;
//     }

//     setIsGeneratingPDF(true);

//     try {
//       // Dynamically import the libraries
//       const html2canvas = (await import('html2canvas')).default;
//       const jsPDF = (await import('jspdf')).jsPDF;

//       if (!formRef.current) {
//         throw new Error("Form reference not found");
//       }

//       // Configure html2canvas options for better quality
//       const canvas = await html2canvas(formRef.current, {
//         scale: 2, // Higher scale for better quality
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: '#ffffff',
//         width: formRef.current.scrollWidth,
//         height: formRef.current.scrollHeight,
//       });

//       const imgData = canvas.toDataURL('image/png');
      
//       // Create PDF with A4 dimensions
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
//       // Calculate dimensions to fit the content
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;
//       const ratio = canvasWidth / canvasHeight;
      
//       let imgWidth = pdfWidth;
//       let imgHeight = pdfWidth / ratio;
      
//       // If height exceeds page height, scale down
//       if (imgHeight > pdfHeight) {
//         imgHeight = pdfHeight;
//         imgWidth = pdfHeight * ratio;
//       }
      
//       // Center the image on the page
//       const x = (pdfWidth - imgWidth) / 2;
//       const y = (pdfHeight - imgHeight) / 2;
      
//       pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      
//       // Save the PDF
//       const fileName = `PADI_Liability_Form_${participantName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
//       pdf.save(fileName);
      
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Error generating PDF. Please try again or use the browser print function.');
//     } finally {
//       setIsGeneratingPDF(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-6">
//       {/* Print Button */}
//       <div className="max-w-6xl mx-auto mb-4 no-print">
//         <button
//           onClick={handlePrint}
//           disabled={isGeneratingPDF}
//           className={`font-bold py-3 px-6 rounded-lg transition duration-200 w-full ${
//             isGeneratingPDF 
//               ? 'bg-gray-400 cursor-not-allowed text-gray-700'
//               : 'bg-blue-600 hover:bg-blue-700 text-white'
//           }`}
//         >
//           {isGeneratingPDF ? 'Generating PDF...' : 'Export as PDF'}
//         </button>
//       </div>

//       {/* Form Content */}
//       <div
//         ref={formRef}
//         className="print-area max-w-6xl mx-auto bg-white p-10 text-sm leading-relaxed font-serif shadow"
//       >
//         {/* ---------------- Page 1 ---------------- */}
//         <div className="flex items-center pb-4">
//           <div className="mr-6 flex-shrink-0">
//             <Image
//               src={"/images/pdf-logo.png"}
//               alt="Padi logo"
//               width={200}
//               height={200}
//             />
//           </div>
//           <div className="flex-1">
//             <div>
//               <h1 className="text-center font-bold text-xl mb-1">
//                 Release of Liability/Assumption of Risk/Non-agency
//                 Acknowledgment Form
//               </h1>
//               <h2 className="text-center text-4xl font-bold mb-4">
//                 Continuing Education Administrative Document
//               </h2>
//               <hr className="my-2 border-2 border-gray-900" />
//               <p className="capitalize text-center font-bold text-2xl mb-6">
//                 NOTE: Also complete and attach the Diver Medical Form (Product
//                 No. 10346)
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex">
//           <div className="flex-1 pr-4">
//             <p className="mb-4">
//               This is a statement in which you are informed of the established
//               safe diving practices for skin and scuba diving. These practices
//               have been compiled for your review and acknowledgment and are
//               intended to increase your comfort and safety in diving.{" "}
//               <strong>Your signature on this statement is required</strong> as
//               proof that you are aware of these safe diving practices. Read and
//               discuss the statement prior to signing it. If you are a minor,
//               this form must also be signed by a parent or guardian.
//             </p>

//             <p className="mb-2">
//               I,{" "}
//               <input
//                 type="text"
//                 value={participantName}
//                 onChange={(e) => setParticipantName(e.target.value)}
//                 placeholder="Participant Name"
//                 className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
//               />{" "}
//               understand that as a diver I should:
//             </p>

//             <ol className="!list-decimal ml-6 space-y-2">
//               <li>
//                 Maintain good mental and physical fitness for diving. Avoid
//                 being under the influence of alcohol or dangerous drugs when
//                 diving. Keep proficient in diving skills, striving to increase
//                 them through continuing education and reviewing them in
//                 controlled conditions after a period of diving inactivity, and
//                 refer to my course materials to stay current and refresh myself
//                 on important information.
//               </li>
//               <li>
//                 Be familiar with my dive sites. If not, obtain a formal diving
//                 orientation from a knowledgeable, local source. If diving
//                 conditions are worse than those in which I am experienced,
//                 postpone diving or select an alternate site with better
//                 conditions. Engage only in diving activities consistent with my
//                 training and experience. Do not engage in cave or technical
//                 diving unless specifically trained to do so.
//               </li>
//               <li>
//                 Use complete, well-maintained, reliable equipment with which I
//                 am familiar, and inspect it for correct fit and function prior
//                 to each dive. Have a buoyancy control device, low-pressure
//                 buoyancy control inflation system, submersible pressure gauge
//                 and alternate air source and dive planning/monitoring device
//                 (dive computer, RDP/dive tables—whichever you are trained to
//                 use) when scuba diving. Deny use of my equipment to uncertified
//                 divers.
//               </li>
//               <li>
//                 Listen carefully to dive briefings and directions and respect
//                 the advice of those supervising my diving activities. Recognize
//                 that additional training is recommended for participation in
//                 specialty diving activities, in other geographic areas and after
//                 periods of inactivity that exceed six months.
//               </li>
//             </ol>
//           </div>
//           <div className="flex-1 pr-4">
//             <ol className="!list-decimal ml-6 space-y-2" start={5}>
//               <li>
//                 Adhere to the buddy system throughout every dive. Plan dives –
//                 including communications, procedures for reuniting in case of
//                 separation and emergency procedures – with my buddy.
//               </li>
//               <li>
//                 Be proficient in dive planning (dive computer or dive table
//                 use). Make all dives no decompression dives and allow a margin
//                 of safety. Have a means to monitor depth and time underwater.
//                 Limit maximum depth to my level of training and experience.
//                 Ascend at a rate of not more than 18 metres/60 feet per minute.
//                 Be a SAFE diver – Slowly Ascend From Every dive. Make a safety
//                 stop as an added precaution, usually at 5 metres/15 feet for
//                 three minutes or longer.
//               </li>
//               <li>
//                 Maintain proper buoyancy. Adjust weighting at the surface for
//                 neutral buoyancy with no air in my buoyancy control device.
//                 Maintain neutral buoyancy while underwater. Be buoyant for
//                 surface swimming and resting. Have weights clear for easy
//                 removal, and establish buoyancy when in distress while diving.
//                 Carry at least one surface signaling device (such as signal
//                 tube, whistle, mirror).
//               </li>
//               <li>
//                 Breathe properly for diving. Never breath-hold or skip-breathe
//                 when breathing compressed air, and avoid excessive
//                 hyperventilation when breath-hold diving. Avoid overexertion
//                 while in and underwater and dive within my limitations.
//               </li>
//               <li>
//                 Use a boat, float or other surface support station, whenever
//                 feasible.
//               </li>
//               <li>
//                 Know and obey local dive laws and regulations, including fish
//                 and game and dive flag laws. I have read the above statements
//                 and have had any questions answered to my satisfaction.
//               </li>
//             </ol>

//             <p className="mt-4">
//               I understand the importance and purposes of these established
//               practices. I recognize they are for my own safety and well-being,
//               and that failure to adhere to them can place me in jeopardy when
//               diving.
//             </p>
//           </div>
//         </div>

//         <h3 className="text-center font-bold mt-6 mb-2">
//           NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT
//         </h3>

//         <p>
//           I understand and agree that PADI Members ("Members"), including{" "}
//           <span className="border-b-2 border-gray-900 text-xl font-bold px-2">
//             Scuba Life & their instructors
//           </span>{" "}
//           and/or any individual PADI Instructors and Divemasters associated with
//           the program in which I am participating, are licensed to use various
//           PADI Trademarks and to conduct PADI training, but are not agents,
//           employees or franchisees of PADI Americas, Inc, or its parent,
//           subsidiary and affiliated corporations ("PADI"). I further understand
//           that Member business activities are independent, and are neither owned
//           nor operated by PADI...
//         </p>

//         <p className="text-xs italic mt-6">
//           Product No. 10038 (Rev. 02/21) Version 2.0 — Page 1 of 2 © PADI 2021
//         </p>

//         {/* ---------------- Page 2 ---------------- */}
//         <div className="mt-12 border-t pt-8">
//           <h2 className="text-center font-bold uppercase mb-4">
//             Liability Release and Assumption of Risk Agreement
//           </h2>

//           <div className="flex">
//             <div className="flex-1 pr-4">
//               <p className="mb-4">
//                 I,{" "}
//                 <input
//                   type="text"
//                   value={participantName}
//                   onChange={(e) => setParticipantName(e.target.value)}
//                   placeholder="Participant Name"
//                   className="border-b border-black w-40 px-1"
//                 />{" "}
//                 hereby affirm that I am aware that skin and scuba diving have
//                 inherent risks which may result in serious injury or death. I
//                 understand that diving with compressed air involves certain
//                 inherent risks; including but not limited to decompression
//                 sickness, embolism or other hyperbaric/air expansion injury that
//                 require treatment in a recompression chamber. I further
//                 understand that the open water diving trips which are necessary
//                 for training and for certification may be conducted at a site
//                 that is remote, either by time or distance or both, from such a
//                 recompression chamber. I still choose to proceed with such dives
//                 in spite of the possible absence of a recompression chamber in
//                 proximity to the dive site.
//               </p>

//               <p className="mb-4">
//                 I understand this Liability Release and Assumption of Risk
//                 Agreement (Agreement) hereby encompasses and applies to all
//                 diver training activities and courses in which I choose to
//                 participate. These activities and courses may include, but are
//                 not limited to, altitude, boat, cavern, AWARE, deep, enriched
//                 air, photography/videography, diver propulsion vehicle, drift,
//                 dry suit, ice, multilevel, night, peak performance buoyancy,
//                 search & recovery, rebreather, underwater naturalist, navigator,
//                 wreck, adventure diver, rescue diver and other distinctive
//                 specialties (hereinafter "Programs").
//               </p>

//               <p className="mb-4">
//                 I understand and agree that neither my instructor(s),
//                 divemasters(s), the facility which provides the Programs{" "}
//                 <span className="border-b-2 border-gray-900 text-xl font-bold px-2">
//                   Scuba Life & their instructors
//                 </span>
//                 nor PADI Americas, Inc., nor its affiliate and subsidiary
//                 corporations, nor any of their respective employees, officers,
//                 agents, contractors or assigns (hereinafter referred to as
//                 "Released Parties") may be held liable or responsible in any way
//                 for any injury, death or other damages to me, my family, estate,
//                 heirs or assigns that may occur as a result of my participation
//                 in the Programs or as a result of the negligence of any party,
//                 including the Released Parties, whether passive or active.
//               </p>

//               <p className="mb-4">
//                 In consideration of being allowed to participate in the
//                 Programs, I hereby personally assume all risks of the Programs,
//                 whether foreseen or unforeseen, that may befall me while I am a
//                 participant in the Programs including, but not limited to, the
//                 academics, confined water and/or open water activities. I
//                 further release, exempt and hold harmless said Programs and
//                 Released Parties from any claim or lawsuit by me, my family,
//                 estate, heirs or assigns, arising out of my enrollment and
//                 participation in this program including both claims arising
//                 during the program or after I receive my certification(s).
//               </p>
//             </div>

//             <div className="flex-1 pl-4">
//               <p className="mb-4">
//                 I understand that past or present medical conditions may be
//                 contraindicative to my participation in the Programs. I declare
//                 that I am in good mental and physical fitness for diving, and
//                 that I am not under the influence of alcohol, nor am I under the
//                 influence of any drugs that are contraindicated to diving. If I
//                 am taking medication, I declare that I have seen a physician and
//                 have approval to dive while under the influence of the
//                 medication/drugs. I affirm it is my responsibility to inform my
//                 instructor of any and all changes to my health condition at any
//                 time during my participation in the Programs and agree to accept
//                 responsibility for my failure to do so.
//               </p>

//               <p className="mb-4">
//                 I also understand that skin diving and scuba diving are
//                 physically strenuous activities and that I will be exerting
//                 myself during this program, and that if I am injured as a result
//                 of heart attack, panic, hyperventilation, drowning or any other
//                 cause, that I expressly assume the risk of said injuries and
//                 that I will not hold the Released Parties responsible for the
//                 same.
//               </p>

//               <p className="mb-4">
//                 I further state that I am of lawful age and legally competent to
//                 sign this Liability Release and Assumption of Risk Agreement, or
//                 that I have acquired the written consent of my parent or
//                 guardian. I understand the terms herein are contractual and not
//                 a mere recital, and that I have signed this Agreement of my own
//                 free act and with the knowledge that I hereby agree to waive my
//                 legal rights. I further agree that if any provision of this
//                 Agreement is found to be unenforceable or invalid, that
//                 provision shall be severed from this Agreement. The remainder of
//                 this Agreement will then be construed as though the
//                 unenforceable provision had never been contained herein.
//               </p>

//               <p className="mb-4">
//                 I hereby state and agree this Agreement will be effective for
//                 all activities associated with the Programs in which I
//                 participate within one year from the date on which I sign this
//                 Agreement. I understand and agree that I am not only giving up
//                 my right to sue the Released Parties but also any rights my
//                 heirs, assigns, or beneficiaries may have to sue the Released
//                 Parties resulting from my death. I further represent I have the
//                 authority to do so and that my heirs, assigns, or beneficiaries
//                 will be estopped from claiming otherwise because of my
//                 representations to the Released Parties.
//               </p>
//             </div>
//           </div>

//           <hr className="my-2 border-2 border-gray-900" />
//           <p className="mb-4">
//             I,{" "}
//             <input
//               type="text"
//               value={participantName}
//               onChange={(e) => setParticipantName(e.target.value)}
//               placeholder="Participant Name"
//               className="border-b border-black w-40 px-1"
//             />{" "}
//             HAVE COMPLETED THE ATTACHED DIVER MEDICAL FORM (10346) AND I AFFIRM
//             IT IS MY RESPONSIBILITY TO INFORM MY INSTRUCTOR OF ANY AND ALL
//             CHANGES TO MEDICAL HISTORY AT ANY TIME DURING MY PARTICIPATION IN
//             SCUBA PROGRAMS. I AGREE TO ACCEPT RESPONSIBILITY FOR OMISSIONS
//             REGARDING MY FAILURE TO DISCLOSE ANY EXISTING OR PAST HEALTH
//             CONDITION, OR ANY CHANGES THERETO.
//           </p>

//           <p className="mb-4">
//             I,{" "}
//             <input
//               type="text"
//               value={participantName}
//               onChange={(e) => setParticipantName(e.target.value)}
//               placeholder="Participant Name"
//               className="border-b border-black w-40 px-1"
//             />{" "}
//             BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE MY INSTRUCTORS,
//             DIVEMASTERS, THE FACILITY WHICH OFFERS THE PROGRAMS AND PADI
//             AMERICAS, INC., AND ALL RELATED ENTITIES AND RELEASED PARTIES AS
//             DEFINED ABOVE, FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR
//             PERSONAL INJURY, PROPERTY DAMAGE OR WRONGFUL DEATH HOWEVER CAUSED,
//             INCLUDING, BUT NOT LIMITED TO, THE NEGLIGENCE OF THE RELEASED
//             PARTIES, WHETHER PASSIVE OR ACTIVE.
//           </p>

//           <p className="mb-6">
//             I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS NON-AGENCY
//             DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT, LIABILITY RELEASE AND
//             ASSUMPTION OF RISK AGREEMENT, DIVER MEDICAL AND STANDARD SAFE DIVING
//             PRACTICES STATEMENT OF UNDERSTANDING BY READING THEM BEFORE SIGNING
//             BELOW ON BEHALF OF MYSELF AND MY HEIRS.
//           </p>

//           <div className="mt-8 space-y-6">
//             <div className="flex gap-10">
//               <div>
//                 <label className="block font-semibold mb-1">
//                   Participant Signature:
//                 </label>
//                 <input
//                   type="text"
//                   value={signature}
//                   onChange={(e) => setSignature(e.target.value)}
//                   placeholder="Signature"
//                   className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1">Date (DD/MM/YYYY):</label>
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   placeholder="DD/MM/YYYY"
//                   className="border-b border-black w-40 px-1 bg-transparent focus:outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm mb-1">
//                 Parent/Guardian Signature (if applicable):
//               </label>
//               <input
//                 type="text"
//                 value={guardianSignature}
//                 onChange={(e) => setGuardianSignature(e.target.value)}
//                 placeholder="Parent/Guardian Signature"
//                 className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
//               />
//             </div>
//           </div>

//           <p className="text-xs italic mt-6">
//             Page 2 of 2 — Release of Liability/Assumption of Risk/Non-agency
//             Acknowledgment Form
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }















"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function PadiLiabilityForm() {
  const [participantName, setParticipantName] = useState("");
  const [signature, setSignature] = useState("");
  const [guardianSignature, setGuardianSignature] = useState("");
  const [date, setDate] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!participantName || !signature || !date) {
      alert(
        "Please fill in required fields: Participant Name, Signature, Date"
      );
      return;
    }

    setIsGeneratingPDF(true);

    try {
      if (!formRef.current) throw new Error("Form reference not found");

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(formRef.current, {
        scale: 2, // slightly higher for better quality
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
        removeContainer: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.9); // JPEG = safe

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ratio = canvas.width / canvas.height;
      const margin = 10;
      let imgWidth = pdfWidth - margin * 2;
      let imgHeight = imgWidth / ratio;
      if (imgHeight > pdfHeight - margin * 2) {
        imgHeight = pdfHeight - margin * 2;
        imgWidth = imgHeight * ratio;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

      const fileName = `PADI_Liability_Form_${participantName
        .replace(/\s+/g, "_")
        .trim()}_${new Date().toISOString().split("T")[0]}.pdf`;

      pdf.save(fileName);
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      const userChoice = confirm(
        `PDF generation failed: ${error.message}\n\nUse browser print instead?`
      );
      if (userChoice) window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      {/* Export Button */}
      <div className="max-w-6xl mx-auto mb-4 no-print">
        <button
          onClick={handlePrint}
          disabled={isGeneratingPDF}
          className={`font-bold py-3 px-6 rounded-lg transition duration-200 w-full ${
            isGeneratingPDF
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isGeneratingPDF ? "Generating PDF..." : "Export as PDF"}
        </button>
      </div>
      {/* Form Content */}
      <div
        ref={formRef}
        className="print-area max-w-6xl mx-auto bg-white p-10 text-sm leading-relaxed font-serif shadow"
      >
        {/* ---------------- Page 1 ---------------- */}
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
              <h1 className="text-center font-bold text-xl mb-1">
                Release of Liability/Assumption of Risk/Non-agency
                Acknowledgment Form
              </h1>
              <h2 className="text-center text-4xl font-bold mb-4">
                Continuing Education Administrative Document
              </h2>
              <hr className="my-2 border-2 border-gray-900" />
              <p className="capitalize text-center font-bold text-2xl mb-6">
                NOTE: Also complete and attach the Diver Medical Form (Product
                No. 10346)
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-4">
            <p className="mb-4">
              This is a statement in which you are informed of the established
              safe diving practices for skin and scuba diving. These practices
              have been compiled for your review and acknowledgment and are
              intended to increase your comfort and safety in diving.{" "}
              <strong>Your signature on this statement is required</strong> as
              proof that you are aware of these safe diving practices. Read and
              discuss the statement prior to signing it. If you are a minor,
              this form must also be signed by a parent or guardian.
            </p>

            <p className="mb-2">
              I,{" "}
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Participant Name"
                className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
              />{" "}
              understand that as a diver I should:
            </p>

            <ol className="!list-decimal ml-6 space-y-2">
              <li>
                Maintain good mental and physical fitness for diving. Avoid
                being under the influence of alcohol or dangerous drugs when
                diving. Keep proficient in diving skills, striving to increase
                them through continuing education and reviewing them in
                controlled conditions after a period of diving inactivity, and
                refer to my course materials to stay current and refresh myself
                on important information.
              </li>
              <li>
                Be familiar with my dive sites. If not, obtain a formal diving
                orientation from a knowledgeable, local source. If diving
                conditions are worse than those in which I am experienced,
                postpone diving or select an alternate site with better
                conditions. Engage only in diving activities consistent with my
                training and experience. Do not engage in cave or technical
                diving unless specifically trained to do so.
              </li>
              <li>
                Use complete, well-maintained, reliable equipment with which I
                am familiar, and inspect it for correct fit and function prior
                to each dive. Have a buoyancy control device, low-pressure
                buoyancy control inflation system, submersible pressure gauge
                and alternate air source and dive planning/monitoring device
                (dive computer, RDP/dive tables—whichever you are trained to
                use) when scuba diving. Deny use of my equipment to uncertified
                divers.
              </li>
              <li>
                Listen carefully to dive briefings and directions and respect
                the advice of those supervising my diving activities. Recognize
                that additional training is recommended for participation in
                specialty diving activities, in other geographic areas and after
                periods of inactivity that exceed six months.
              </li>
            </ol>
          </div>
          <div className="flex-1 pr-4">
            <ol className="!list-decimal ml-6 space-y-2" start={5}>
              <li>
                Adhere to the buddy system throughout every dive. Plan dives –
                including communications, procedures for reuniting in case of
                separation and emergency procedures – with my buddy.
              </li>
              <li>
                Be proficient in dive planning (dive computer or dive table
                use). Make all dives no decompression dives and allow a margin
                of safety. Have a means to monitor depth and time underwater.
                Limit maximum depth to my level of training and experience.
                Ascend at a rate of not more than 18 metres/60 feet per minute.
                Be a SAFE diver – Slowly Ascend From Every dive. Make a safety
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
                and game and dive flag laws. I have read the above statements
                and have had any questions answered to my satisfaction.
              </li>
            </ol>

            <p className="mt-4">
              I understand the importance and purposes of these established
              practices. I recognize they are for my own safety and well-being,
              and that failure to adhere to them can place me in jeopardy when
              diving.
            </p>
          </div>
        </div>

        <h3 className="text-center font-bold mt-6 mb-2">
          NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT
        </h3>

        <p>
          I understand and agree that PADI Members (&quot;Members&quot;), including{" "}
          <span className="border-b-2 border-gray-900 text-xl font-bold px-2">
            Scuba Life & their instructors
          </span>{" "}
          and/or any individual PADI Instructors and Divemasters associated with
          the program in which I am participating, are licensed to use various
          PADI Trademarks and to conduct PADI training, but are not agents,
          employees or franchisees of PADI Americas, Inc, or its parent,
          subsidiary and affiliated corporations (&quot;PADI&quot;). I further understand
          that Member business activities are independent, and are neither owned
          nor operated by PADI...
        </p>

        <p className="text-xs italic mt-6">
          Product No. 10038 (Rev. 02/21) Version 2.0 — Page 1 of 2 © PADI 2021
        </p>

        {/* ---------------- Page 2 ---------------- */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-center font-bold uppercase mb-4">
            Liability Release and Assumption of Risk Agreement
          </h2>

          <div className="flex">
            <div className="flex-1 pr-4">
              <p className="mb-4">
                I,{" "}
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Participant Name"
                  className="border-b border-black w-40 px-1"
                />{" "}
                hereby affirm that I am aware that skin and scuba diving have
                inherent risks which may result in serious injury or death. I
                understand that diving with compressed air involves certain
                inherent risks; including but not limited to decompression
                sickness, embolism or other hyperbaric/air expansion injury that
                require treatment in a recompression chamber. I further
                understand that the open water diving trips which are necessary
                for training and for certification may be conducted at a site
                that is remote, either by time or distance or both, from such a
                recompression chamber. I still choose to proceed with such dives
                in spite of the possible absence of a recompression chamber in
                proximity to the dive site.
              </p>

              <p className="mb-4">
                I understand this Liability Release and Assumption of Risk
                Agreement (Agreement) hereby encompasses and applies to all
                diver training activities and courses in which I choose to
                participate. These activities and courses may include, but are
                not limited to, altitude, boat, cavern, AWARE, deep, enriched
                air, photography/videography, diver propulsion vehicle, drift,
                dry suit, ice, multilevel, night, peak performance buoyancy,
                search & recovery, rebreather, underwater naturalist, navigator,
                wreck, adventure diver, rescue diver and other distinctive
                specialties (hereinafter &quot;Programs&quot;).
              </p>

              <p className="mb-4">
                I understand and agree that neither my instructor(s),
                divemasters(s), the facility which provides the Programs{" "}
                <span className="border-b-2 border-gray-900 text-xl font-bold px-2">
                  Scuba Life & their instructors
                </span>
                nor PADI Americas, Inc., nor its affiliate and subsidiary
                corporations, nor any of their respective employees, officers,
                agents, contractors or assigns (hereinafter referred to as
                &quot;Released Parties&quot;) may be held liable or responsible in any way
                for any injury, death or other damages to me, my family, estate,
                heirs or assigns that may occur as a result of my participation
                in the Programs or as a result of the negligence of any party,
                including the Released Parties, whether passive or active.
              </p>

              <p className="mb-4">
                In consideration of being allowed to participate in the
                Programs, I hereby personally assume all risks of the Programs,
                whether foreseen or unforeseen, that may befall me while I am a
                participant in the Programs including, but not limited to, the
                academics, confined water and/or open water activities. I
                further release, exempt and hold harmless said Programs and
                Released Parties from any claim or lawsuit by me, my family,
                estate, heirs or assigns, arising out of my enrollment and
                participation in this program including both claims arising
                during the program or after I receive my certification(s).
              </p>
            </div>

            <div className="flex-1 pl-4">
              <p className="mb-4">
                I understand that past or present medical conditions may be
                contraindicative to my participation in the Programs. I declare
                that I am in good mental and physical fitness for diving, and
                that I am not under the influence of alcohol, nor am I under the
                influence of any drugs that are contraindicated to diving. If I
                am taking medication, I declare that I have seen a physician and
                have approval to dive while under the influence of the
                medication/drugs. I affirm it is my responsibility to inform my
                instructor of any and all changes to my health condition at any
                time during my participation in the Programs and agree to accept
                responsibility for my failure to do so.
              </p>

              <p className="mb-4">
                I also understand that skin diving and scuba diving are
                physically strenuous activities and that I will be exerting
                myself during this program, and that if I am injured as a result
                of heart attack, panic, hyperventilation, drowning or any other
                cause, that I expressly assume the risk of said injuries and
                that I will not hold the Released Parties responsible for the
                same.
              </p>

              <p className="mb-4">
                I further state that I am of lawful age and legally competent to
                sign this Liability Release and Assumption of Risk Agreement, or
                that I have acquired the written consent of my parent or
                guardian. I understand the terms herein are contractual and not
                a mere recital, and that I have signed this Agreement of my own
                free act and with the knowledge that I hereby agree to waive my
                legal rights. I further agree that if any provision of this
                Agreement is found to be unenforceable or invalid, that
                provision shall be severed from this Agreement. The remainder of
                this Agreement will then be construed as though the
                unenforceable provision had never been contained herein.
              </p>

              <p className="mb-4">
                I hereby state and agree this Agreement will be effective for
                all activities associated with the Programs in which I
                participate within one year from the date on which I sign this
                Agreement. I understand and agree that I am not only giving up
                my right to sue the Released Parties but also any rights my
                heirs, assigns, or beneficiaries may have to sue the Released
                Parties resulting from my death. I further represent I have the
                authority to do so and that my heirs, assigns, or beneficiaries
                will be estopped from claiming otherwise because of my
                representations to the Released Parties.
              </p>
            </div>
          </div>

          <hr className="my-2 border-2 border-gray-900" />
          <p className="mb-4">
            I,{" "}
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Participant Name"
              className="border-b border-black w-40 px-1"
            />{" "}
            HAVE COMPLETED THE ATTACHED DIVER MEDICAL FORM (10346) AND I AFFIRM
            IT IS MY RESPONSIBILITY TO INFORM MY INSTRUCTOR OF ANY AND ALL
            CHANGES TO MEDICAL HISTORY AT ANY TIME DURING MY PARTICIPATION IN
            SCUBA PROGRAMS. I AGREE TO ACCEPT RESPONSIBILITY FOR OMISSIONS
            REGARDING MY FAILURE TO DISCLOSE ANY EXISTING OR PAST HEALTH
            CONDITION, OR ANY CHANGES THERETO.
          </p>

          <p className="mb-4">
            I,{" "}
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Participant Name"
              className="border-b border-black w-40 px-1"
            />{" "}
            BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE MY INSTRUCTORS,
            DIVEMASTERS, THE FACILITY WHICH OFFERS THE PROGRAMS AND PADI
            AMERICAS, INC., AND ALL RELATED ENTITIES AND RELEASED PARTIES AS
            DEFINED ABOVE, FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR
            PERSONAL INJURY, PROPERTY DAMAGE OR WRONGFUL DEATH HOWEVER CAUSED,
            INCLUDING, BUT NOT LIMITED TO, THE NEGLIGENCE OF THE RELEASED
            PARTIES, WHETHER PASSIVE OR ACTIVE.
          </p>

          <p className="mb-6">
            I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS NON-AGENCY
            DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT, LIABILITY RELEASE AND
            ASSUMPTION OF RISK AGREEMENT, DIVER MEDICAL AND STANDARD SAFE DIVING
            PRACTICES STATEMENT OF UNDERSTANDING BY READING THEM BEFORE SIGNING
            BELOW ON BEHALF OF MYSELF AND MY HEIRS.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex gap-10">
              <div>
                <label className="block font-semibold mb-1">
                  Participant Signature:
                </label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Signature"
                  className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Date (DD/MM/YYYY):</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="border-b border-black w-40 px-1 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">
                Parent/Guardian Signature (if applicable):
              </label>
              <input
                type="text"
                value={guardianSignature}
                onChange={(e) => setGuardianSignature(e.target.value)}
                placeholder="Parent/Guardian Signature"
                className="border-b border-black w-72 px-1 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <p className="text-xs italic mt-6">
            Page 2 of 2 — Release of Liability/Assumption of Risk/Non-agency
            Acknowledgment Form
          </p>
        </div>
      </div>
    </div>
  );
}