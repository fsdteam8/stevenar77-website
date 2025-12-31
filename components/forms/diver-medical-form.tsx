"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/lib/forms/medical-form-pdf-generator";
import { toast } from "sonner";
import { useFormStore } from "@/store/formStore";
import { useToastStore } from "@/store/toastStore";
import Swal from "sweetalert2";

interface FormData {
  participantName: string;
  birthdate: string;
  facilityName: string;
  instructorName: string;
  date: string;
  participantSignature: string;
  question1: boolean | null;
  question2: boolean | null;
  question3: boolean | null;
  question4: boolean | null;
  question5: boolean | null;
  question6: boolean | null;
  question7: boolean | null;
  question8: boolean | null;
  question9: boolean | null;
  question10: boolean | null;
  boxA1: boolean | null;
  boxA2: boolean | null;
  boxA3: boolean | null;
  boxA4: boolean | null;
  boxA5: boolean | null;
  boxB1: boolean | null;
  boxB2: boolean | null;
  boxB3: boolean | null;
  boxB4: boolean | null;
  boxC1: boolean | null;
  boxC2: boolean | null;
  boxC3: boolean | null;
  boxC4: boolean | null;
  boxD1: boolean | null;
  boxD2: boolean | null;
  boxD3: boolean | null;
  boxD4: boolean | null;
  boxD5: boolean | null;
  boxE1: boolean | null;
  boxE2: boolean | null;
  boxE3: boolean | null;
  boxE4: boolean | null;
  boxF1: boolean | null;
  boxF2: boolean | null;
  boxF3: boolean | null;
  boxF4: boolean | null;
  boxF5: boolean | null;
  boxG1: boolean | null;
  boxG2: boolean | null;
  boxG3: boolean | null;
  boxG4: boolean | null;
  boxG5: boolean | null;
  boxG6: boolean | null;
  medicalExaminerName: string;
  medicalExaminerSignature: string;
  medicalExaminerDate: string;
  medicalExaminerPhone: string;
  medicalExaminerClinic: string;
  medicalExaminerAddress: string;
  medicalExaminerEmail: string;
  medicalExaminerCredentials: string;
  evaluationResult: "approved" | "not-approved" | "";
}

interface PDFFormData {
  participantName: string;
  birthdate: string;
  facilityName: string;
  instructorName: string;
  date: string;
  participantSignature: string;
  question1: boolean;
  question2: boolean;
  question3: boolean;
  question4: boolean;
  question5: boolean;
  question6: boolean;
  question7: boolean;
  question8: boolean;
  question9: boolean;
  question10: boolean;
  boxA1: boolean;
  boxA2: boolean;
  boxA3: boolean;
  boxA4: boolean;
  boxA5: boolean;
  boxB1: boolean;
  boxB2: boolean;
  boxB3: boolean;
  boxB4: boolean;
  boxC1: boolean;
  boxC2: boolean;
  boxC3: boolean;
  boxC4: boolean;
  boxD1: boolean;
  boxD2: boolean;
  boxD3: boolean;
  boxD4: boolean;
  boxD5: boolean;
  boxE1: boolean;
  boxE2: boolean;
  boxE3: boolean;
  boxE4: boolean;
  boxF1: boolean;
  boxF2: boolean;
  boxF3: boolean;
  boxF4: boolean;
  boxF5: boolean;
  boxG1: boolean;
  boxG2: boolean;
  boxG3: boolean;
  boxG4: boolean;
  boxG5: boolean;
  boxG6: boolean;
  medicalExaminerName: string;
  medicalExaminerSignature: string;
  medicalExaminerDate: string;
  medicalExaminerPhone: string;
  medicalExaminerClinic: string;
  medicalExaminerAddress: string;
  medicalExaminerEmail: string;
  medicalExaminerCredentials: string;
  evaluationResult: "approved" | "not-approved" | "";
}

interface DiverMedicalFormProps {
  cartId?: string;
  formTitle?: string;
  onSubmitSuccess?: () => void;
}

const DiverMedicalForm: React.FC<DiverMedicalFormProps> = ({
  cartId,
  formTitle,
  onSubmitSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current date in mm/dd/yyyy format
  const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const [formData, setFormData] = useState<FormData>({
    participantName: "",
    birthdate: "",
    facilityName: " ",
    instructorName: "",
    date: getCurrentDate(),
    participantSignature: "",
    question1: null, // Default to true to show Box A on Page 2
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    question6: null,
    question7: null,
    question8: null,
    question9: null,
    question10: null,
    boxA1: null,
    boxA2: null,
    boxA3: null,
    boxA4: null,
    boxA5: null,
    boxB1: null,
    boxB2: null,
    boxB3: null,
    boxB4: null,
    boxC1: null,
    boxC2: null,
    boxC3: null,
    boxC4: null,
    boxD1: null,
    boxD2: null,
    boxD3: null,
    boxD4: null,
    boxD5: null,
    boxE1: null,
    boxE2: null,
    boxE3: null,
    boxE4: null,
    boxF1: null,
    boxF2: null,
    boxF3: null,
    boxF4: null,
    boxF5: null,
    boxG1: null,
    boxG2: null,
    boxG3: null,
    boxG4: null,
    boxG5: null,
    boxG6: null,
    medicalExaminerName: "",
    medicalExaminerSignature: "",
    medicalExaminerDate: "",
    medicalExaminerPhone: "",
    medicalExaminerClinic: "",
    medicalExaminerAddress: "",
    medicalExaminerEmail: "",
    medicalExaminerCredentials: "",
    evaluationResult: "",
  });

  const updateFormData = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getRequiredBoxes = () => {
    const boxes: { question: number; box: string }[] = [];
    if (formData.question1) boxes.push({ question: 1, box: "A" });
    if (formData.question2) boxes.push({ question: 2, box: "B" });
    if (formData.question4) boxes.push({ question: 4, box: "C" });
    if (formData.question6) boxes.push({ question: 6, box: "D" });
    if (formData.question7) boxes.push({ question: 7, box: "E" });
    if (formData.question8) boxes.push({ question: 8, box: "F" });
    if (formData.question9) boxes.push({ question: 9, box: "G" });
    return boxes;
  };

  const getGuidanceMessage = () => {
    const requiredBoxes = getRequiredBoxes();

    if (requiredBoxes.length === 0) return null;

    const questions = requiredBoxes.map((b) => b.question).join(" & ");
    const boxes = requiredBoxes.map((b) => b.box).join(" & ");
    const boxText = requiredBoxes.length === 1 ? "Box" : "Boxes";
    const questionText = requiredBoxes.length === 1 ? "question" : "questions";

    return `Since you answered "Yes" to ${questionText} ${questions}, you'll need to complete all the questions in ${boxText} ${boxes} on page 2 before this document can be submitted.`;
  };

  const validateForm = (): { isValid: boolean; message: string } => {
    const missingFields: string[] = [];

    // Check that all 10 questions have been answered (either Yes or No)
    const unansweredQuestions: number[] = [];
    if (formData.question1 === null) unansweredQuestions.push(1);
    if (formData.question2 === null) unansweredQuestions.push(2);
    if (formData.question3 === null) unansweredQuestions.push(3);
    if (formData.question4 === null) unansweredQuestions.push(4);
    if (formData.question5 === null) unansweredQuestions.push(5);
    if (formData.question6 === null) unansweredQuestions.push(6);
    if (formData.question7 === null) unansweredQuestions.push(7);
    if (formData.question8 === null) unansweredQuestions.push(8);
    if (formData.question9 === null) unansweredQuestions.push(9);
    if (formData.question10 === null) unansweredQuestions.push(10);

    if (unansweredQuestions.length > 0) {
      return {
        isValid: false,
        message: `Please answer the following question(s) with either "Yes" or "No":\n\nQuestion ${unansweredQuestions.join(", ")}`,
      };
    }

    // Check required participant fields
    if (!formData.participantSignature?.trim()) {
      missingFields.push("Signature");
    }
    if (!formData.participantName?.trim()) {
      missingFields.push("Name");
    }
    if (!formData.birthdate) {
      missingFields.push("Birthdate (mm/dd/yyyy)");
    }

    if (missingFields.length > 0) {
      return {
        isValid: false,
        message:
          "Please complete the following required fields:\n\n" +
          missingFields.join(", "),
      };
    }

    if (currentPage === 1 && unansweredQuestions.length === 0) {
      return {
        isValid: false,
        message:
          "Because you answered “Yes” to at least one question (1–10) on this page, you must complete the corresponding section on page 2 of this document. Please select Page 2 at the bottom of this page to continue.",
      };
    }

    // Validate Box A - ALL questions must be answered if question1 is Yes
    if (formData.question1) {
      const unansweredA: string[] = [];
      if (formData.boxA1 === null) unansweredA.push("A1");
      if (formData.boxA2 === null) unansweredA.push("A2");
      if (formData.boxA3 === null) unansweredA.push("A3");
      if (formData.boxA4 === null) unansweredA.push("A4");
      if (formData.boxA5 === null) unansweredA.push("A5");

      if (unansweredA.length > 0) {
        return {
          isValid: false,
          message: `Box A is required. Please answer ALL questions in Box A (${unansweredA.join(", ")} )`,
        };
      }

      // Check if at least one Yes in Box A
      // const hasYesInA =
      //   formData.boxA1 ||
      //   formData.boxA2 ||
      //   formData.boxA3 ||
      //   formData.boxA4 ||
      //   formData.boxA5;
      // if (!hasYesInA) {
      //   return {
      //     isValid: false,
      //     message: "Box A: At least one question must be answered 'Yes'",
      //   };
      // }

      // Check if at least one Yes in Box A
      // const hasYesInA =
      //   formData.boxA1 ||
      //   formData.boxA2 ||
      //   formData.boxA3 ||
      //   formData.boxA4 ||
      //   formData.boxA5;
      // if (!hasYesInA) {
      //   return {
      //     isValid: false,
      //     message: "Box A: At least one question must be answered 'Yes'",
      //   };
      // }
    }

    // Validate Box B - ALL questions must be answered if question2 is Yes
    if (formData.question2) {
      const unansweredB: string[] = [];
      if (formData.boxB1 === null) unansweredB.push("B1");
      if (formData.boxB2 === null) unansweredB.push("B2");
      if (formData.boxB3 === null) unansweredB.push("B3");
      if (formData.boxB4 === null) unansweredB.push("B4");

      if (unansweredB.length > 0) {
        return {
          isValid: false,
          message: `Box B is required. Please answer ALL questions in Box B (${unansweredB.join(", ")})`,
        };
      }

      // Check if at least one Yes in Box B
      // const hasYesInB =
      //   formData.boxB1 || formData.boxB2 || formData.boxB3 || formData.boxB4;
      // if (!hasYesInB) {
      //   return {
      //     isValid: false,
      //     message: "Box B: At least one question must be answered 'Yes'",
      //   };
      // }

      // Check if at least one Yes in Box B
      // const hasYesInB =
      //   formData.boxB1 || formData.boxB2 || formData.boxB3 || formData.boxB4;
      // if (!hasYesInB) {
      //   return {
      //     isValid: false,
      //     message: "Box B: At least one question must be answered 'Yes'",
      //   };
      // }

      // Check if at least one Yes in Box B
      // const hasYesInB =
      //   formData.boxB1 || formData.boxB2 || formData.boxB3 || formData.boxB4;
      // if (!hasYesInB) {
      //   return {
      //     isValid: false,
      //     message: "Box B: At least one question must be answered 'Yes'",
      //   };
      // }

      // Check if at least one Yes in Box B
      // const hasYesInB =
      //   formData.boxB1 || formData.boxB2 || formData.boxB3 || formData.boxB4;
      // if (!hasYesInB) {
      //   return {
      //     isValid: false,
      //     message: "Box B: At least one question must be answered 'Yes'",
      //   };
      // }

      // Check if at least one Yes in Box B
      // const hasYesInB =
      //   formData.boxB1 || formData.boxB2 || formData.boxB3 || formData.boxB4;
      // if (!hasYesInB) {
      //   return {
      //     isValid: false,
      //     message: "Box B: At least one question must be answered 'Yes'",
      //   };
      // }
    }

    // Validate Box C - ALL questions must be answered if question4 is Yes
    if (formData.question4) {
      const unansweredC: string[] = [];
      if (formData.boxC1 === null) unansweredC.push("C1");
      if (formData.boxC2 === null) unansweredC.push("C2");
      if (formData.boxC3 === null) unansweredC.push("C3");
      if (formData.boxC4 === null) unansweredC.push("C4");

      if (unansweredC.length > 0) {
        return {
          isValid: false,
          message: `Box C is required. Please answer ALL questions in Box C (${unansweredC.join(", ")})`,
        };
      }

      // Check if at least one Yes in Box C
      // const hasYesInC =
      //   formData.boxC1 || formData.boxC2 || formData.boxC3 || formData.boxC4;
      // if (!hasYesInC) {
      //   return {
      //     isValid: false,
      //     message: "Box C: At least one question must be answered 'Yes'",
      //   };
      // }
    }

    // Validate Box D - ALL questions must be answered if question6 is Yes
    if (formData.question6) {
      const unansweredD: string[] = [];
      if (formData.boxD1 === null) unansweredD.push("D1");
      if (formData.boxD2 === null) unansweredD.push("D2");
      if (formData.boxD3 === null) unansweredD.push("D3");
      if (formData.boxD4 === null) unansweredD.push("D4");
      if (formData.boxD5 === null) unansweredD.push("D5");

      if (unansweredD.length > 0) {
        return {
          isValid: false,
          message: `Box D is required. Please answer ALL questions in Box D (${unansweredD.join(", ")})`,
        };
      }

      // Check if at least one Yes in Box D
      // const hasYesInD =
      //   formData.boxD1 ||
      //   formData.boxD2 ||
      //   formData.boxD3 ||
      //   formData.boxD4 ||
      //   formData.boxD5;
      // if (!hasYesInD) {
      //   return {
      //     isValid: false,
      //     message: "Box D: At least one question must be answered 'Yes'",
      //   };
      // }
    }

    // Validate Box E - ALL questions must be answered if question7 is Yes
    if (formData.question7) {
      const unansweredE: string[] = [];
      if (formData.boxE1 === null) unansweredE.push("E1");
      if (formData.boxE2 === null) unansweredE.push("E2");
      if (formData.boxE3 === null) unansweredE.push("E3");
      if (formData.boxE4 === null) unansweredE.push("E4");

      if (unansweredE.length > 0) {
        return {
          isValid: false,
          message: `Box E is required. Please answer ALL questions in Box E (${unansweredE.join(", ")})`,
        };
      }

      // Check if at least one Yes in Box E
      // const hasYesInE =
      //   formData.boxE1 || formData.boxE2 || formData.boxE3 || formData.boxE4;
      // if (!hasYesInE) {
      //   return {
      //     isValid: false,
      //     message: "Box E: At least one question must be answered 'Yes'",
      //   };
      // }
    }

    // Validate Box F - ALL questions must be answered if question8 is Yes
    if (formData.question8) {
      const unansweredF: string[] = [];
      if (formData.boxF1 === null) unansweredF.push("F1");
      if (formData.boxF2 === null) unansweredF.push("F2");
      if (formData.boxF3 === null) unansweredF.push("F3");
      if (formData.boxF4 === null) unansweredF.push("F4");
      if (formData.boxF5 === null) unansweredF.push("F5");

      if (unansweredF.length > 0) {
        return {
          isValid: false,
          message: `Box F is required. Please answer ALL questions in Box F (${unansweredF.join(", ")})`,
        };
      }

      // Check if at least one Yes in Box F
      // const hasYesInF =
      //   formData.boxF1 ||
      //   formData.boxF2 ||
      //   formData.boxF3 ||
      //   formData.boxF4 ||
      //   formData.boxF5;
      // if (!hasYesInF) {
      //   return {
      //     isValid: false,
      //     message: "Box F: At least one question must be answered 'Yes'",
      //   };
      // }
    }

    // Validate Box G - ALL questions must be answered if question9 is Yes
    if (formData.question9) {
      const unansweredG: string[] = [];
      if (formData.boxG1 === null) unansweredG.push("G1");
      if (formData.boxG2 === null) unansweredG.push("G2");
      if (formData.boxG3 === null) unansweredG.push("G3");
      if (formData.boxG4 === null) unansweredG.push("G4");
      if (formData.boxG5 === null) unansweredG.push("G5");
      if (formData.boxG6 === null) unansweredG.push("G6");

      if (unansweredG.length > 0) {
        return {
          isValid: false,
          message: `Box G is required. Please answer ALL questions in Box G (${unansweredG.join(", ")})`,
        };
      }

      // Check if at least one Yes in Box G
      // const hasYesInG =
      //   formData.boxG1 ||
      //   formData.boxG2 ||
      //   formData.boxG3 ||
      //   formData.boxG4 ||
      //   formData.boxG5 ||
      //   formData.boxG6;
      // if (!hasYesInG) {
      //   return {
      //     isValid: false,
      //     message: "Box G: At least one question must be answered 'Yes'",
      //   };
      // }
    }

    return { isValid: true, message: "" };
  };

  const convertToPDFFormat = (data: FormData): PDFFormData => {
    return {
      participantName: data.participantName,
      birthdate: data.birthdate,
      facilityName: data.facilityName,
      instructorName: data.instructorName,
      date: data.date,
      participantSignature: data.participantSignature,
      question1: data.question1 ?? false,
      question2: data.question2 ?? false,
      question3: data.question3 ?? false,
      question4: data.question4 ?? false,
      question5: data.question5 ?? false,
      question6: data.question6 ?? false,
      question7: data.question7 ?? false,
      question8: data.question8 ?? false,
      question9: data.question9 ?? false,
      question10: data.question10 ?? false,
      boxA1: data.boxA1 ?? false,
      boxA2: data.boxA2 ?? false,
      boxA3: data.boxA3 ?? false,
      boxA4: data.boxA4 ?? false,
      boxA5: data.boxA5 ?? false,
      boxB1: data.boxB1 ?? false,
      boxB2: data.boxB2 ?? false,
      boxB3: data.boxB3 ?? false,
      boxB4: data.boxB4 ?? false,
      boxC1: data.boxC1 ?? false,
      boxC2: data.boxC2 ?? false,
      boxC3: data.boxC3 ?? false,
      boxC4: data.boxC4 ?? false,
      boxD1: data.boxD1 ?? false,
      boxD2: data.boxD2 ?? false,
      boxD3: data.boxD3 ?? false,
      boxD4: data.boxD4 ?? false,
      boxD5: data.boxD5 ?? false,
      boxE1: data.boxE1 ?? false,
      boxE2: data.boxE2 ?? false,
      boxE3: data.boxE3 ?? false,
      boxE4: data.boxE4 ?? false,
      boxF1: data.boxF1 ?? false,
      boxF2: data.boxF2 ?? false,
      boxF3: data.boxF3 ?? false,
      boxF4: data.boxF4 ?? false,
      boxF5: data.boxF5 ?? false,
      boxG1: data.boxG1 ?? false,
      boxG2: data.boxG2 ?? false,
      boxG3: data.boxG3 ?? false,
      boxG4: data.boxG4 ?? false,
      boxG5: data.boxG5 ?? false,
      boxG6: data.boxG6 ?? false,
      medicalExaminerName: data.medicalExaminerName,
      medicalExaminerSignature: data.medicalExaminerSignature,
      medicalExaminerDate: data.medicalExaminerDate,
      medicalExaminerPhone: data.medicalExaminerPhone,
      medicalExaminerClinic: data.medicalExaminerClinic,
      medicalExaminerAddress: data.medicalExaminerAddress,
      medicalExaminerEmail: data.medicalExaminerEmail,
      medicalExaminerCredentials: data.medicalExaminerCredentials,
      evaluationResult: data.evaluationResult,
    };
  };

  // ... inside component ...

  // ... inside component ...

  const store = useFormStore(); // Initialize store
  const showToast = useToastStore((state) => state.showToast);

  const handleExportPDF = async () => {
    try {
      setIsSubmitting(true);

      const validation = validateForm();
      if (!validation.isValid) {
        toast.error(validation.message, {
          duration: 6000,
          style: {
            background: "#FEE2E2",
            border: "2px solid #EF4444",
            color: "#7F1D1D",
            fontSize: "14px",
            fontWeight: "600",
            padding: "16px",
            borderRadius: "8px",
          },
        });
        return;
      }

      // if (!bookingId) {
      //   toast.error("Booking ID not found in URL.");
      //   return;
      // }

      // Check for answers that require medical clearance
      const clearanceReasons: string[] = [];

      // Standalone Questions (3, 5, 10) - YES triggers clearance
      if (formData.question3 === true)
        clearanceReasons.push('"Yes" to Question 3');
      if (formData.question5 === true)
        clearanceReasons.push('"Yes" to Question 5');
      if (formData.question10 === true)
        clearanceReasons.push('"Yes" to Question 10');

      // Box Configurations
      const boxConfigs = [
        {
          main: formData.question1,
          name: "A",
          questions: [
            formData.boxA1,
            formData.boxA2,
            formData.boxA3,
            formData.boxA4,
            formData.boxA5,
          ],
        },
        {
          main: formData.question2,
          name: "B",
          questions: [
            formData.boxB1,
            formData.boxB2,
            formData.boxB3,
            formData.boxB4,
          ],
        },
        {
          main: formData.question4,
          name: "C",
          questions: [
            formData.boxC1,
            formData.boxC2,
            formData.boxC3,
            formData.boxC4,
          ],
        },
        {
          main: formData.question6,
          name: "D",
          questions: [
            formData.boxD1,
            formData.boxD2,
            formData.boxD3,
            formData.boxD4,
            formData.boxD5,
          ],
        },
        {
          main: formData.question7,
          name: "E",
          questions: [
            formData.boxE1,
            formData.boxE2,
            formData.boxE3,
            formData.boxE4,
          ],
        },
        {
          main: formData.question8,
          name: "F",
          questions: [
            formData.boxF1,
            formData.boxF2,
            formData.boxF3,
            formData.boxF4,
            formData.boxF5,
          ],
        },
        {
          main: formData.question9,
          name: "G",
          questions: [
            formData.boxG1,
            formData.boxG2,
            formData.boxG3,
            formData.boxG4,
            formData.boxG5,
            formData.boxG6,
          ],
        },
      ];

      boxConfigs.forEach((box) => {
        if (box.main === true) {
          // Collect only the "Yes" answers
          const yesAnswers = box.questions
            .map((q, i) => (q === true ? `${box.name}${i + 1}` : null))
            .filter((q): q is string => q !== null);

          if (yesAnswers.length > 0) {
            clearanceReasons.push(
              `"Yes" to Box ${box.name} (${yesAnswers.join(", ")})`,
            );
          } else {
            // If no specific Yes answers, just mention the box
            clearanceReasons.push(`"Yes" to Box ${box.name}`);
          }
        }
      });

      if (clearanceReasons.length > 0) {
        // const message = `Because you answered ${clearanceReasons.join(
        //   ", ",
        // )} you must print this form and get it signed by a physician before participating in the class.`;

        const message = `Because you answered <strong>“Yes”</strong> to at least one question on <strong>page 2</strong>, this form must be <strong>printed and signed by a physician</strong> before you can participate in the class. <br/> Please use the <strong>Contact Us</strong> page on our website to request a copy of your form.`;

        Swal.fire({
          icon: "warning",
          title: "Medical Clearance Required",
          html: message,
          confirmButtonText: "Okay",
          confirmButtonColor: "#F97316",
          background: "#FFF7ED",
        });

        // toast.warning(message, {
        //   duration: 10000,
        //   style: {
        //     background: "#FFF7ED",
        //     border: "2px solid #F97316",
        //     color: "#C2410C",
        //     fontSize: "14px",
        //     fontWeight: "600",
        //     padding: "16px",
        //     borderRadius: "8px",
        //   },
        // });
      }

      const pdfFormData = convertToPDFFormat(formData);
      const pdfFile = await generatePDF(pdfFormData);

      if (!(pdfFile instanceof File)) {
        throw new Error("Generated file is not a valid File object");
      }

      // Auto-download the PDF
      const url = URL.createObjectURL(pdfFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Diver_Medical_Form_${formData.participantName.replace(/\s+/g, "_")}_${formData.date.replace(/\//g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Save to store if cartId and formTitle are present
      if (cartId && formTitle) {
        store.setFormCompleted(cartId, formTitle, pdfFile);
        toast.success("Form saved successfully!");
      } else {
        // Fallback for standalone usage if needed, or just log warning
        console.warn("Missing cartId or formTitle, cannot save to store.");
      }

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("❌ [DiverMedicalForm] Error in handleExportPDF:", error);
      toast.error(
        error instanceof Error
          ? `Failed: ${error.message}`
          : "Failed to submit diver medical form",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handleNextPage = () => {
    // Check if leaving Page 2 and show toast for boxes with Yes answers
    if (currentPage === 2) {
      const boxes = ["A", "B", "C", "D", "E", "F", "G"];
      const boxDetails: { box: string; yesAnswers: string[] }[] = [];

      boxes.forEach((boxChar) => {
        const yesAnswers: string[] = [];
        Object.keys(formData).forEach((key) => {
          if (
            key.startsWith(`box${boxChar}`) &&
            formData[key as keyof FormData] === true
          ) {
            // Extract the number from the key (e.g., "boxA1" -> "1")
            const questionNum = key.replace(`box${boxChar}`, "");
            yesAnswers.push(`${boxChar}${questionNum}`);
          }
        });

        if (yesAnswers.length > 0) {
          boxDetails.push({ box: boxChar, yesAnswers });
        }
      });

      if (boxDetails.length > 0) {
        let message = "Because you answered 'Yes' to ";
        const boxParts: string[] = [];

        boxDetails.forEach((detail) => {
          const yesText = detail.yesAnswers.join(", ");
          boxParts.push(`Box ${detail.box} (${yesText})`);
        });

        if (boxParts.length === 1) {
          message += boxParts[0];
        } else if (boxParts.length === 2) {
          message += `${boxParts[0]} and ${boxParts[1]}`;
        } else {
          const lastPart = boxParts.pop();
          message += `${boxParts.join(", ")}, and ${lastPart}`;
        }

        message +=
          " on page 2, this form must be printed and signed by a physician before you can participate in the class.";
        showToast(message, "info");
      }
    }

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {currentPage === 1 && (
          <div
            className="bg-white p-8 font-sans text-sm"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <div className="flex justify-center items-center gap-4 mb-6 py-4">
              <Image
                src="/images/medical-form-header.png"
                alt="Logo"
                width={800}
                height={100}
                className="object-contain h-auto w-full"
              />
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-4">
                Diver Medical | Participant Questionnaire
              </h1>
            </div>

            <div className="mb-6">
              <p className="mb-4 text-justify leading-relaxed">
                Recreational scuba diving and freediving requires good physical
                and mental health. There are a few medical conditions which can
                be hazardous while diving, listed below. Those who have, or are
                predisposed to, any of these conditions, should be evaluated by
                a physician. This Diver Medical Participant Questionnaire
                provides a basis to determine if you should seek out that
                evaluation. If you have any concerns about your diving fitness
                not represented on this form, consult with your physician before
                diving. If you are feeling ill, avoid diving. If you think you
                may have a contagious disease, protect yourself and others by
                not participating in dive training and/ or dive activities.
                References to &#34;diving&#34; on this form encompass both
                recreational scuba diving and freediving. This form is
                principally designed as an initial medical screen for new
                divers, but is also appropriate for divers taking continuing
                education. For your safety, and that of others who may dive with
                you, answer all questions honestly.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-center mb-4 text-lg">Directions</h2>
              <p className="mb-3 font-bold">
                Complete this questionnaire as a prerequisite to a recreational
                scuba diving or freediving course.
              </p>
              <p className="mb-4">
                <strong>Note to women:</strong> If you are pregnant, or
                attempting to become pregnant, <em>do not dive</em>.
              </p>
            </div>

            <div className="border border-black mb-6">
              <table className="w-full border-collapse">
                <tbody>
                  {[
                    {
                      num: 1,
                      text: "I have had problems with my lungs, breathing, heart and/or blood affecting my normal physical or mental performance.",
                      goTo: "Go to box A",
                      field: "question1" as const,
                    },
                    {
                      num: 2,
                      text: "I am over 45 years of age.",
                      goTo: "Go to box B",
                      field: "question2" as const,
                    },
                    {
                      num: 3,
                      text: "I struggle to perform moderate exercise (for example, walk 1.6 kilometer/one mile in 14 minutes or swim 200 meters/yards without resting), OR I have been unable to participate in a normal physical activity due to fitness or health reasons within the past 12 months.",
                      asterisk: true,
                      field: "question3" as const,
                    },
                    {
                      num: 4,
                      text: "I have had problems with my eyes, ears, or nasal passages/sinuses.",
                      goTo: "Go to box C",
                      field: "question4" as const,
                    },
                    {
                      num: 5,
                      text: "I have had surgery within the last 12 months, OR I have ongoing problems related to past surgery.",
                      asterisk: true,
                      field: "question5" as const,
                    },
                    {
                      num: 6,
                      text: "I have lost consciousness, had migraine headaches, seizures, stroke, significant head injury, or suffer from persistent neurologic injury or disease.",
                      goTo: "Go to box D",
                      field: "question6" as const,
                    },
                    {
                      num: 7,
                      text: "I am currently undergoing treatment (or have required treatment within the last five years) for psychological problems, personality disorder, panic attacks, or an addiction to drugs or alcohol; or, I have been diagnosed with a learning or developmental disability.",
                      goTo: "Go to box E",
                      field: "question7" as const,
                    },
                    {
                      num: 8,
                      text: "I have had back problems, hernia, ulcers, or diabetes.",
                      goTo: "Go to box F",
                      field: "question8" as const,
                    },
                    {
                      num: 9,
                      text: "I have had stomach or intestine problems, including recent diarrhea.",
                      goTo: "Go to box G",
                      field: "question9" as const,
                    },
                    {
                      num: 10,
                      text: "I am taking prescription medications (with the exception of birth control or anti-malarial drugs other than mefloquine (Lariam).",
                      asterisk: true,
                      field: "question10" as const,
                    },
                  ].map((q) => (
                    <tr key={q.num} className="border-b border-black">
                      <td className="border-r border-black p-2 w-8 text-center font-bold align-top">
                        {q.num}
                      </td>
                      <td className="border-r border-black p-2 text-justify align-top">
                        {q.text}
                        {q.goTo && (
                          <div className="text-xs mt-1 text-center font-bold">
                            {q.goTo}
                          </div>
                        )}
                      </td>
                      <td className="border-r border-black p-2 w-16 text-center align-top">
                        <label className="flex items-center justify-center gap-1 cursor-pointer mb-1">
                          <input
                            type="checkbox"
                            checked={formData[q.field] === true}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFormData(q.field, true);
                              } else {
                                updateFormData(q.field, null);
                              }
                            }}
                            className="w-4 h-4 border border-black"
                          />
                          <span className="text-sm">
                            Yes{q.asterisk && " *"}
                          </span>
                        </label>
                      </td>
                      <td className="p-2 w-16 text-center align-top">
                        <label className="flex items-center justify-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData[q.field] === false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateFormData(q.field, false);
                              } else {
                                updateFormData(q.field, null);
                              }
                            }}
                            className="w-4 h-4 border border-black"
                          />
                          <span className="text-sm">No</span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border border-black p-4 mb-6">
              <h3 className="font-bold text-center text-lg mb-4">
                Participant Signature
              </h3>
              <p className="mb-3 text-justify">
                <strong>If you answered NO</strong> to all 10 questions above, a
                medical evaluation is not required. Please read and agree to the
                participant statement below by signing and dating it.
              </p>
              <p className="mb-4 text-justify">
                <strong>Participant Statement:</strong> I have answered all
                questions honestly, and understand that I accept responsibility
                for any consequences resulting from any questions I may have
                answered inaccurately or for my failure to disclose any existing
                or past health conditions.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-4">
                <div>
                  <div
                    className={`border-b-2 pb-1 mb-1 min-h-[30px] flex items-end ${!formData.participantSignature?.trim() ? "border-red-500 bg-red-50" : "border-black"}`}
                  >
                    <input
                      type="text"
                      value={formData.participantSignature}
                      onChange={(e) =>
                        updateFormData("participantSignature", e.target.value)
                      }
                      className="w-full border-none outline-none text-lg bg-transparent custom-slant" // Added custom-slant class here
                      placeholder="Type your full name"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Participant Signature (or, if a minor, participant&apos;s
                    parent/guardian signature required){" "}
                    <span className="text-red-500">*</span>
                  </div>
                </div>
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end bg-gray-100">
                    <input
                      type="text"
                      value={formData.date}
                      readOnly
                      className="w-full border-none outline-none bg-transparent cursor-not-allowed text-gray-700"
                    />
                  </div>
                  <div className="text-xs text-center">Date (mm/dd/yyyy)</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-4">
                <div>
                  <div
                    className={`border-b-2 pb-1 mb-1 min-h-[30px] flex items-end ${!formData.participantName?.trim() ? "border-red-500 bg-red-50" : "border-black"}`}
                  >
                    <input
                      type="text"
                      value={formData.participantName}
                      onChange={(e) =>
                        updateFormData("participantName", e.target.value)
                      }
                      className="w-full border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Participant Name (Print){" "}
                    <span className="text-red-500">*</span>
                  </div>
                </div>
                <div>
                  <div
                    className={`border-b-2 pb-1 mb-1 min-h-[30px] flex items-end ${!formData.birthdate ? "border-red-500 bg-red-50" : "border-black"}`}
                  >
                    <input
                      type="date"
                      value={formData.birthdate}
                      onChange={(e) =>
                        updateFormData("birthdate", e.target.value)
                      }
                      className="w-full border-none outline-none bg-transparent"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Birthdate (mm/dd/yyyy){" "}
                    <span className="text-red-500">*</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-4">
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                    <input
                      type="text"
                      value={formData.instructorName}
                      readOnly
                      className="w-full border-none outline-none bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div className="text-xs text-center">
                    Instructor Name (Print)
                  </div>
                </div>
                <div>
                  <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end">
                    {/* <input
                      type="text"
                      value={formData.facilityName}
                      readOnly
                      className="w-full border-none outline-none bg-gray-100 cursor-not-allowed"
                    /> */}
                    <div className=" text-center text-gray-700 font-bold text-base">
                      Scuba Life
                    </div>
                  </div>
                  <div className="text-xs text-center">
                    Facility Name (Print)
                  </div>
                </div>
              </div>

              {getGuidanceMessage() ? (
                <div className="mt-4 p-4 bg-red-50 border-2 border-red-400 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 flex items-start gap-2">
                    <span className="text-lg">ℹ️</span>
                    <span>{getGuidanceMessage()}</span>
                  </p>
                </div>
              ) : null}

              <p className="text-sm mt-4 text-justify">
                * <strong>If you answered YES</strong> to questions 3, 5 or 10
                above <strong>OR</strong> to any of the questions on page 2,
                please read and agree to the statement above by signing and
                dating it{" "}
                <strong>
                  AND take all three pages of this form (Participant
                  Questionnaire and the Physician&apos;s Evaluation Form) to
                  your physician
                </strong>{" "}
                for a medical evaluation. Participation in a diving course
                requires your physician&apos;s approval.
              </p>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span>Version date: 2022-02-01</span>
              <span>1 of 3</span>
              <span>© 2020</span>
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div
            className="bg-white p-8 font-sans text-sm"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[25px] w-64 flex items-end">
                  <input
                    type="text"
                    value={formData.participantName}
                    readOnly
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs">Participant Name (Print)</div>
              </div>
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[25px] w-48 flex items-end">
                  <input
                    type="date"
                    value={formData.birthdate}
                    readOnly
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs">Birthdate Date (mm/dd/yyyy)</div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">
                Diver Medical | Participant Questionnaire Continued
              </h1>
            </div>

            {(() => {
              const requiredBoxes = getRequiredBoxes();
              const allBoxes = [
                {
                  title: "BOX A – I HAVE/HAVE HAD:",
                  boxLetter: "A",
                  questions: [
                    {
                      text: "Chest surgery, heart surgery, heart valve surgery, an implantable medical device (eg, stent, pacemaker, neurostimulator), pneumothorax, and/or chronic lung disease.",
                      field: "boxA1" as const,
                    },
                    {
                      text: "Asthma, wheezing, severe allergies, hay fever or congested airways within the last 12 months that limits my physical activity/exercise.",
                      field: "boxA2" as const,
                    },
                    {
                      text: "A problem or illness involving my heart such as: angina, chest pain on exertion, heart failure, immersion pulmonary edema, heart attack or stroke, OR am taking medication for any heart condition.",
                      field: "boxA3" as const,
                    },
                    {
                      text: "Recurrent bronchitis and currently coughing within the past 12 months, OR have been diagnosed with emphysema.",
                      field: "boxA4" as const,
                    },
                    {
                      text: "Symptoms affecting my lungs, breathing, heart and/or blood in the last 30 days that impair my physical or mental performance.",
                      field: "boxA5" as const,
                    },
                  ],
                },
                {
                  title: "BOX B – I AM OVER 45 YEARS OF AGE AND:",
                  boxLetter: "B",
                  questions: [
                    {
                      text: "I currently smoke or inhale nicotine by other means.",
                      field: "boxB1" as const,
                    },
                    {
                      text: "I have a high cholesterol level.",
                      field: "boxB2" as const,
                    },
                    {
                      text: "I have high blood pressure.",
                      field: "boxB3" as const,
                    },
                    {
                      text: "I have had a close blood relative die suddenly or of cardiac disease or stroke before the age of 50, OR have a family history of heart disease before age 50 (including abnormal heart rhythms, coronary artery disease or cardiomyopathy).",
                      field: "boxB4" as const,
                    },
                  ],
                },
                {
                  title: "BOX C – I HAVE/HAVE HAD:",
                  boxLetter: "C",
                  questions: [
                    {
                      text: "Sinus surgery within the last 6 months.",
                      field: "boxC1" as const,
                    },
                    {
                      text: "Ear disease or ear surgery, hearing loss, or problems with balance.",
                      field: "boxC2" as const,
                    },
                    {
                      text: "Recurrent sinusitis within the past 12 months.",
                      field: "boxC3" as const,
                    },
                    {
                      text: "Eye surgery within the past 3 months.",
                      field: "boxC4" as const,
                    },
                  ],
                },
                {
                  title: "BOX D – I HAVE/HAVE HAD:",
                  boxLetter: "D",
                  questions: [
                    {
                      text: "Head injury with loss of consciousness within the past 5 years.",
                      field: "boxD1" as const,
                    },
                    {
                      text: "Persistent neurologic injury or disease.",
                      field: "boxD2" as const,
                    },
                    {
                      text: "Recurring migraine headaches within the past 12 months, or take medications to prevent them.",
                      field: "boxD3" as const,
                    },
                    {
                      text: "Blackouts or fainting (full/partial loss of consciousness) within the last 5 years.",
                      field: "boxD4" as const,
                    },
                    {
                      text: "Epilepsy, seizures, or convulsions, OR take medications to prevent them.",
                      field: "boxD5" as const,
                    },
                  ],
                },
                {
                  title: "BOX E – I HAVE/HAVE HAD:",
                  boxLetter: "E",
                  questions: [
                    {
                      text: "Behavioral health, mental or psychological problems requiring medical/psychiatric treatment.",
                      field: "boxE1" as const,
                    },
                    {
                      text: "Major depression, suicidal ideation, panic attacks, uncontrolled bipolar disorder requiring medication/psychiatric treatment.",
                      field: "boxE2" as const,
                    },
                    {
                      text: "Been diagnosed with a mental health condition or a learning/developmental disorder that requires ongoing care or special accommodation.",
                      field: "boxE3" as const,
                    },
                    {
                      text: "An addiction to drugs or alcohol requiring treatment within the last 5 years.",
                      field: "boxE4" as const,
                    },
                  ],
                },
                {
                  title: "BOX F – I HAVE/HAVE HAD:",
                  boxLetter: "F",
                  questions: [
                    {
                      text: "Recurrent back problems in the last 6 months that limit my everyday activity.",
                      field: "boxF1" as const,
                    },
                    {
                      text: "Back or spinal surgery within the last 12 months.",
                      field: "boxF2" as const,
                    },
                    {
                      text: "Diabetes, either drug or diet controlled, OR gestational diabetes within the last 12 months.",
                      field: "boxF3" as const,
                    },
                    {
                      text: "An uncorrected hernia that limits my physical abilities.",
                      field: "boxF4" as const,
                    },
                    {
                      text: "Active or untreated ulcers, problem wounds, or ulcer surgery within the last 6 months.",
                      field: "boxF5" as const,
                    },
                  ],
                },
                {
                  title: "BOX G – I HAVE HAD:",
                  boxLetter: "G",
                  questions: [
                    {
                      text: "Ostomy surgery and do not have medical clearance to swim or engage in physical activity.",
                      field: "boxG1" as const,
                    },
                    {
                      text: "Dehydration requiring medical intervention within the last 7 days.",
                      field: "boxG2" as const,
                    },
                    {
                      text: "Active or untreated stomach or intestinal ulcers or ulcer surgery within the last 6 months.",
                      field: "boxG3" as const,
                    },
                    {
                      text: "Frequent heartburn, regurgitation, or gastroesophageal reflux disease (GERD).",
                      field: "boxG4" as const,
                    },
                    {
                      text: "Active or uncontrolled ulcerative colitis or Crohn's disease.",
                      field: "boxG5" as const,
                    },
                    {
                      text: "Bariatric surgery within the last 12 months.",
                      field: "boxG6" as const,
                    },
                  ],
                },
              ];

              // Sort boxes: required boxes first (in order they appear), then remaining boxes
              const sortedBoxes = [...allBoxes].sort((a, b) => {
                const aIsRequired = requiredBoxes.some(
                  (rb) => rb.box === a.boxLetter,
                );
                const bIsRequired = requiredBoxes.some(
                  (rb) => rb.box === b.boxLetter,
                );

                if (aIsRequired && !bIsRequired) return -1;
                if (!aIsRequired && bIsRequired) return 1;

                if (aIsRequired && bIsRequired) {
                  const aIndex = requiredBoxes.findIndex(
                    (rb) => rb.box === a.boxLetter,
                  );
                  const bIndex = requiredBoxes.findIndex(
                    (rb) => rb.box === b.boxLetter,
                  );
                  return aIndex - bIndex;
                }

                return 0;
              });

              return sortedBoxes.map((box, boxIndex) => {
                const isRequired = requiredBoxes.some(
                  (rb) => rb.box === box.boxLetter,
                );

                return (
                  <div
                    key={boxIndex}
                    className={`border-2 mb-4 transition-all ${
                      isRequired
                        ? "border-red-500 bg-pink-50 shadow-lg"
                        : "border-black"
                    }`}
                  >
                    <div
                      className={`p-2 border-b-2 ${
                        isRequired
                          ? "bg-pink-200 border-pink-500"
                          : "bg-gray-100 border-black"
                      }`}
                    >
                      <h3 className="font-bold flex items-center justify-between">
                        {box.title}
                        {isRequired && (
                          <span className="text-pink-700 text-sm font-bold">
                            ⚠️ REQUIRED - Answer ALL questions
                          </span>
                        )}
                      </h3>
                    </div>
                    <table className="w-full border-collapse">
                      <tbody>
                        {box.questions.map((q, qIndex) => (
                          <tr
                            key={qIndex}
                            className={
                              qIndex < box.questions.length - 1
                                ? "border-b border-black"
                                : ""
                            }
                          >
                            <td className="border-r border-black p-2 text-justify align-top">
                              {q.text}
                            </td>
                            <td className="border-r border-black p-2 w-16 text-center align-top">
                              <label className="flex items-center justify-center gap-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData[q.field] === true}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      updateFormData(q.field, true);
                                    } else {
                                      updateFormData(q.field, null);
                                    }
                                  }}
                                  className="w-4 h-4 border border-black"
                                />
                                <span className="text-sm">Yes *</span>
                              </label>
                            </td>
                            <td className="p-2 w-16 text-center align-top">
                              <label className="flex items-center justify-center gap-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData[q.field] === false}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      updateFormData(q.field, false);
                                    } else {
                                      updateFormData(q.field, null);
                                    }
                                  }}
                                  className="w-4 h-4 border border-black"
                                />
                                <span className="text-sm">No</span>
                              </label>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              });
            })()}

            <div className="flex justify-between items-center text-xs mt-6">
              <span>
                *Physician&apos;s medical evaluation required (see page 1).
              </span>
              <span>2 of 3</span>
              <span>© 2020</span>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div
            className="bg-white p-8 font-sans text-sm"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[25px] w-64 flex items-end">
                  <input
                    type="text"
                    value={formData.participantName}
                    readOnly
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs">Participant Name (Print)</div>
              </div>
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[25px] w-48 flex items-end">
                  <input
                    type="date"
                    value={formData.birthdate}
                    readOnly
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
                <div className="text-xs">Birthdate Date (mm/dd/yyyy)</div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">
                Diver Medical | Medical Examiner&apos;s Evaluation Form
              </h1>
            </div>

            <div className="mb-6">
              <p className="text-justify mb-4">
                The above-named person requests your opinion of his/her medical
                suitability to participate in recreational scuba diving or
                freediving training or activity. Please visit{" "}
                <strong>uhms.org</strong> for medical guidance on medical
                conditions as they relate to diving. Review the areas relevant
                to your patient as part of your evaluation.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-lg mb-4">Evaluation Result</h2>
              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-not-allowed opacity-60">
                  <input
                    type="checkbox"
                    checked={formData.evaluationResult === "approved"}
                    disabled
                    className="w-4 h-4 border border-black mt-1"
                  />
                  <div>
                    <strong>Approved</strong> – I find no conditions that I
                    consider incompatible with recreational scuba diving or
                    freediving.
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-not-allowed opacity-60">
                  <input
                    type="checkbox"
                    checked={formData.evaluationResult === "not-approved"}
                    disabled
                    className="w-4 h-4 border border-black mt-1"
                  />
                  <div>
                    <strong>Not approved</strong> – I find conditions that I
                    consider incompatible with recreational scuba diving or
                    freediving.
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end bg-gray-100">
                  <input
                    type="text"
                    value={formData.medicalExaminerSignature}
                    readOnly
                    className="w-full border-none outline-none bg-transparent cursor-not-allowed"
                  />
                </div>
                <div className="text-xs text-center">
                  Signature of certified medical doctor or other legally
                  certified medical provider (Print)
                </div>
              </div>
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end bg-gray-100">
                  <input
                    type="text"
                    value={formData.medicalExaminerDate}
                    readOnly
                    className="w-full border-none outline-none bg-transparent cursor-not-allowed"
                  />
                </div>
                <div className="text-xs text-center">Date (mm/dd/yyyy)</div>
              </div>
            </div>

            {[
              {
                label: "Medical Examiner's Name (Print)",
                field: "medicalExaminerName" as const,
              },
              {
                label: "Clinical Degrees/Credentials",
                field: "medicalExaminerCredentials" as const,
              },
              {
                label: "Clinic/Hospital",
                field: "medicalExaminerClinic" as const,
              },
              {
                label: "Address",
                field: "medicalExaminerAddress" as const,
              },
            ].map((item, index) => (
              <div key={index} className="mb-6">
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end bg-gray-100">
                  <input
                    type="text"
                    value={formData[item.field]}
                    readOnly
                    className="w-full border-none outline-none bg-transparent cursor-not-allowed"
                  />
                </div>
                <div className="text-xs text-center">{item.label}</div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end bg-gray-100">
                  <input
                    type="text"
                    value={formData.medicalExaminerPhone}
                    readOnly
                    className="w-full border-none outline-none bg-transparent cursor-not-allowed"
                  />
                </div>
                <div className="text-xs text-center">Phone</div>
              </div>
              <div>
                <div className="border-b-2 border-black pb-1 mb-1 min-h-[30px] flex items-end bg-gray-100">
                  <input
                    type="text"
                    value={formData.medicalExaminerEmail}
                    readOnly
                    className="w-full border-none outline-none bg-transparent cursor-not-allowed"
                  />
                </div>
                <div className="text-xs text-center">Email</div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="border-2 border-black w-48 h-32 flex items-center justify-center">
                <span className="text-xs text-gray-500">
                  Physician/Clinic Stamp (optional)
                </span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 text-xs">
              <p className="mb-2">
                Created by the{" "}
                <span className="text-blue-600 underline">
                  Diver Medical Screen Committee
                </span>{" "}
                in association with the following bodies:
              </p>
              <div className="mb-2">
                <div>
                  <strong>The Undersea & Hyperbaric Medical Society</strong>
                </div>
                <div>
                  <strong>DAN (US)</strong>
                </div>
                <div>
                  <strong>DAN Europe</strong>
                </div>
                <div>
                  <strong>
                    Hyperbaric Medicine Division, University of California, San
                    Diego
                  </strong>
                </div>
              </div>
              <div className="flex justify-between">
                <span>3 of 3</span>
                <span>10346 EN</span>
                <span>© DMSC 2020</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              variant="outline"
              className="px-4 py-2 bg-transparent"
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  onClick={() => goToPage(page)}
                  variant={currentPage === page ? "default" : "outline"}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              variant="outline"
              className="px-4 py-2 bg-transparent"
            >
              Next
            </Button>
          </div>

          <Button
            onClick={handleExportPDF}
            disabled={isSubmitting}
            className="bg-primary text-white px-6 py-2"
          >
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiverMedicalForm;
