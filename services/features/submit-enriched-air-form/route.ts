// import { type NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData()

//     const data = {
//       participantName: formData.get("participantName") as string,
//       participantSignature: formData.get("participantSignature") as string,
//       guardianSignature: formData.get("guardianSignature") as string,
//       participantDate: formData.get("participantDate") as string,
//       guardianDate: formData.get("guardianDate") as string,
//       storeResort: formData.get("storeResort") as string,
//       hasInsurance: formData.get("hasInsurance") as string,
//       policyNumber: formData.get("policyNumber") as string,
//       submittedAt: new Date().toISOString(),
//     }

//     // Here you would typically save to a database

//     console.log("Form submission:", data)

//     return NextResponse.json({
//       success: true,
//       message: "Form submitted successfully",
//       data,
//     })
//   } catch (error) {
//     console.error("Error processing form submission:", error)
//     return NextResponse.json({ success: false, message: "Failed to submit form" }, { status: 500 })
//   }
// }

