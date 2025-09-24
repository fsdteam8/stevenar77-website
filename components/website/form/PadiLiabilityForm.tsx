"use client";

import { useState } from "react";

export default function PadiLiabilityForm() {
  const [participantName, setParticipantName] = useState("");
  const [signature, setSignature] = useState("");

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 text-sm leading-relaxed font-serif shadow">
      {/* ---------------- Page 1 ---------------- */}
      <h1 className="text-center font-bold uppercase mb-2">
        PADI Release of Liability / Assumption of Risk /
        Non-agency Acknowledgment Form
      </h1>
      <h2 className="text-center font-semibold mb-4">
        Continuing Education Administrative Document
      </h2>
      <p className="italic text-xs mb-6">
        NOTE: Also complete and attach the Diver Medical Form (Product No. 10346)
      </p>

      <p className="mb-4">
        This is a statement in which you are informed of the established safe diving practices for skin
        and scuba diving. These practices have been compiled for your review and acknowledgment and
        are intended to increase your comfort and safety in diving.{" "}
        <strong>Your signature on this statement is required</strong> as proof that you are aware of these safe diving
        practices. Read and discuss the statement prior to signing it. If you are a minor, this form
        must also be signed by a parent or guardian.
      </p>

      <p className="mb-2">
        I,{" "}
        <input
          type="text"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          placeholder="Participant Name"
          className="border-b border-black w-72 px-1"
        />{" "}
        understand that as a diver I should:
      </p>

      <ol className="list-decimal ml-6 space-y-2">
        <li>
          Maintain good mental and physical fitness for diving. Avoid being under the influence of
          alcohol or dangerous drugs when diving...
        </li>
        <li>
          Be familiar with my dive sites. If not, obtain a formal diving orientation from a
          knowledgeable, local source...
        </li>
        <li>
          Use complete, well-maintained, reliable equipment with which I am familiar, and inspect it
          for correct fit and function prior to each dive...
        </li>
        <li>
          Listen carefully to dive briefings and directions and respect the advice of those
          supervising my diving activities...
        </li>
        <li>
          Adhere to the buddy system throughout every dive. Plan dives including communications...
        </li>
        <li>
          Be proficient in dive planning (dive computer or dive table use). Make all dives
          no-decompression dives...
        </li>
        <li>
          Maintain proper buoyancy. Adjust weighting at the surface for neutral buoyancy...
        </li>
        <li>
          Breathe properly for diving. Never breath-hold or skip-breathe when breathing compressed
          air...
        </li>
        <li>Use a boat, float or other surface support station, whenever feasible.</li>
        <li>
          Know and obey local dive laws and regulations, including fish and game and dive flag laws.
        </li>
      </ol>

      <p className="mt-4">
        I understand the importance and purposes of these established practices. I recognize they are
        for my own safety and well-being, and that failure to adhere to them can place me in jeopardy
        when diving.
      </p>

      <h3 className="text-center font-bold mt-6 mb-2">
        NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT
      </h3>

      <p className="mb-4">
        I understand and agree that PADI Members (“Members”), including Scuba Life & their
        instructors and/or any individual PADI Instructors and Divemasters associated with the
        program in which I am participating, are licensed to use various PADI Trademarks and to
        conduct PADI training, but are not agents, employees or franchisees of PADI Americas, Inc, or
        its parent, subsidiary and affiliated corporations (“PADI”). ...
      </p>

      <p className="text-xs italic mt-6">
        Product No. 10038 (Rev. 02/21) Version 2.0 — Page 1 of 2 © PADI 2021
      </p>

      {/* ---------------- Page 2 ---------------- */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-center font-bold uppercase mb-4">
          Liability Release and Assumption of Risk Agreement
        </h2>

        <p className="mb-4">
          I hereby affirm that I am aware that skin and scuba diving have inherent risks which may
          result in serious injury or death...
        </p>

        {/* (rest of second page text continues in same <p> blocks, trimmed here for brevity) */}

        <div className="mt-8">
          <label className="block font-semibold mb-1">Participant Signature:</label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Signature"
            className="border-b border-black w-72 px-1"
          />
        </div>

        <div className="mt-6 flex space-x-12">
          <div>
            <label className="block text-sm">Date (DD/MM/YYYY):</label>
            <input type="text" className="border-b border-black w-40 px-1" />
          </div>
          <div>
            <label className="block text-sm">Parent/Guardian Signature (if applicable):</label>
            <input type="text" className="border-b border-black w-72 px-1" />
          </div>
        </div>

        <p className="text-xs italic mt-6">
          Page 2 of 2 — Release of Liability/Assumption of Risk/Non-agency Acknowledgment Form
        </p>
      </div>
    </div>
  );
}
