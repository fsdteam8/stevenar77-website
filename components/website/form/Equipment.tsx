"use client";

import type React from "react";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFormStore } from "@/store/formStore";
// import { useBooking } from "../course/booking-context";

import { generatePaginatedPDF } from "@/lib/pdf-utils";

interface FormData {
  name: string;
  address: string;
  city: string;
  address2?: string;
  phoneHome: string;
  phoneHomeArea?: string;
  phoneWork: string;
  phoneWorkArea?: string;
  email: string;
  localAddress: string;
  localPhone: string;
  localPhoneArea?: string;
  state: string;
  signature: string;
  participantDate: string;
  guardianSignature: string;
  guardianDate: string;
  renter: string;
}

interface FormErrors {
  [key: string]: string;
}

interface PadiFormProps {
  cartId?: string;
  formTitle?: string;
  onSubmitSuccess?: () => void;
}

export default function PadiForm({
  cartId,
  formTitle,
  onSubmitSuccess,
}: PadiFormProps) {
  // const { dispatch } = useBooking();
  const store = useFormStore();
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    city: "",
    phoneHome: "",
    phoneWork: "",
    email: "",
    localAddress: "",
    localPhone: "",
    state: "",
    signature: "",
    participantDate: getCurrentDate(),
    guardianSignature: "",
    guardianDate: getCurrentDate(),
    renter: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "Name is required",
    address: "Street Address is required",
    city: "City is required",
    state: "State is required",
    phoneHome: "Cell phone number is required",
    email: "Email is required",
    signature: "Signature is required",
    renter: "Renter name is required",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        // Auto-sync name to renter field
        ...(name === "name" ? { renter: value } : {}),
      }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          // Also clear renter error if name is being filled
          if (name === "name") {
            delete newErrors.renter;
          }
          return newErrors;
        });
      }
    },
    [errors],
  );

  // const validateForm = (): boolean => {
  //   const newErrors: FormErrors = {};
  //   const errorMessages: string[] = [];

  //   // Required fields validation
  //   if (!formData.name.trim()) {
  //     newErrors.name = "Name is required";
  //     errorMessages.push("Name is required,");
  //   }

  //   if (!formData.address.trim()) {
  //     newErrors.address = "Address is required";
  //     errorMessages.push("Address is required,");
  //   }

  //   if (!formData.phoneHome.trim()) {
  //     newErrors.phoneHome = "Home phone number is required";
  //     errorMessages.push("Home phone number is required,");
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //     errorMessages.push("Email is required,");
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     newErrors.email = "Invalid email format";
  //     errorMessages.push("• Valid email address is required");
  //   }

  //   if (!formData.signature.trim()) {
  //     newErrors.signature = "Signature is required";
  //     errorMessages.push("Signature is required,");
  //   }

  //   if (!formData.renter.trim()) {
  //     newErrors.renter = "Renter name is required";
  //     errorMessages.push("Renter name is required,");
  //   }

  //   setErrors(newErrors);

  //   // Show single toast with all errors
  //   if (errorMessages.length > 0) {
  //     toast.error("Please complete the following fields:", {
  //       description: errorMessages.join("\n"),
  //       duration: 5000,
  //     });
  //   }

  //   return Object.keys(newErrors).length === 0;
  // };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const errorMessages: string[] = [];

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      errorMessages.push("Name is required");
    }

    if (!formData.address.trim()) {
      newErrors.address = "Street Address is required";
      errorMessages.push("Street Address is required");
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      errorMessages.push("City is required");
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
      errorMessages.push("State is required");
    }

    if (!formData.phoneHome.trim()) {
      newErrors.phoneHome = "Home phone number is required";
      errorMessages.push("cell phone number is required");
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      errorMessages.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      errorMessages.push("Valid email address is required");
    }

    if (!formData.signature.trim()) {
      newErrors.signature = "Signature is required";
      errorMessages.push("Signature is required");
    }

    if (!formData.renter.trim()) {
      newErrors.renter = "Renter name is required";
      errorMessages.push("Renter name is required");
    }

    setErrors(newErrors);

    if (errorMessages.length > 0) {
      const description =
        errorMessages.length === 1
          ? errorMessages[0]
          : errorMessages.join(", ");

      toast.error("Please complete the following fields:", {
        description,
        duration: 5000,
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleDownloadPdf = async () => {
    if (!validateForm()) {
      return;
    }

    if (!printRef.current) {
      alert("Cannot generate PDF - form not loaded");
      return;
    }

    setIsGeneratingPDF(true);

    try {
      // console.log("🧾 Generating PDF...");

      if (!printRef.current) throw new Error("Form reference not found");

      const fileName = `PADI_Equipment_Rental_${formData.name
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .trim()}_${new Date().toISOString().split("T")[0]}.pdf`;

      const pdfFile = await generatePaginatedPDF(printRef.current, fileName);

      // Save to store
      if (cartId && formTitle) {
        store.setFormCompleted(cartId, formTitle, pdfFile);
      }

      // Auto-download
      // downloadPDF(pdfFile);

      toast.success("PDF generated successfully!");
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("❌ PDF generation error:", error);
      toast.error("PDF generation failed. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div
          ref={printRef}
          className="bg-white p-6 shadow-lg max-w-4xl mx-auto"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "11px",
            lineHeight: "1.2",
            color: "black",
          }}
        >
          {/* Page 1 */}
          <div className="mb-8">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="font-bold text-sm mb-1">
                Release of Liability/Assumption of Risk/Non-agency
                Acknowledgement Form
              </div>
              <div className="font-bold text-lg mb-2">
                EQUIPMENT RENTAL AGREEMENT
              </div>
              <hr className="my-2 border-2 border-gray-900" />
            </div>

            {/* Personal Information Grid */}
            <div className="grid grid-cols-2 gap-x-12 text-xs w-full max-w-4xl">
              {/* LEFT COLUMN (fillable) */}
              <div className="space-y-2">
                {/* Name */}
                <div className="flex items-center">
                  <span className="w-20">Name</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="name"
                      // placeholder="Fill up Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full border-0 h-12 border-b ${errors.name ? "border-red-500" : "border-black"} bg-transparent outline-none`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-[10px]">
                        {errors.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div className="flex items-center">
                  <span className="w-20 pt-1">Street Address</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full border-0 h-12 border-b ${errors.address ? "border-red-500" : "border-black"} bg-transparent outline-none mb-1`}
                    />
                    {errors.address && (
                      <span className="text-red-500 text-[10px]">
                        {errors.address}
                      </span>
                    )}
                  </div>
                </div>

                {/* City */}
                <div className="flex items-center">
                  <span className="w-20 pt-1">City</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full border-0 h-12 border-b ${errors.city ? "border-red-500" : "border-black"} bg-transparent outline-none mb-1`}
                    />
                    {errors.city && (
                      <span className="text-red-500 text-[10px]">
                        {errors.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* State */}
                <div className="flex items-center">
                  <span className="w-20 pt-1">State</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full border-0 h-12 border-b ${errors.state ? "border-red-500" : "border-black"} bg-transparent outline-none mb-1`}
                    />
                    {errors.state && (
                      <span className="text-red-500 text-[10px]">
                        {errors.state}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone Home */}
                <div className="flex items-center">
                  {/* <span className="w-20">Phone Home (</span> */}
                  <span className="w-20">Cell Phone (</span>

                  <input
                    type="text"
                    name="phoneHomeArea"
                    value={formData.phoneHomeArea}
                    onChange={handleInputChange}
                    className="w-8 border-0 border-b h-12 border-black bg-transparent outline-none text-center"
                    maxLength={3}
                  />
                  <span>)</span>
                  <div className="flex-1 ml-1">
                    <input
                      type="text"
                      name="phoneHome"
                      value={formData.phoneHome}
                      onChange={handleInputChange}
                      className={`w-full border-0 h-12 border-b ${errors.phoneHome ? "border-red-500" : "border-black"} bg-transparent outline-none`}
                      // placeholder="Your Phone Number"
                    />
                    {errors.phoneHome && (
                      <span className="text-red-500 text-[10px]">
                        {errors.phoneHome}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <span className="w-20">Email Address</span>
                  <div className="flex-1">
                    <input
                      type="email"
                      name="email"
                      // placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full border-0 h-12 border-b ${errors.email ? "border-red-500" : "border-black"} bg-transparent outline-none`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-[10px]">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (static, non-fillable) */}
              <div className="space-y-2 text-[11px] leading-tight text-gray-700">
                <div className="flex justify-between">
                  <span>Date Rented ____________</span>
                  <span>Date Due ____________</span>
                </div>

                <div className="flex justify-between">
                  <span>Date Returned ____________</span>
                  <span>Received By ____________</span>
                </div>

                <div className="flex justify-between">
                  <span>D/L No. __________________________</span>
                  <span>State ______</span>
                </div>

                <div className="flex justify-between">
                  <span>Credit Card Number __________________________</span>
                  <span>Exp. Date ______</span>
                </div>

                <div>
                  <span className="font-semibold">Signature*</span>
                  <input
                    type="text"
                    className="w-full border-0 h-12 border-b border-black bg-transparent outline-none"
                    disabled
                    style={{ minHeight: "25px", fontFamily: "cursive" }}
                  />
                </div>

                <p className="text-[10px] italic mt-1">
                  *I authorize the Dive Center/Resort to charge my credit card
                  the daily rate if equipment is not returned by due date
                </p>

                <div className="flex justify-between mt-2">
                  <span>Certification Level ____________________</span>
                  <span>Date ______</span>
                </div>

                <div className="flex justify-between">
                  <span>Certification # ____________________</span>
                  <span>Agency ______</span>
                </div>
              </div>
            </div>

            <br />
            <br />

            {/* Equipment Table */}
            <table className="w-full border-collapse border border-black text-xs mb-4">
              <thead>
                <tr>
                  <th className="border border-black p-1 text-center">QTY</th>
                  <th className="border border-black p-1 text-center">ITEM</th>
                  <th className="border border-black p-1 text-center">
                    SERIAL #
                  </th>
                  <th className="border border-black p-1 text-center">SIZE</th>
                  <th className="border border-black p-1 text-center">
                    DAILY RATE
                  </th>
                  <th className="border border-black p-1 text-center">
                    AMOUNT
                  </th>
                  <th className="border border-black p-1 text-center">QTY</th>
                  <th className="border border-black p-1 text-center">ITEM</th>
                  <th className="border border-black p-1 text-center">
                    SERIAL #
                  </th>
                  <th className="border border-black p-1 text-center">SIZE</th>
                  <th className="border border-black p-1 text-center">
                    DAILY RATE
                  </th>
                  <th className="border border-black p-1 text-center">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tank(s)", "Mask"],
                  ["Regulator", "Snorkel"],
                  ["w/console", "Fins"],
                  ["w/computer", "Boots"],
                  ["Sidemount Rig/Mount", "Gloves"],
                  ["BCD", "w/Weights ___ kg/lb"],
                  ["Rebreather", "Weight Belt ___ kg/lb"],
                  ["Exposure suit", "Light"],
                  ["Wet Suit", "Camera/Video"],
                  ["Dry Suit", "Other"],
                  ["Dive Skin", ""],
                  ["Hood", ""],
                ].map(([leftItem, rightItem], index) => (
                  <tr key={index}>
                    <td className="border border-black p-1 h-6"></td>
                    <td className="border border-black p-1">{leftItem}</td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1">{rightItem}</td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6} className="border border-black p-1"></td>
                  <td
                    colSpan={3}
                    className="border border-black p-1 text-right font-bold"
                  >
                    SUBTOTAL
                  </td>
                  <td className="border border-black p-1 text-center font-bold">
                    + TAX
                  </td>
                  <td className="border border-black p-1 text-center font-bold">
                    = TOTAL
                  </td>
                  <td className="border border-black p-1"></td>
                </tr>
              </tbody>
            </table>

            {/* Totals Section - Display Only */}
            <div className="border border-black text-xs mb-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="border border-black p-1 font-bold bg-[#f5f7ff]">
                      TOTAL DAYS
                    </th>
                    <th className="border border-black p-1 font-bold bg-[#f5f7ff]">
                      TOTAL PER DAY
                    </th>
                    <th className="border border-black p-1 font-bold bg-[#f5f7ff]">
                      TOTAL DUE
                    </th>
                    <th
                      className="border border-black p-1 font-bold bg-[#f5f7ff]"
                      colSpan={2}
                    >
                      RETURN DEPOSIT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-1 bg-[#f5f7ff] h-6"></td>
                    <td className="border border-black p-1 bg-[#f5f7ff] h-6"></td>
                    <td className="border border-black p-1 bg-[#f5f7ff] h-6"></td>
                    <td className="border border-black p-1 bg-[#f5f7ff] h-6"></td>
                    <td className="border border-black p-1 align-top">
                      <div className="flex flex-col space-y-1">
                        <label className="flex items-center space-x-1">
                          <input type="checkbox" disabled className="h-3 w-3" />
                          <span className="text-[10px]">CREDIT CARD</span>
                        </label>
                        <label className="flex items-center space-x-1">
                          <input type="checkbox" disabled className="h-3 w-3" />
                          <span className="text-[10px]">CASH</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Equipment Prepared By */}
              <div className="mt-2 flex items-center text-[10px]">
                <span className="mr-1">Equipment prepared by</span>
                <div className="flex-1 border-b border-black bg-[#f5f7ff] h-4"></div>
                <span className="ml-1 text-[8px]">
                  (Dive Center/Resort Employee)
                </span>
              </div>
            </div>

            <div className="text-right text-xs">- page 1 of 2 -</div>
          </div>
          <div className="py-40"></div>
          {/* Page 2 */}
          <div className="mt-12">
            <div className="text-center mb-4">
              <div className="font-bold text-sm mb-1">
                Release of Liability/Assumption of Risk/Non-agency
                Acknowledgement Form
              </div>
              <div className="font-bold text-lg mb-2">
                EQUIPMENT RENTAL AGREEMENT
              </div>
              <hr className="my-2 border-2 border-gray-900" />

              <div className="text-xs text-start font-bold mb-2">
                Please read carefully and fill in all blanks before signing.
              </div>
            </div>

            <div className="text-xs leading-relaxed space-y-3">
              <p>
                THIS AGREEMENT is entered into between{" "}
                <span className="border-full underline border-gray-900 text-xl font-bold px-2">
                  Scuba Life & their instructors
                </span>
                and{" "}
                <input
                  type="text"
                  name="renter"
                  value={formData.renter}
                  onChange={handleInputChange}
                  className={`border-0 border-b h-12 ${errors.renter ? "border-red-500" : "border-black"} bg-transparent outline-none w-32`}
                  placeholder="rentor"
                />
                {errors.renter && (
                  <span className="text-red-500 text-[10px] ml-1">
                    {errors.renter}
                  </span>
                )}
                , for the rental of scuba and/or skin diving equipment. This
                AGREEMENT is a release of my rights and the rights of my heirs,
                assigns or beneficiaries to sue for injuries or death resulting
                from the rental and/or use of this equipment. I personally
                assume all risks of skin and/or scuba diving, whether foreseen
                or unforeseen, related in any way to the rental and/or use of
                this equipment.
              </p>

              <div className="font-bold text-xl text-center">
                Non-Agency Disclosure and Acknowledgment Agreement
              </div>

              <p>
                I understand and agree that PADI Members (&quot;Members&quot;),
                including{" "}
                <span className="border-full underline border-gray-900 text-xl font-bold px-2">
                  Scuba Life & their instructors
                </span>
                and/or any individual PADI Instructors and Divemasters
                associated with the program in which I am participating, are
                licensed to use various PADI Trademarks and to conduct PADI
                training, but are not agents, employees or franchisees of PADI
                Americas, Inc, or its parent, subsidiary and affiliated
                corporations (&quot;PADI&quot;). I further understand that
                Member business activities are independent, and are neither
                owned nor operated by PADI, and that while PADI establishes the
                standards for PADI diver training programs, it is not
                responsible for, nor does it have the right to control, the
                operation of the Members&apos; business activities and the
                day-to-day conduct of PADI programs and supervision of divers by
                the Members or their associated staff. I further understand and
                agree on behalf of myself, my heirs and my estate that in the
                event of an injury or death during this activity, neither I nor
                my estate shall seek to hold PADI liable for the actions,
                inactions or negligence of{" "}
                <span className="border-full underline border-gray-900 text-xl font-bold px-2">
                  Scuba Life & their instructors
                </span>
                and/or the instructors and divemasters associated with the
                activity.
              </p>

              <div className="font-bold text-xl text-center">
                Liability Release and Assumption of Risk Agreement
              </div>

              <p className="text-xs">
                I understand and agree that{" "}
                <span className="border-full underline border-gray-900 text-xl font-bold px-2">
                  Scuba Life & their instructors
                </span>
                , and its employees, owners, officers, contractor, assigns or
                agents (hereinafter referred to as &quot;Released
                Parties&quot;), shall not be held liable or responsible in any
                way for any injury, death or other damages to me, my family,
                estate, heirs or assigns which may occur as a result of the
                rental and/or use of the equipment, or as a result of product
                defect, or the negligence of any party, including the Released
                Parties, whether passive or active.
              </p>

              <p className="text-xs">
                I hereby acknowledge receipt of the equipment designated in this
                form, and, if any of this equipment is to be used for scuba
                diving I affirm I am a certified scuba diver or student diver in
                a scuba diving course/program under the supervision of a
                certified scuba instructor.
              </p>

              <p className="text-xs">
                I affirm it is my responsibility to inspect all of the equipment
                and acknowledge it is in good working condition. I affirm that
                it is my responsibility to check both the quality and quantity
                of gas in any scuba tanks. I acknowledge that I should not dive
                if the equipment is not functioning properly. I will not hold
                the Released Parties responsible for my failure to inspect the
                equipment prior to diving or if I choose to dive with equipment
                that may not be functioning properly.
              </p>

              <p className="text-xs">
                I understand that skin diving and scuba diving are physically
                strenuous activities, that I will be exerting myself during
                these activities, and that if I am injured as a result of heart
                attack, panic, hyperventilation, drowning or any other cause,
                that I expressly assume the risk of said injuries and that I
                will not hold the Released Parties responsible for the same.
              </p>

              <p className="text-xs">
                I agree to reimburse the Dive Center/Resort for the loss or
                breakage of any and all equipment at the current replacement
                value and to also pay for damages incurred while transporting
                the equipment. I agree to return the equipment in clean
                condition and to pay a cleaning fee if not returned cleaned.
              </p>

              <p className="text-xs">
                I further state that I am of lawful age and legally competent to
                sign this liability release, or that I have acquired the written
                consent of my parent or guardian. I understand the terms herein
                are contractual and not a mere recital, and that I have signed
                this Agreement of my own free act and with the knowledge that I
                hereby agree to waive my legal rights. I further agree if any
                provision of this Agreement is found to be unenforceable or
                invalid, that provision shall be severed from this Agreement.
                The remainder of this Agreement will then be construed as though
                the unenforceable provision had never been contained herein.
              </p>

              <p className="text-xs">
                I understand and agree that I am not only giving up my right to
                sue the Released Parties but also any rights my heirs, assigns,
                and beneficiaries may have to sue the Released Parties resulting
                from my death. I further represent I have the authority to do so
                and that my heirs, assigns, or beneficiaries will be estopped
                from claiming otherwise because of my representations to the
                Released Parties.
              </p>

              <p className="font-bold">
                I,{" "}
                <input
                  type="text"
                  name="renter"
                  value={formData.renter}
                  onChange={handleInputChange}
                  className={`border-0 border-b h-12 ${errors.renter ? "border-red-500" : "border-black"} bg-transparent outline-none w-64`}
                  placeholder="rentor"
                />
                {errors.renter && (
                  <span className="text-red-500 text-[10px] ml-1">
                    {errors.renter}
                  </span>
                )}
                , BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE THE RELEASED
                PARTIES AND ALL RELATED ENTITIES AS DEFINED ABOVE, FROM ALL
                LIABILITY OR RESPONSIBILITY WHATSOEVER FOR PERSONAL INJURY,
                PROPERTY DAMAGE, OR WRONGFUL DEATH AS A RESULT OF RENTING AND/OR
                USING THE EQUIPMENT, HOWEVER CAUSED, INCLUDING, BUT NOT LIMITED
                TO PRODUCT LIABILITY OR THE NEGLIGENCE OF THE RELEASED PARTIES,
                WHETHER PASSIVE OR ACTIVE.
              </p>

              <p>
                I HAVE FULLY INFORMED MYSELF AND MY HEIRS OF THE CONTENTS OF
                THIS NON-AGENCY DISCLOSURE AND ACKNOWLDGEMENT AGREEMENT AND
                LIABILITY RELEASE AND ASSUMPTION OF RISK AGREEMENT BY READING
                BOTH BEFORE SIGNING BELOW ON BEHALF OF MYSELF AND MY HEIRS.
              </p>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between mt-8 text-xs">
              <div className="w-64">
                <div className="mb-4">
                  <input
                    type="text"
                    name="signature"
                    value={formData.signature}
                    onChange={handleInputChange}
                    className={`w-full border-0 h-12 border-b ${errors.signature ? "border-red-500" : "border-black"} bg-transparent outline-none text-xl italic`}
                    style={{ fontFamily: "cursive" }}
                  />
                  <div className="mt-1">Participant&apos;s Signature</div>
                  {errors.signature && (
                    <span className="text-red-500 text-[10px]">
                      {errors.signature}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="participantDate"
                    value={formData.participantDate}
                    onChange={handleInputChange}
                    className="w-full border-0 border-b h-12 border-black bg-transparent outline-none cursor-not-allowed"
                  />
                  <div className="mt-1">Date (MM/DD/YYYY)</div>
                </div>
              </div>
              <div className="w-64">
                <div className="mb-4">
                  <input
                    type="text"
                    name="guardianSignature"
                    value={formData.guardianSignature}
                    onChange={handleInputChange}
                    className="w-full border-0 border-b h-12 border-black bg-transparent outline-none"
                    style={{ minHeight: "25px", fontFamily: "cursive" }}
                  />
                  <div className="mt-1">
                    Signature of Parent/Guardian (where applicable)
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="guardianDate"
                    value={formData.guardianDate}
                    onChange={handleInputChange}
                    className="w-full border-0 h-12 border-b border-black bg-transparent outline-none cursor-not-allowed"
                  />
                  <div className="mt-1">Date (MM/DD/YYYY)</div>
                </div>
              </div>
            </div>

            <div className="text-right text-xs mt-4">- page 2 of 2 -</div>
          </div>
        </div>
        <Button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPDF}
          className={`w-full mb-4 no-print ${
            isGeneratingPDF ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
          }`}
        >
          {isGeneratingPDF ? "Generating PDF..." : "Submit Form"}
        </Button>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
