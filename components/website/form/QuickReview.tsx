"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

const loadJsPDF = async () => {
  const { default: jsPDF } = await import("jspdf")
  return jsPDF
}

const QuickReview = () => {
  const [studentName, setStudentName] = useState("")
  const [signature, setSignature] = useState("")
  const [date, setDate] = useState("")
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [oxygenLimit, setOxygenLimit] = useState("")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const questions = [
    {
      id: 1,
      text: "If you begin to near an oxygen limit or a no decompression limit displayed on your computer, you should",
      options: [
        "a. ascend until your computer displays a longer limit and stay that shallow or shallower.",
        "b. rapidly ascend and abort the dive.",
        "c. keep a close eye on your computer and be sure you ascend exactly at the limit.",
        "d. None of the above.",
      ],
    },
    {
      id: 2,
      text: "The maximum oxygen partial pressure limit is ______ ata/bar.",
      isInput: true,
    },
    {
      id: 3,
      text: "The primary hazard of exceeding oxygen exposure limits is drowning due to central nervous system (CNS) oxygen toxicity.",
      options: ["a. True", "b. False"],
    },
    {
      id: 4,
      text: "If you experience any symptoms of oxygen toxicity you should",
      options: [
        "a. ascend until you feel better.",
        "b. shorten the dive by ten minutes.",
        "c. make a rapid [30 metres/100 feet per minute or faster] ascent.",
        "d. end the dive immediately by making a normal ascent.",
      ],
    },
    {
      id: 5,
      text: "You do not dive an enriched air cylinder unless you have personally verified the analysis of its contents.",
      options: ["a. True", "b. False"],
    },
    {
      id: 6,
      text: "Guidelines to apply when diving with an enriched air computer include",
      options: [
        "a. staying well within computer limits.",
        "b. using the maximum depth warning as a secondary alert.",
        "c. that each diver needs an individual dive computer.",
        "d. All of the above.",
      ],
    },
    {
      id: 7,
      text: "If a diver convulses underwater, you should",
      options: [
        "a. hold the regulator in the mouth if it is there.",
        "b. get the diver to the surface and check for breathing.",
        "c. get the diver to the boat or shore as quickly as possible.",
        "d. All of the above.",
      ],
    },
    {
      id: 8,
      text: "By using your computer's scroll mode or other display, or with the table in the PADI Enriched Air Diver Manual, you should determine and note",
      options: [
        "a. the amount of oxygen in the blend.",
        "b. the no stop limit for 40 metres/130 feet.",
        "c. the deepest depth you can reach without exceeding 1.4.",
        "d. All of the above.",
      ],
    },
    {
      id: 9,
      text: "Warning signs and symptoms of a CNS convulsion, if they occur, may include",
      options: ["a. visual disturbances.", "b. limb and joint pain.", "c. heart burn.", "d. All of the above."],
    },
    {
      id: 10,
      text: "The primary concerns of filling an enriched air cylinder are fire/explosion hazard and",
      options: [
        "a. percentage of oxygen in the blend.",
        "b. adjusting the maximum depth.",
        "c. finding proper equipment for analysis.",
        "d. transporting the cylinder to the dive site.",
      ],
    },
  ]

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleExportPDF = async () => {
    if (!studentName || !signature || !date) {
      alert("Please fill in required fields: Name, Signature, and Date")
      return
    }

    setIsGeneratingPDF(true)

    try {
      const jsPDF = await loadJsPDF()
      const pdf = new jsPDF("p", "mm", "a4")

      // Page dimensions
      const pageWidth = 210
      const pageHeight = 297
      const margin = 20
      const contentWidth = pageWidth - margin * 2

      let yPosition = margin

      // Simple header with text only (no image to avoid complications)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.setTextColor(0, 0, 0)
      pdf.text("PADI Enriched Air Diver Course", pageWidth / 2, yPosition, { align: "center" })
      yPosition += 6
      pdf.setFontSize(14)
      pdf.text("Quick Review", pageWidth / 2, yPosition, { align: "center" })
      yPosition += 15

      // Name field - Display actual name value
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.text("Name", margin, yPosition)
      pdf.text(studentName, margin + 15, yPosition) // Add the actual name
      // Long underline for name
      pdf.line(margin + 15, yPosition + 1, margin + 100, yPosition + 1)
      yPosition += 8

      // Directions
      pdf.setFont("helvetica", "bold")
      pdf.text("Directions: Choose the best answer from the choices provided.", margin, yPosition)
      yPosition += 8

      // Questions - Match exact layout from reference
      questions.forEach((question) => {
        // Check if we need a new page (leave space for at least 2 options)
        if (yPosition > pageHeight - 40) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        
        // Question text
        const questionLines = pdf.splitTextToSize(
          `${question.id}. ${question.text}`,
          contentWidth
        )
        pdf.text(questionLines, margin, yPosition)
        yPosition += questionLines.length * 5 + 2

        if (question.isInput) {
          // For input question (question 2) - display actual oxygen limit value
          pdf.text(oxygenLimit, margin + 10, yPosition) // Add the actual oxygen limit value
          pdf.line(margin + 10, yPosition + 1, margin + 30, yPosition + 1)
          pdf.text("ata/bar", margin + 35, yPosition)
          yPosition += 8
        } else if (question.options) {
          // For multiple choice questions - use checkmarks like web form
          question.options.forEach((option) => {
            const isSelected = answers[question.id] === option
            
            // Checkbox with checkmark for selected items
            pdf.setFont("helvetica", "normal")
            // Draw checkbox
            pdf.rect(margin + 5, yPosition - 3, 4, 4)
            // Add checkmark if selected
            if (isSelected) {
              pdf.line(margin + 6, yPosition - 1, margin + 7, yPosition)
              pdf.line(margin + 7, yPosition, margin + 9, yPosition - 2)
            }
            
            // Option text - make selected option bold
            if (isSelected) {
              pdf.setFont("helvetica", "bold")
            } else {
              pdf.setFont("helvetica", "normal")
            }
            
            pdf.text(option, margin + 15, yPosition)
            yPosition += 4.5
            
            // Reset font to normal for next option
            pdf.setFont("helvetica", "normal")
          })
          yPosition += 3
        }
      })

      // Page break if needed for student statement
      if (yPosition > pageHeight - 40) {
        pdf.addPage()
        yPosition = margin
      }

      // Student Statement - Exact match to reference
      yPosition += 5
      pdf.setFont("helvetica", "bold")
      pdf.text("Student Statement:", margin, yPosition)
      yPosition += 5
      pdf.setFont("helvetica", "normal")
      const statementText = '"Any questions I answered incorrectly I\'ve had explained to me and I understand what I missed."'
      const statementLines = pdf.splitTextToSize(statementText, contentWidth)
      pdf.text(statementLines, margin, yPosition)
      yPosition += statementLines.length * 5 + 8

      // Signature and Date - Display actual values
      pdf.text("Signature", margin, yPosition)
      pdf.text(signature, margin + 20, yPosition) // Add the actual signature
      pdf.line(margin + 20, yPosition + 1, margin + 80, yPosition + 1)
      
      pdf.text("Date", margin + 100, yPosition)
      pdf.text(date, margin + 115, yPosition) // Add the actual date
      pdf.line(margin + 115, yPosition + 1, margin + 170, yPosition + 1)
      yPosition += 10

      // Footer - Exact match to reference position
      pdf.setFontSize(8)
      pdf.text("435DT (5/09) Version 1.0", margin, pageHeight - 10)

      pdf.save(
        `PADI_Quick_Review_${studentName
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "_")
          .trim()}.pdf`
      )
    } catch (error: unknown) {
      console.error("Error generating PDF:", error)
      alert("PDF generation failed. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        {/* Export Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleExportPDF}
            disabled={isGeneratingPDF}
            className={`font-semibold py-3 px-8 rounded-lg transition duration-200 ${
              isGeneratingPDF
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {isGeneratingPDF ? "Generating PDF..." : "📄 Export PDF"}
          </Button>
        </div>
   
        {/* Form Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {/* Logo and Title Section - Matching the reference image */}
          <div className="bg-white py-6 px-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-3">
              {/* PADI Logo */}
              <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center">
                <Image 
                  src="/images/standard.png" 
                  alt="PADI Logo" 
                  className="w-10 h-10 object-contain"
                  width={100}  
                  height={100}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">PADI Enriched Air Diver Course</h1>
                <h2 className="text-xl font-semibold">Quick Review</h2>
              </div>
            </div>
          </div>

          <div className="px-6 lg:px-8 py-8">
            {/* Name Field */}
            <div className="mb-8 flex items-center gap-3 border-b border-gray-200 pb-4">
              <span className="text-sm font-bold">Name:</span>
              <div className="flex-1 border-b-2 border-gray-400">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="________________________"
                  className="border-0 bg-transparent px-2 py-1 w-full text-sm focus:outline-none"
                />
              </div>
            </div>

            <p className="mb-6 text-sm font-bold text-gray-700 bg-gray-100 p-3 rounded">
              Directions: Choose the best answer from the choices provided.
            </p>

            {/* Questions */}
            <div className="space-y-8">
              {questions.map((question) => (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <p className="text-sm font-medium mb-4 leading-relaxed">
                    <span className="font-bold">{question.id}.</span> {question.text}
                  </p>

                  {question.isInput ? (
                    <div className="ml-6 flex items-center gap-2">
                      <div className="border-b-2 border-gray-400 w-20">
                        <input
                          type="text"
                          value={question.id === 2 ? oxygenLimit : ""}
                          onChange={(e) => question.id === 2 && setOxygenLimit(e.target.value)}
                          placeholder="______"
                          className="border-0 bg-transparent px-2 py-1 w-full text-sm focus:outline-none text-center font-bold"
                        />
                      </div>
                      <span className="text-sm">ata/bar</span>
                    </div>
                  ) : (
                    <div className="ml-6 space-y-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-start gap-3 cursor-pointer group">
                          <div className="flex items-center justify-center w-4 h-4 border border-gray-400 rounded-sm mt-0.5">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={answers[question.id] === option}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="opacity-0 absolute"
                            />
                            {answers[question.id] === option && (
                              <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                            )}
                          </div>
                          <span className={`text-sm ${answers[question.id] === option ? 'font-bold text-blue-700' : 'text-gray-700'}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Student Statement */}
            <div className="mt-10 p-6 bg-gray-100 rounded-lg border border-gray-300">
              <p className="text-sm font-bold mb-4 text-gray-800">Student Statement:</p>
              <p className="text-sm italic mb-6 text-gray-700 leading-relaxed">
                &quot;Any questions I answered incorrectly I&quot;ve had explained to me and I understand what I missed.&quot;
              </p>

              {/* Signature and Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold whitespace-nowrap">Signature:</span>
                    <div className="flex-1 border-b-2 border-gray-400">
                      <input
                        type="text"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="________________________"
                        className="border-0 bg-transparent w-full text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold whitespace-nowrap">Date:</span>
                    <div className="flex-1 border-b-2 border-gray-400">
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border-0 bg-transparent w-full text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-300 text-center">
              <p className="text-xs text-gray-500">
                435DT (5/09) Version 1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickReview