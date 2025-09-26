"use client"

import type React from "react"
import { useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface FormData {
  name: string
  address: string
  phoneHome: string
  phoneWork: string
  email: string
  localAddress: string
  localPhone: string
  dateRented: string
  dateDue: string
  dateReturned: string
  receivedBy: string
  dlNo: string
  state: string
  creditCardNumber: string
  expDate: string
  signature: string
  certificationLevel: string
  certificationDate: string
  certificationNo: string
  agency: string
  equipmentPreparedBy: string
}

interface FormErrors {
  [key: string]: string
}

// Reusable Form Input Component
const FormInput: React.FC<{
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  width?: string
  type?: string
  maxLength?: number
  mask?: boolean
  error?: string
}> = ({ name, value, onChange, placeholder, className = "", width = "auto", type = "text", maxLength, mask = false, error }) => (
  <div className="flex flex-col">
    <input
      type={type}
      name={name}
      value={mask ? "•".repeat(value.length) : value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border-0 border-b border-black bg-transparent outline-none focus:border-blue-500 ${className} ${
        error ? "border-red-500" : ""
      }`}
      style={{ width }}
      maxLength={maxLength}
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
)

export default function PadiForm() {
  const printRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    phoneHome: "",
    phoneWork: "",
    email: "",
    localAddress: "",
    localPhone: "",
    dateRented: "",
    dateDue: "",
    dateReturned: "",
    receivedBy: "",
    dlNo: "",
    state: "",
    creditCardNumber: "",
    expDate: "",
    signature: "",
    certificationLevel: "",
    certificationDate: "",
    certificationNo: "",
    agency: "",
    equipmentPreparedBy: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }, [errors])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.signature.trim()) newErrors.signature = "Signature is required"
    if (!formData.dateRented.trim()) newErrors.dateRented = "Date rented is required"
    if (!formData.certificationLevel.trim()) newErrors.certificationLevel = "Certification level is required"
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    
    // Credit card basic validation (only if provided)
    if (formData.creditCardNumber && !/^\d{12,19}$/.test(formData.creditCardNumber.replace(/\s/g, ''))) {
      newErrors.creditCardNumber = "Invalid credit card number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDownloadPdf = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields correctly")
      return
    }

    if (!printRef.current) {
      alert("Cannot generate PDF - form not loaded")
      return
    }

    try {
      // Dynamic import for html2canvas and jsPDF
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')
      
      const element = printRef.current
      
      // Increase scale for better quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: element.scrollWidth,
        height: element.scrollHeight
      })

      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // Calculate height to maintain aspect ratio
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = imgHeight / imgWidth
      const pdfPageHeight = pdfWidth * ratio

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfPageHeight)
      
      // Add second page if content is too long
      if (pdfPageHeight > pdfHeight) {
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, -pdfHeight, pdfWidth, pdfPageHeight)
      }

      pdf.save('padi-equipment-rental-agreement.pdf')
    } catch (error) {
      console.error("PDF generation failed:", error)
      alert("Failed to generate PDF. Please try again.")
    }
  }

  // Format credit card input
  const formatCreditCard = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    const chunks = cleaned.match(/.{1,4}/g)
    return chunks ? chunks.join(' ').substring(0, 19) : ''
  }

  const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCreditCard(e.target.value)
    setFormData(prev => ({
      ...prev,
      creditCardNumber: formatted
    }))
  }

  // Special handler for signature to prevent masking
  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      signature: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <Button onClick={handleDownloadPdf} className="w-full mb-4 no-print">
          Download PDF
        </Button>

        <div
          ref={printRef}
          className="bg-white p-6 shadow-lg"
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
                Release of Liability/Assumption of Risk/Non-agency Acknowledgement Form
              </div>
              <div className="font-bold text-lg mb-2">EQUIPMENT RENTAL AGREEMENT</div>
              <div className="text-xs">PRODUCT NO. 10087 (Rev. 12/12) Version 5.01 © PADI 2012</div>
            </div>

            {/* Personal Information Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4 text-xs">
              <div className="flex items-center">
                <span className="mr-2">Name</span>
                <FormInput
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  width="100%"
                  error={errors.name}
                />
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">Phone Home (</span>
                <input
                  type="text"
                  name="phoneHomeArea"
                  value={formData.phoneHome}
                  onChange={handleInputChange}
                  className="w-8 border-0 border-b border-black bg-transparent outline-none text-center"
                  maxLength={3}
                  placeholder="000"
                />
                <span>)</span>
                <input 
                  type="text"
                  name="phoneHome"
                  value={formData.phoneHome}
                  onChange={handleInputChange}
                  className="flex-1 ml-1 border-0 border-b border-black bg-transparent outline-none"
                  placeholder="000-0000"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2">Address</span>
                <FormInput
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  width="100%"
                />
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">Phone Work (</span>
                <input
                  type="text"
                  name="phoneWorkArea"
                  value={formData.phoneWork}
                  onChange={handleInputChange}
                  className="w-8 border-0 border-b border-black bg-transparent outline-none text-center"
                  maxLength={3}
                  placeholder="000"
                />
                <span>)</span>
                <input 
                  type="text"
                  name="phoneWork"
                  value={formData.phoneWork}
                  onChange={handleInputChange}
                  className="flex-1 ml-1 border-0 border-b border-black bg-transparent outline-none"
                  placeholder="000-0000"
                />
              </div>

              <div className="flex items-center">
                <input 
                  type="text"
                  className="flex-1 border-0 border-b border-black bg-transparent outline-none"
                  placeholder="Address Line 2"
                />
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">Email Address</span>
                <FormInput
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  width="100%"
                  type="email"
                  error={errors.email}
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2">Local Address</span>
                <FormInput
                  name="localAddress"
                  value={formData.localAddress}
                  onChange={handleInputChange}
                  width="100%"
                />
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">Local Phone (</span>
                <input
                  type="text"
                  name="localPhoneArea"
                  value={formData.localPhone}
                  onChange={handleInputChange}
                  className="w-8 border-0 border-b border-black bg-transparent outline-none text-center"
                  maxLength={3}
                  placeholder="000"
                />
                <span>)</span>
                <input 
                  type="text"
                  name="localPhone"
                  value={formData.localPhone}
                  onChange={handleInputChange}
                  className="flex-1 ml-1 border-0 border-b border-black bg-transparent outline-none"
                  placeholder="000-0000"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2">Date Rented</span>
                <FormInput
                  name="dateRented"
                  value={formData.dateRented}
                  onChange={handleInputChange}
                  width="80px"
                  type="date"
                  error={errors.dateRented}
                />
                <span className="mx-2">Date Due</span>
                <FormInput
                  name="dateDue"
                  value={formData.dateDue}
                  onChange={handleInputChange}
                  width="80px"
                  type="date"
                />
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">Certification Level</span>
                <FormInput
                  name="certificationLevel"
                  value={formData.certificationLevel}
                  onChange={handleInputChange}
                  width="100px"
                  error={errors.certificationLevel}
                />
                <span className="mx-2">Date</span>
                <FormInput
                  name="certificationDate"
                  value={formData.certificationDate}
                  onChange={handleInputChange}
                  width="70px"
                  type="date"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2">Date Returned</span>
                <FormInput
                  name="dateReturned"
                  value={formData.dateReturned}
                  onChange={handleInputChange}
                  width="80px"
                  type="date"
                />
                <span className="mx-2">Received By</span>
                <FormInput
                  name="receivedBy"
                  value={formData.receivedBy}
                  onChange={handleInputChange}
                  width="80px"
                />
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">Certification #</span>
                <FormInput
                  name="certificationNo"
                  value={formData.certificationNo}
                  onChange={handleInputChange}
                  width="100px"
                />
                <span className="mx-2">Agency</span>
                <FormInput
                  name="agency"
                  value={formData.agency}
                  onChange={handleInputChange}
                  width="70px"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2">D/L No.</span>
                <FormInput
                  name="dlNo"
                  value={formData.dlNo}
                  onChange={handleInputChange}
                  width="130px"
                />
                <span className="mx-2">State</span>
                <FormInput
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  width="40px"
                  maxLength={2}
                  placeholder="CA"
                />
              </div>
              
              <div className="flex items-center">
                <span className="mr-2">Equipment prepared by</span>
                <FormInput
                  name="equipmentPreparedBy"
                  value={formData.equipmentPreparedBy}
                  onChange={handleInputChange}
                  width="100%"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2">Credit Card Number</span>
                <FormInput
                  name="creditCardNumber"
                  value={formData.creditCardNumber}
                  onChange={handleCreditCardChange}
                  width="130px"
                  mask={true}
                  error={errors.creditCardNumber}
                  placeholder="0000 0000 0000 0000"
                />
                <span className="mx-2">Exp. Date</span>
                <FormInput
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleInputChange}
                  width="70px"
                  placeholder="MM/YY"
                />
              </div>
              
              <div className="text-xs">(Dive Center/Resort Employee)</div>

              <div className="flex items-center">
                <span className="mr-2">Signature*</span>
                {/* Special signature input without masking */}
                <input
                  type="text"
                  name="signature"
                  value={formData.signature}
                  onChange={handleSignatureChange}
                  className="flex-1 border-0 border-b border-black bg-transparent outline-none"
                  style={{ minHeight: "20px" }}
                />
                {errors.signature && <span className="text-red-500 text-xs ml-2">{errors.signature}</span>}
              </div>
            </div>

            <div className="text-xs mb-4">
              *I authorize the Dive Center/Resort to charge my credit card the daily rate if equipment is not returned
              by due date
            </div>

            {/* Equipment Table */}
            <table className="w-full border-collapse border border-black text-xs mb-4">
              <thead>
                <tr>
                  <th className="border border-black p-1 text-center">QTY</th>
                  <th className="border border-black p-1 text-center">ITEM</th>
                  <th className="border border-black p-1 text-center">SERIAL #</th>
                  <th className="border border-black p-1 text-center">SIZE</th>
                  <th className="border border-black p-1 text-center">DAILY RATE</th>
                  <th className="border border-black p-1 text-center">AMOUNT</th>
                  <th className="border border-black p-1 text-center">QTY</th>
                  <th className="border border-black p-1 text-center">ITEM</th>
                  <th className="border border-black p-1 text-center">SERIAL #</th>
                  <th className="border border-black p-1 text-center">SIZE</th>
                  <th className="border border-black p-1 text-center">DAILY RATE</th>
                  <th className="border border-black p-1 text-center">AMOUNT</th>
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
                  <td colSpan={3} className="border border-black p-1 text-right font-bold">
                    SUBTOTAL
                  </td>
                  <td className="border border-black p-1 text-center font-bold">+ TAX</td>
                  <td className="border border-black p-1 text-center font-bold">= TOTAL</td>
                  <td className="border border-black p-1"></td>
                </tr>
              </tbody>
            </table>

            {/* Totals Section */}
            <div className="flex justify-between items-center mb-4 text-xs">
              <div className="flex space-x-4">
                <div>
                  <div className="font-bold">TOTAL DAYS</div>
                  <input className="w-16 border-0 border-b border-black bg-transparent outline-none" />
                </div>
                <div>
                  <div className="font-bold">TOTAL PER DAY</div>
                  <input className="w-20 border-0 border-b border-black bg-transparent outline-none" />
                </div>
                <div>
                  <div className="font-bold">TOTAL DUE</div>
                  <input className="w-20 border-0 border-b border-black bg-transparent outline-none" />
                </div>
              </div>
              <div>
                <div className="font-bold mb-1">RETURN DEPOSIT</div>
                <div className="flex space-x-4">
                  <div>
                    <div className="text-center">CREDIT CARD</div>
                    <input className="w-20 border-0 border-b border-black bg-transparent outline-none" />
                  </div>
                  <div>
                    <div className="text-center">CASH</div>
                    <input className="w-20 border-0 border-b border-black bg-transparent outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right text-xs">- page 1 of 2 -</div>
          </div>

          {/* Page 2 */}
          <div className="mt-12">
            <div className="text-center mb-4">
              <div className="font-bold text-sm mb-1">
                Release of Liability/Assumption of Risk/Non-agency Acknowledgement Form
              </div>
              <div className="font-bold text-lg mb-2">EQUIPMENT RENTAL AGREEMENT</div>
              <div className="text-xs font-bold mb-2">Please read carefully and fill in all blanks before signing.</div>
            </div>

            <div className="text-xs leading-relaxed space-y-3">
              <p>
                THIS AGREEMENT is entered into between{" "}
                <input
                  type="text"
                  className="border-0 border-b border-black bg-transparent outline-none w-48"
                  placeholder="store/resort"
                />{" "}
                and{" "}
                <input
                  type="text"
                  className="border-0 border-b border-black bg-transparent outline-none w-32"
                  placeholder="rentor"
                />
                , for the rental of scuba and/or skin diving equipment. This AGREEMENT is a release of my rights and the
                rights of my heirs, assigns or beneficiaries to sue for injuries or death resulting from the rental
                and/or use of this equipment. I personally assume all risks of skin and/or scuba diving, whether
                foreseen or unforeseen, related in any way to the rental and/or use of this equipment.
              </p>

              <div className="font-bold">Non-Agency Disclosure and Acknowledgment Agreement</div>

              <p>
                I understand and agree that PADI Members (&quot;Members&quot;), including{" "}
                <input
                  type="text"
                  className="border-0 border-b border-black bg-transparent outline-none w-48"
                  placeholder="store/resort"
                />{" "}
                and/or any individual PADI Instructors and Divemasters associated with the program in which I am
                participating, are licensed to use various PADI Trademarks and to conduct PADI training, but are not
                agents, employees or franchisees of PADI Americas, Inc, or its parent, subsidiary and affiliated
                corporations (&quot;PADI&quot;). I further understand that Member business activities are independent, and are
                neither owned nor operated by PADI, and that while PADI establishes the standards for PADI diver
                training programs, it is not responsible for, nor does it have the right to control, the operation of
                the Members&quot; business activities and the day-to-day conduct of PADI programs and supervision of divers
                by the Members or their associated staff. I further understand and agree on behalf of myself, my heirs
                and my estate that in the event of an injury or death during this activity, neither I nor my estate
                shall seek to hold PADI liable for the actions, inactions or negligence of{" "}
                <input
                  type="text"
                  className="border-0 border-b border-black bg-transparent outline-none w-48"
                  placeholder="store/resort"
                />{" "}
                and/or the instructors and divemasters associated with the activity.
              </p>

              <div className="font-bold">Liability Release and Assumption of Risk Agreement</div>

              <p>
                I understand and agree that{" "}
                <input
                  type="text"
                  className="border-0 border-b border-black bg-transparent outline-none w-48"
                  placeholder="store/resort"
                />
                , and its employees, owners, officers, contractor, assigns or agents (hereinafter referred to as
                &quot;Released Parties&quot;), shall not be held liable or responsible in any way for any injury, death or other
                damages to me, my family, estate, heirs or assigns which may occur as a result of the rental and/or use
                of the equipment, or as a result of product defect, or the negligence of any party, including the
                Released Parties, whether passive or active.
              </p>

              <p>
                I hereby acknowledge receipt of the equipment designated in this form, and, if any of this equipment is
                to be used for scuba diving I affirm I am a certified scuba diver or student diver in a scuba diving
                course/program under the supervision of a certified scuba instructor.
              </p>

              <p>
                I affirm it is my responsibility to inspect all of the equipment and acknowledge it is in good working
                condition. I affirm that it is my responsibility to check both the quality and quantity of gas in any
                scuba tanks. I acknowledge that I should not dive if the equipment is not functioning properly. I will
                not hold the Released Parties responsible for my failure to inspect the equipment prior to diving or if
                I choose to dive with equipment that may not be functioning properly.
              </p>

              <p>
                I understand that skin diving and scuba diving are physically strenuous activities, that I will be
                exerting myself during these activities, and that if I am injured as a result of heart attack, panic,
                hyperventilation, drowning or any other cause, that I expressly assume the risk of said injuries and
                that I will not hold the Released Parties responsible for the same.
              </p>

              <p>
                I agree to reimburse the Dive Center/Resort for the loss or breakage of any and all equipment at the
                current replacement value and to also pay for damages incurred while transporting the equipment. I agree
                to return the equipment in clean condition and to pay a cleaning fee if not returned cleaned.
              </p>

              <p>
                I further state that I am of lawful age and legally competent to sign this liability release, or that I
                have acquired the written consent of my parent or guardian. I understand the terms herein are
                contractual and not a mere recital, and that I have signed this Agreement of my own free act and with
                the knowledge that I hereby agree to waive my legal rights. I further agree if any provision of this
                Agreement is found to be unenforceable or invalid, that provision shall be severed from this Agreement.
                The remainder of this Agreement will then be construed as though the unenforceable provision had never
                been contained herein.
              </p>

              <p>
                I understand and agree that I am not only giving up my right to sue the Released Parties but also any
                rights my heirs, assigns, and beneficiaries may have to sue the Released Parties resulting from my
                death. I further represent I have the authority to do so and that my heirs, assigns, or beneficiaries
                will be estopped from claiming otherwise because of my representations to the Released Parties.
              </p>

              <p className="font-bold">
                I,{" "}
                <input
                  type="text"
                  className="border-0 border-b border-black bg-transparent outline-none w-64"
                  placeholder="rentor"
                />
                , BY THIS INSTRUMENT AGREE TO EXEMPT AND RELEASE THE RELEASED PARTIES AND ALL RELATED ENTITIES AS
                DEFINED ABOVE, FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR PERSONAL INJURY, PROPERTY DAMAGE, OR
                WRONGFUL DEATH AS A RESULT OF RENTING AND/OR USING THE EQUIPMENT, HOWEVER CAUSED, INCLUDING, BUT NOT
                LIMITED TO PRODUCT LIABILITY OR THE NEGLIGENCE OF THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE.
              </p>

              <p>
                I HAVE FULLY INFORMED MYSELF AND MY HEIRS OF THE CONTENTS OF THIS NON-AGENCY DISCLOSURE AND
                ACKNOWLDGEMENT AGREEMENT AND LIABILITY RELEASE AND ASSUMPTION OF RISK AGREEMENT BY READING BOTH BEFORE
                SIGNING BELOW ON BEHALF OF MYSELF AND MY HEIRS.
              </p>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between mt-8 text-xs">
              <div className="w-64">
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full border-0 border-b border-black bg-transparent outline-none"
                    style={{ minHeight: "25px" }}
                  />
                  <div className="mt-1">Participant&quot;s Signature</div>
                </div>
                <div>
                  <input type="text" className="w-full border-0 border-b border-black bg-transparent outline-none" />
                  <div className="mt-1">Date (day/month/year)</div>
                </div>
              </div>
              <div className="w-64">
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full border-0 border-b border-black bg-transparent outline-none"
                    style={{ minHeight: "25px" }}
                  />
                  <div className="mt-1">Signature of Parent/Guardian (where applicable)</div>
                </div>
                <div>
                  <input type="text" className="w-full border-0 border-b border-black bg-transparent outline-none" />
                  <div className="mt-1">Date (day/month/year)</div>
                </div>
              </div>
            </div>

            <div className="text-right text-xs mt-4">- page 2 of 2 -</div>
          </div>
        </div>
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
  )
}