// "use client"

// import Image from "next/image"
// import { useState, useRef } from "react"
// import html2canvas from "html2canvas"
// import { jsPDF } from "jspdf"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { toast } from "sonner"


// interface FormData {
//   participantName: string
//   signature: string
//   guardianSignature: string
//   date: string
// }

// const StandardsForm = () => {
//   const [formData, setFormData] = useState<FormData>({
//     participantName: "",
//     signature: "",
//     guardianSignature: "",
//     date: "",
//   })
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const formRef = useRef<HTMLDivElement>(null)


//   const handleInputChange = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const validateForm = (): boolean => {
//     if (!formData.participantName || !formData.signature || !formData.date) {
//       toast( "Please fill in required fields: Participant Name, Signature, and Date"
//       )
//       return false
//     }
//     return true
//   }

//   const generatePDF = async (): Promise<Blob | null> => {
//     if (!formRef.current) return null

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 100))

//       const canvas = await html2canvas(formRef.current, {
//         scale: 2,
//         useCORS: true,
//         allowTaint: false,
//         backgroundColor: "#ffffff",
//         logging: false,
//         imageTimeout: 15000,
//         removeContainer: true,
//       })

//       const imgData = canvas.toDataURL("image/jpeg", 0.9)
//       const pdf = new jsPDF("p", "mm", "a4")
//       const pdfWidth = pdf.internal.pageSize.getWidth()
//       const pdfHeight = pdf.internal.pageSize.getHeight()

//       const ratio = canvas.width / canvas.height
//       const margin = 10
//       let imgWidth = pdfWidth - margin * 2
//       let imgHeight = imgWidth / ratio

//       if (imgHeight > pdfHeight - margin * 2) {
//         imgHeight = pdfHeight - margin * 2
//         imgWidth = imgHeight * ratio
//       }

//       const x = (pdfWidth - imgWidth) / 2
//       const y = (pdfHeight - imgHeight) / 2

//       pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight)

//       return pdf.output("blob")
//     } catch (error) {
//       console.error("Error generating PDF:", error)
//       return null
//     }
//   }

//   const handleExportPDF = async () => {
//     if (!validateForm()) return

//     setIsGeneratingPDF(true)
//     try {
//       const pdfBlob = await generatePDF()
//       if (pdfBlob) {
//         const fileName = `Diving_Safety_Standards_${formData.participantName
//           .replace(/\s+/g, "_")
//           .trim()}_${new Date().toISOString().split("T")[0]}.pdf`

//         const url = URL.createObjectURL(pdfBlob)
//         const a = document.createElement("a")
//         a.href = url
//         a.download = fileName
//         document.body.appendChild(a)
//         a.click()
//         document.body.removeChild(a)
//         URL.revokeObjectURL(url)

//         toast(
//          "PDF exported successfully!")
//       }
//     } catch (error) {
//       toast("Failed to generate PDF. Please try again.")
//     } finally {
//       setIsGeneratingPDF(false)
//     }
//   }

//   const handleSubmitToBackend = async () => {
//     if (!validateForm()) return

//     setIsSubmitting(true)
//     try {
//       const pdfBlob = await generatePDF()
//       if (!pdfBlob) {
//         throw new Error("Failed to generate PDF")
//       }

//       const formDataToSend = new FormData()
//       formDataToSend.append("participantName", formData.participantName)
//       formDataToSend.append("signature", formData.signature)
//       formDataToSend.append("guardianSignature", formData.guardianSignature)
//       formDataToSend.append("date", formData.date)
//       formDataToSend.append("pdf", pdfBlob, `diving_standards_${formData.participantName}.pdf`)

//       const response = await fetch("/api/submit-standards-form", {
//         method: "POST",
//         body: formDataToSend,
//       })

//       if (!response.ok) {
//         throw new Error("Failed to submit form")
//       }

//       const result = await response.json()

//       toast("Form submitted successfully to backend!")

//       // Reset form after successful submission
//       setFormData({
//         participantName: "",
//         signature: "",
//         guardianSignature: "",
//         date: "",
//       })
//     } catch (error) {
//       console.error("Submission error:", error)
//       toast( "Failed to submit form. Please try again.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background py-8">
//       {/* Action Buttons */}
//       <div className="max-w-4xl mx-auto mb-6 px-4">
//         <Card className="border-primary">
//           <CardContent className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button
//                 onClick={handleExportPDF}
//                 disabled={isGeneratingPDF}
//                 className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
//                 size="lg"
//               >
//                 {isGeneratingPDF ? "Generating PDF..." : "Export as PDF"}
//               </Button>
//               <Button
//                 onClick={handleSubmitToBackend}
//                 disabled={isSubmitting || isGeneratingPDF}
//                 className="flex-1"
//                 size="lg"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit to Backend"}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Form Content */}
//       <div className="max-w-4xl mx-auto px-4">
//         <Card className="border-primary border-2">
//           <div ref={formRef} className="bg-card p-8 text-sm leading-relaxed font-serif">
//             {/* Header */}
//             <div className="flex items-center pb-6 border-b-2 border-primary">
//               <div className="mr-8 flex-shrink-0">
//                 <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
//                   <Image
//                     src="/diving-logo.jpg"
//                     alt="Diving Standards Logo"
//                     width={80}
//                     height={80}
//                     className="rounded"
//                   />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h1 className="text-center font-bold text-2xl mb-2 text-primary">Standard Safe Diving Practices</h1>
//                 <h2 className="text-center text-lg font-semibold mb-4 text-foreground">Statement of Understanding</h2>
//                 <p className="text-center text-sm font-medium text-muted-foreground">
//                   Please read carefully before signing.
//                 </p>
//               </div>
//             </div>

//             {/* Introduction */}
//             <div className="mt-6 mb-6">
//               <p className="mb-4 text-foreground">
//                 This is a statement in which you are informed of the established safe diving practices for skin and
//                 scuba diving. These practices have been compiled for your review and acknowledgement and are intended to
//                 increase your comfort and safety in diving.{" "}
//                 <strong>Your signature on this statement is required</strong> as proof that you are aware of these safe
//                 diving practices. Read and discuss the statement prior to signing it. If you are a minor, this form must
//                 also be signed by a parent or guardian.
//               </p>

//               <div className="mb-6">
//                 <span className="text-foreground">I, </span>
//                 <Input
//                   type="text"
//                   value={formData.participantName}
//                   onChange={(e) => handleInputChange("participantName", e.target.value)}
//                   placeholder="Participant Name"
//                   className="inline-block w-80 mx-2 border-0 border-b-2 border-primary bg-transparent focus:ring-0 focus:border-accent"
//                 />
//                 <span className="text-foreground">, understand that as a diver I should:</span>
//               </div>
//             </div>

//             {/* Safety Practices List */}
//             <div className="grid md:grid-cols-2 gap-8 mb-8">
//               <div>
//                 <ol className="list-decimal ml-6 space-y-3 text-foreground">
//                   <li>
//                     Maintain good mental and physical fitness for diving. Avoid being under the influence of alcohol or
//                     dangerous drugs when diving. Keep proficient in diving skills, striving to increase them through
//                     continuing education and reviewing them in controlled conditions after a period of diving
//                     inactivity, and refer to my course materials to stay current and refresh myself on important
//                     information.
//                   </li>
//                   <li>
//                     Be familiar with my dive sites. If not, obtain a formal diving orientation from a knowledgeable,
//                     local source. If diving conditions are worse than those in which I am experienced, postpone diving
//                     or select an alternate site with better conditions. Engage only in diving activities consistent with
//                     my training and experience. Do not engage in cave or technical diving unless specifically trained to
//                     do so.
//                   </li>
//                   <li>
//                     Use complete, well-maintained, reliable equipment with which I am familiar; and inspect it for
//                     correct fit and function prior to each dive. Have a buoyancy control device, low-pressure buoyancy
//                     control inflation system, submersible pressure gauge and alternate air source and dive
//                     planning/monitoring device (dive computer, RDP/dive tables—whichever you are trained to use) when
//                     scuba diving. Deny use of my equipment to uncertified divers.
//                   </li>
//                   <li>
//                     Listen carefully to dive briefings and directions and respect the advice of those supervising my
//                     diving activities. Recognize that additional training is recommended for participation in specialty
//                     diving activities, in other geographic areas and after periods of inactivity that exceed six months.
//                   </li>
//                   <li>
//                     Adhere to the buddy system throughout every dive. Plan dives – including communications, procedures
//                     for reuniting in case of separation and emergency procedures – with my buddy.
//                   </li>
//                 </ol>
//               </div>

//               <div>
//                 <ol className="list-decimal ml-6 space-y-3 text-foreground" start={6}>
//                   <li>
//                     Be proficient in dive planning (dive computer or dive table use). Make all dives no decompression
//                     dives and allow a margin of safety. Have a means to monitor depth and time underwater. Limit maximum
//                     depth to my level of training and experience. Ascend at a rate of not more than 18 metres/60 feet
//                     per minute. Be a SAFE diver –<strong>Slowly Ascend From Every dive</strong>. Make a safety stop as
//                     an added precaution, usually at 5 metres/15 feet for three minutes or longer.
//                   </li>
//                   <li>
//                     Maintain proper buoyancy. Adjust weighting at the surface for neutral buoyancy with no air in my
//                     buoyancy control device. Maintain neutral buoyancy while underwater. Be buoyant for surface swimming
//                     and resting. Have weights clear for easy removal, and establish buoyancy when in distress while
//                     diving. Carry at least one surface signaling device (such as signal tube, whistle, mirror).
//                   </li>
//                   <li>
//                     Breathe properly for diving. Never breath-hold or skip-breathe when breathing compressed air, and
//                     avoid excessive hyperventilation when breath-hold diving. Avoid overexertion while in and underwater
//                     and dive within my limitations.
//                   </li>
//                   <li>Use a boat, float or other surface support station, whenever feasible.</li>
//                   <li>Know and obey local dive laws and regulations, including fish and game and dive flag laws.</li>
//                 </ol>
//               </div>
//             </div>

//             {/* Understanding Statement */}
//             <div className="mb-8 p-4 bg-muted/50 rounded-lg">
//               <p className="text-foreground font-medium">
//                 I understand the importance and purposes of these established practices. I recognize they are for my own
//                 safety and well-being, and that failure to adhere to them can place me in jeopardy when diving.
//               </p>
//             </div>

//             <Separator className="my-6" />

//             {/* Signature Section */}
//             <div className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block font-semibold mb-2 text-foreground">Participant's Signature:</label>
//                   <Input
//                     type="text"
//                     value={formData.signature}
//                     onChange={(e) => handleInputChange("signature", e.target.value)}
//                     placeholder="Your signature"
//                     className="border-0 border-b-2 border-primary bg-transparent focus:ring-0 focus:border-accent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-semibold mb-2 text-foreground">Date (Day/Month/Year):</label>
//                   <Input
//                     type="text"
//                     value={formData.date}
//                     onChange={(e) => handleInputChange("date", e.target.value)}
//                     placeholder="DD/MM/YYYY"
//                     className="border-0 border-b-2 border-primary bg-transparent focus:ring-0 focus:border-accent"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block font-semibold mb-2 text-foreground">
//                   Signature of Parent or Guardian (where applicable):
//                 </label>
//                 <Input
//                   type="text"
//                   value={formData.guardianSignature}
//                   onChange={(e) => handleInputChange("guardianSignature", e.target.value)}
//                   placeholder="Parent/Guardian signature (if applicable)"
//                   className="border-0 border-b-2 border-primary bg-transparent focus:ring-0 focus:border-accent max-w-md"
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-8 pt-4 border-t border-muted text-xs text-muted-foreground text-center">
//               Product No. 10060 (Rev. 06/15) Version 2.01 © Diving Standards 2024
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default StandardsForm
