"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
// import { useBooking } from "../course/booking-context";

import { generatePaginatedPDF, downloadPDF } from "@/lib/pdf-utils";

interface PadiQuickReviewProps {
  onSubmitSuccess?: () => void;
}

// export default function PadiQuickReview() {
export default function PadiQuickReview({
  onSubmitSuccess,
}: PadiQuickReviewProps) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    signature: "",
    signatureDate: "",
    answers: {} as Record<number, string>,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // const { dispatch } = useBooking();

  const formRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (qNum: number, answer: string) => {
    setFormData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [qNum]: answer },
    }));
  };

  const handleDownloadPDF = async () => {
    if (!formRef.current) return;

    if (!formData.name || !formData.date) {
      alert("Please fill in required fields: Name and Date");
      return;
    }

    setIsGenerating(true);

    try {
      const fileName = `PADI_Quick_Review_${formData.name
        .replace(/[^a-zA-Z0-9]/g, "_")
        .trim()}.pdf`;
      const pdfFile = await generatePaginatedPDF(formRef.current, fileName);
      downloadPDF(pdfFile);
      onSubmitSuccess?.();
    } catch (error: unknown) {
      console.error("PDF download failed:", error);
      alert("PDF download failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const questions = [
    {
      number: 1,
      text: "What is the most important rule in scuba diving?",
      options: [
        "Never dive alone.",
        "Always perform a predive safety check.",
        "Establish positive buoyancy and relax when at the surface.",
        "Breathe continuously and never hold your breath.",
      ],
    },
    {
      number: 2,
      text: "To keep my ears from hurting while descending, I should:",
      options: [
        "equalize early and often.",
        "go down as quickly as possible.",
        "blow air into my mask through my nose.",
        "always descend head first.",
      ],
    },
    {
      number: 3,
      text: "Diving when I have a cold or allergies may cause me to:",
      options: [
        "become unconscious without warning.",
        "become tired or seasick easily.",
        "have significant difficulty equalizing pressure in my body air spaces.",
        "use my air up too fast.",
      ],
    },
    {
      number: 4,
      text: "If I can't equalize my ears while descending, I should:",
      options: [
        "continue diving and deal with the pain.",
        "end the dive.",
        "swim just below the surface for the entire dive.",
        "continue to ascend slightly and attempt equalizing until I run low on air.",
      ],
    },
    {
      number: 5,
      text: "Holding my breath while scuba diving can:",
      options: [
        "cause serious, life-threatening lung injuries.",
        "make me float.",
        "help me conserve air.",
        "lead to oxygen toxicity.",
      ],
    },
    {
      number: 6,
      text: "If I work too hard and find it difficult to breathe underwater, I should:",
      options: [
        "inflate my BCD and immediately go to the surface.",
        "stop all activity and rest, hold onto something for support if possible.",
        "swim quickly to my buddy and signal for help.",
        "do a controlled emergency swimming ascent (CESA – swimming up to the surface saying the ah-h-h sound).",
      ],
    },
    {
      number: 7,
      text: "During a dive, I can't stop shivering. What should I do?",
      options: [
        "Continue the dive, but plan to wear more exposure protection on the next dive.",
        "Swim faster to warm up.",
        "Exit the water immediately, dry off and seek warmth.",
        "Exit the water when planned, but cancel the next dive.",
      ],
    },
    {
      number: 8,
      text: "The most important feature of my weight system is:",
      options: [
        "how tight I can get the belt to fit on my waist.",
        "having enough weight to sink quickly.",
        "a clip that prevents weights from accidentally dropping.",
        "a quick release that allows me to drop enough weight to float.",
      ],
    },
    {
      number: 9,
      text: "If I become separated from my buddy underwater, what should I generally do?",
      options: [
        "Go up right away, wait a minute and then go back down underwater.",
        "Search for a minute underwater and then go up to find my buddy.",
        "Go to the surface right away and get out of the water.",
        "Find my buddy's bubbles and follow the bubbles to my buddy.",
      ],
    },
    {
      number: 10,
      text: "My buddy and I observe a mild current at the dive site. Generally, how should we begin our dive?",
      options: [
        "Dive with the current.",
        "Dive across the current.",
        "Dive against or into the current.",
        "Dive at an angle to the current.",
      ],
    },
    {
      number: 11,
      text: "My buddy and I can't get back to the boat due to a current. What should we do?",
      options: [
        "Make ourselves float, signal for help, rest and wait for the boat to pick us up.",
        "Descend and try to swim against the current near the bottom.",
        "Make ourselves float, signal for help, and try to swim against the current.",
        "Try to swim against the current by staying just below the surface.",
      ],
    },
    {
      number: 12,
      text: "Most injuries caused by aquatic animals happen because:",
      options: [
        "the animal is trying to protect itself.",
        "the animal is aggressive.",
        "the animal can't see that you are a diver.",
        "the animal thinks you are food.",
      ],
    },
    {
      number: 13,
      text: "If a diving-related problem occurs at the surface, I should:",
      options: [
        "immediately establish positive buoyancy and stop, think, then act to handle the problem.",
        "descend to solve the problem.",
        "take my mask off.",
        "remove my weight belt and hand it to my buddy.",
      ],
    },
    {
      number: 14,
      text: "My buddy gives me the out-of-air signal, I should:",
      options: [
        "offer my buddy my alternate air source, then ascend together in a controlled manner.",
        "signal for my buddy to make a controlled emergency swimming ascent (CESA – swim up to the surface saying the ah-h-h sound).",
        "look for another diver to share air with my buddy.",
        "signal 'up' and make a normal ascent.",
      ],
    },
    {
      number: 15,
      text: "The risk of decompression sickness – nitrogen bubbles blocking blood flow in the body after a diver increases, if a diver:",
      options: [
        "dives in poor visibility, strong moving water, and rough seas.",
        "is tired, cold, sick, thirsty or overweight.",
        "dives using equipment that is not working properly.",
        "does only one dive a day.",
      ],
    },
    {
      number: 16,
      text: "To reduce the risk of decompression sickness:",
      options: [
        "only dive in warm, clear water.",
        "breathe more slowly than normal.",
        "make a safety stop of 3 metres/15 feet at the end of each dive.",
        "ascend to a shallower depth if feeling dizzy.",
      ],
    },
    {
      number: 17,
      text: "The first step in using my dive computer is:",
      options: [
        "setting the time and date.",
        "reading the manufacturer's instructions.",
        "calibrating it for enriched air nitrox.",
        "setting it for fresh or salt water.",
      ],
    },
    {
      number: 18,
      text: "If I make two dives in one day and plan to fly home on a commercial plane, What is the minimum time I should wait before getting on the plane?",
      options: [
        "You should wait at least:",
        "48 hours",
        "24 hours",
        "18 hours",
      ],
    },
    {
      number: 19,
      text: "To plan a dive, I use my dive computer's Dive Plan Mode (or other name the manufacturer uses) to determine:",
      options: [
        "the maximum depth of the previous dive.",
        "the no stop limits for each depth (typically in 3 metre/10 foot increments).",
        "whether my computer is compatible with my buddy's computer.",
        "the best settings for my backup computer.",
      ],
    },
    {
      number: 20,
      text: "If I accidentally exceed my computer's no stop limits, I need to:",
      options: [
        "surface immediately, breathe oxygen and report my condition to the nearest medical facility.",
        "ascend immediately and make a safety stop for three minutes at 5 metres/15 feet.",
        "decompress according to the computer's instructions.",
        "make a safety stop for as long as possible before running low on air.",
      ],
    },
    {
      number: 21,
      text: "Most divers begin to notice the effects of gas narcosis at approximately:",
      options: [
        "10 metres/30 feet",
        "20 metres/60 feet",
        "30 metres/100 feet",
        "40 metres/130 feet",
      ],
    },
    {
      number: 22,
      text: "After a dive to 12 metres/40 feet for 60 minutes, the pressure group is:",
      options: ["N", "P", "R", "T"],
    },
    {
      number: 23,
      text: "A group of Advanced Open Water Divers plans to make two dives. The first dive is to 18 metres/60 feet of water for 20 minutes. The group then remains on the surface for 1 hour. The group wants to make a second dive to 14 metres/45 feet of water, with a planned bottom time of 30 minutes. What will be the ending pressure group after the second dive?",
      options: ["K", "L", "R", "S"],
    },
    {
      number: 24,
      text: "After a dive to 18 metres/60 feet for 23 minutes, with a 40 minute surface interval, what is the maximum allowable time for the second dive to 18 metres/60 feet?",
      options: ["14 minutes", "15 minutes", "41 minutes", "38 minutes"],
    },
    {
      number: 25,
      text: "A buddy team plans to make two dives. The first dive is to 18 metres/60 feet for 49 minutes, and the second dive is to 18 metres/60 feet for 23 minutes. They want to do these two dives safely?",
      options: ["26 minutes", "32 minutes", "54 minutes", "59 minutes"],
    },
  ];

  return (
    <div className="min-h-screen bg-white ">
      {/* Download Button */}
      <div className="flex justify-center mt-4 top-4 right-4 z-10 no-print">
        <Button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg disabled:opacity-50"
        >
          {isGenerating ? "Generating PDF..." : "Download as PDF"}
        </Button>
      </div>

      {/* Form Content */}
      <div
        ref={formRef}
        className="max-w-4xl mx-auto bg-white p-8 font-serif print-area"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Quick Review</h1>
          <div className="flex gap-8 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Name</span>
              <div className="border-b border-black w-64">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full bg-transparent outline-none px-1"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Date</span>
              <div className="border-b border-black w-40">
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full bg-transparent outline-none px-1"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <p className="text-sm mb-4">
            <strong>Directions:</strong> Choose the best answer from the choices
            provided.
          </p>
          <p className="text-xs mb-6">
            Note: Use your instructor&apos;s feedback when taking this quiz. If
            your instructor teaches dive planning using dive computers answer
            questions 1-21, otherwise complete all 25 questions.
          </p>
        </div>

        {/* Questions in Two Columns */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Left Column - Questions 1-13 */}
          <div className="space-y-6">
            {questions.slice(0, 13).map((q) => (
              <div key={q.number} className="text-sm break-inside-avoid">
                <p className="font-medium mb-2">
                  {q.number}. {q.text}
                </p>
                <div className="space-y-1 ml-4">
                  {q.options.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-start gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={`q${q.number}`}
                        checked={formData.answers[q.number] === option}
                        onChange={() => handleAnswerChange(q.number, option)}
                        className="mt-0.5 w-3 h-3 flex-shrink-0"
                      />
                      <span className="text-xs leading-tight">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Questions 14-25 */}
          <div className="space-y-6">
            {questions.slice(13, 25).map((q) => (
              <div key={q.number} className="text-sm break-inside-avoid">
                <p className="font-medium mb-2">
                  {q.number}. {q.text}
                </p>
                <div className="space-y-1 ml-4">
                  {q.options.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-start gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={`q${q.number}`}
                        checked={formData.answers[q.number] === option}
                        onChange={() => handleAnswerChange(q.number, option)}
                        className="mt-0.5 w-3 h-3 flex-shrink-0"
                      />
                      <span className="text-xs leading-tight">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RDP Section */}
        <div className="mt-12 border-t border-black pt-6">
          <h2 className="text-lg font-bold mb-4">
            Use either the RDP Table or eRDPml
          </h2>
        </div>

        {/* eLearner Statement */}
        <div className="mt-12 border-t border-black pt-6">
          <p className="text-sm mb-4">
            <strong>eLearner Statement:</strong> Any questions I answered
            incorrectly, I&apos;ve had explained to me and I understand what I
            missed.
          </p>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm">Signature</span>
              <div className="border-b border-black w-64">
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) =>
                    handleInputChange("signature", e.target.value)
                  }
                  className="w-full bg-transparent outline-none px-1"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Date</span>
              <div className="border-b border-black w-32">
                <input
                  type="text"
                  value={formData.signatureDate}
                  onChange={(e) =>
                    handleInputChange("signatureDate", e.target.value)
                  }
                  className="w-full bg-transparent outline-none px-1"
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-black text-xs text-center">
          <p>Product No. 38101 (Rev. 4/19) Version: 4.0 © PADI 2019</p>
        </div>
      </div>
    </div>
  );
}
