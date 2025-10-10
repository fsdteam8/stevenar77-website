"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// import { useBooking } from "../booking-context"

export function LiabilityReleaseStep() {
  // const { state, dispatch } = useBooking()

  // const handleCheckboxChange = (field: string, checked: boolean) => {
  //   // dispatch({
  //   //   type: "SET_LIABILITY_AGREEMENT",
  //   //   payload: { [field]: checked },
  //   // })
  // }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-[#343a40]">
        Liability Release Agreement
      </h2>

      <div className="space-y-6 text-[#6c757d] leading-relaxed">
        <div>
          <h3 className="font-semibold text-[#343a40] mb-2">
            RELEASE OF LIABILITY:
          </h3>
          <p>
            In consideration for being allowed to participate in scuba diving
            activities, I hereby release, waive, discharge, and covenant not to
            sue Scuba Life, its officers, employees, agents, and affiliates from
            any and all liability, claims, demands, actions, and causes of
            action whatsoever arising out of or related to any loss, damage, or
            injury, including death, that may be sustained by me while
            participating in such activity.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#343a40] mb-2">
            MEDICAL FITNESS:
          </h3>
          <p>
            I represent that I am in good health and proper physical condition
            to participate in scuba diving activities. I have disclosed all
            medical conditions that might affect my ability to dive safely. I
            understand that if I have any medical conditions, I may be required
            to obtain physician approval before diving.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#343a40] mb-2">
            EQUIPMENT AND TRAINING:
          </h3>
          <p>
            I acknowledge that I have received appropriate training for my level
            of certification and understand how to use all diving equipment. I
            agree to follow all safety procedures and dive within the limits of
            my training and certification.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#343a40] mb-2">
            INDEMNIFICATION:
          </h3>
          <p>
            I agree to indemnify and hold harmless Scuba Life from any loss,
            liability, damage, or costs they may incur due to my participation
            in scuba diving activities.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#343a40] mb-2">GOVERNING LAW:</h3>
          <p>
            This agreement shall be governed by the laws of the state in which
            the diving activity takes place.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#343a40] mb-2">ACKNOWLEDGMENT:</h3>
          <p>
            I have read this agreement, fully understand its terms, understand
            that I am giving up substantial rights by signing it, and sign it
            freely and voluntarily.
          </p>
        </div>

        <div className="space-y-4 mt-8">
          <div className="flex items-start gap-3">
            <Checkbox
              id="release"
              // checked={state.liabilityAgreement.releaseOfLiability}
              // onCheckedChange={(checked) => handleCheckboxChange("releaseOfLiability", checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="release" className="text-[#68706a] cursor-pointer">
              I have read and agree to the terms of the Liability Release
              Agreement.
            </Label>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="medical"
              // checked={state.liabilityAgreement.medicalFitness}
              // onCheckedChange={(checked) => handleCheckboxChange("medicalFitness", checked as boolean)}
              className="mt-1 data-[state=checked]:bg-[#0694a2] data-[state=checked]:border-[#0694a2]"
            />
            <Label htmlFor="medical" className="text-[#68706a] cursor-pointer">
              I confirm that I am medically fit to participate in scuba diving
              activities.
            </Label>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="equipment"
              // checked={state.liabilityAgreement.equipmentTraining}
              // onCheckedChange={(checked) => handleCheckboxChange("equipmentTraining", checked as boolean)}
              className="mt-1"
            />
            <Label
              htmlFor="equipment"
              className="text-[#68706a] cursor-pointer"
            >
              I comply with all the terms and conditions stated above.
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
