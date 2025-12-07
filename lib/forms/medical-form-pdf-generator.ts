import jsPDF from "jspdf";

interface FormData {
  // Page 1 - Basic Info
  participantName: string;
  birthdate: string;
  facilityName: string;
  instructorName: string;
  date: string;
  participantSignature: string;

  // Page 1 - Main Questions (1-10)
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

  // Page 2 - Box A
  boxA1: boolean;
  boxA2: boolean;
  boxA3: boolean;
  boxA4: boolean;
  boxA5: boolean;

  // Page 2 - Box B
  boxB1: boolean;
  boxB2: boolean;
  boxB3: boolean;
  boxB4: boolean;

  // Page 2 - Box C
  boxC1: boolean;
  boxC2: boolean;
  boxC3: boolean;
  boxC4: boolean;

  // Page 2 - Box D
  boxD1: boolean;
  boxD2: boolean;
  boxD3: boolean;
  boxD4: boolean;
  boxD5: boolean;

  // Page 2 - Box E
  boxE1: boolean;
  boxE2: boolean;
  boxE3: boolean;
  boxE4: boolean;

  // Page 2 - Box F
  boxF1: boolean;
  boxF2: boolean;
  boxF3: boolean;
  boxF4: boolean;
  boxF5: boolean;

  // Page 2 - Box G
  boxG1: boolean;
  boxG2: boolean;
  boxG3: boolean;
  boxG4: boolean;
  boxG5: boolean;
  boxG6: boolean;

  // Page 3 - Medical Examiner
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

// export async function generatePDF(formData: FormData) {
export async function generatePDF(formData: FormData): Promise<File> {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  const drawCheckbox = (x: number, y: number, checked: boolean, size = 3) => {
    pdf.setLineWidth(0.3);
    pdf.rect(x, y, size, size);
    if (checked) {
      pdf.setLineWidth(0.5);
      // Draw checkmark
      pdf.line(x + 0.5, y + size / 2, x + size / 2 - 0.3, y + size - 0.5);
      pdf.line(x + size / 2 - 0.3, y + size - 0.5, x + size - 0.5, y + 0.5);
    }
  };

  const drawTableRow = (
    x: number,
    y: number,
    width: number,
    height: number,
    columns: Array<{
      text: string;
      width: number;
      align?: string;
      checkbox?: { checked: boolean; label: string };
    }>,
  ) => {
    let currentX = x;
    pdf.setLineWidth(0.3);

    columns.forEach((col) => {
      // Draw cell border
      pdf.rect(currentX, y, col.width, height);

      if (col.checkbox) {
        // Draw checkbox and label
        const checkboxSize = 3;
        const checkboxX = currentX + 2;
        const checkboxY = y + height / 2 - checkboxSize / 2;
        drawCheckbox(checkboxX, checkboxY, col.checkbox.checked, checkboxSize);

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.text(
          col.checkbox.label,
          checkboxX + checkboxSize + 2,
          checkboxY + 2.2,
        );
      } else {
        // Draw text content
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");

        if (col.text.trim()) {
          const maxWidth = col.width - 4;
          const lines = pdf.splitTextToSize(col.text, maxWidth);
          const lineHeight = 3.5;
          const totalTextHeight = lines.length * lineHeight;
          const startY = y + (height - totalTextHeight) / 2 + lineHeight;

          if (col.align === "center") {
            const textX = currentX + col.width / 2;
            lines.forEach((line: string, lineIndex: number) => {
              pdf.text(line, textX, startY + lineIndex * lineHeight, {
                align: "center",
              });
            });
          } else {
            const textX = currentX + 2;
            lines.forEach((line: string, lineIndex: number) => {
              pdf.text(line, textX, startY + lineIndex * lineHeight);
            });
          }
        }
      }

      currentX += col.width;
    });

    return y + height;
  };

  const calculateRowHeight = (
    text: string,
    maxWidth: number,
    minHeight = 14,
  ) => {
    if (!text.trim()) return minHeight;

    pdf.setFontSize(9);
    const lines = pdf.splitTextToSize(text, maxWidth - 4);
    const calculatedHeight = Math.max(minHeight, lines.length * 3.5 + 8);
    return calculatedHeight;
  };

  const checkPageBreak = (heightNeeded: number) => {
    if (yPos + heightNeeded > pageHeight - margin) {
      pdf.addPage();
      yPos = margin; // Reset to top margin
      return true;
    }
    return false;
  };

  // PAGE 1
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("Diver Medical | Participant Questionnaire", pageWidth / 2, 30, {
    align: "center",
  });

  let yPos = 45;

  // Directions section
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("Directions", margin, yPos);

  yPos += 8;
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");

  const directionsText =
    'Recreational scuba diving and freediving requires good physical and mental health. There are a few medical conditions which can be hazardous while diving, listed below. Those who have, or are predisposed to, any of these conditions, should be evaluated by a physician. This Diver Medical Participant Questionnaire provides a basis to determine if you should seek out that evaluation. If you have any concerns about your diving fitness not represented on this form, consult with your physician before diving. If you are feeling ill, avoid diving. If you think you may have a contagious disease, protect yourself and others by not participating in dive training and/or dive activities. References to "diving" on this form encompass both recreational scuba diving and freediving. This form is principally designed as an initial medical screen for new divers, but is also appropriate for divers taking continuing education. For your safety, and that of others who may dive with you, answer all questions honestly.';

  const directionLines = pdf.splitTextToSize(directionsText, contentWidth);
  directionLines.forEach((line: string) => {
    checkPageBreak(4);
    pdf.text(line, margin, yPos);
    yPos += 4;
  });

  yPos += 8;
  checkPageBreak(8);
  pdf.setFont("helvetica", "bold");
  pdf.text(
    "Complete this questionnaire as a prerequisite to a recreational scuba diving or freediving course.",
    margin,
    yPos,
  );

  yPos += 6;
  checkPageBreak(6);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    "Note to women: If you are pregnant, or attempting to become pregnant, do not dive.",
    margin,
    yPos,
  );

  yPos += 12;

  // Main questions table
  const questions = [
    {
      num: "1",
      text: "I have had problems with my lungs, breathing, heart and/or blood affecting my normal physical or mental performance.",
      goTo: "Go to\nbox A",
      checked: formData.question1,
    },
    {
      num: "2",
      text: "I am over 45 years of age.",
      goTo: "Go to\nbox B",
      checked: formData.question2,
    },
    {
      num: "3",
      text: "I struggle to perform moderate exercise (for example, walk 1.6 kilometer/one mile in 14 minutes or swim 200 meters/yards without resting), OR I have been unable to participate in a normal physical activity due to fitness or health reasons within the past 12 months.",
      goTo: "",
      checked: formData.question3,
      asterisk: true,
    },
    {
      num: "4",
      text: "I have had problems with my eyes, ears, or nasal passages/sinuses.",
      goTo: "Go to\nbox C",
      checked: formData.question4,
    },
    {
      num: "5",
      text: "I have had surgery within the last 12 months, OR I have ongoing problems related to past surgery.",
      goTo: "",
      checked: formData.question5,
      asterisk: true,
    },
    {
      num: "6",
      text: "I have lost consciousness, had migraine headaches, seizures, stroke, significant head injury, or suffer from persistent neurologic injury or disease.",
      goTo: "Go to\nbox D",
      checked: formData.question6,
    },
    {
      num: "7",
      text: "I am currently undergoing treatment (or have required treatment within the last five years) for psychological problems, personality disorder, panic attacks, or an addiction to drugs or alcohol; or, I have been diagnosed with a learning or developmental disability.",
      goTo: "Go to\nbox E",
      checked: formData.question7,
    },
    {
      num: "8",
      text: "I have had back problems, hernia, ulcers, or diabetes.",
      goTo: "Go to\nbox F",
      checked: formData.question8,
    },
    {
      num: "9",
      text: "I have had stomach or intestine problems, including recent diarrhea.",
      goTo: "Go to\nbox G",
      checked: formData.question9,
    },
    {
      num: "10",
      text: "I am taking prescription medications (with the exception of birth control or anti-malarial drugs other than mefloquine (Lariam).",
      goTo: "",
      checked: formData.question10,
      asterisk: true,
    },
  ];

  questions.forEach((q) => {
    const textWidth = contentWidth - 75;
    const rowHeight = calculateRowHeight(q.text, textWidth, 14);

    checkPageBreak(rowHeight);
    yPos = drawTableRow(margin, yPos, contentWidth, rowHeight, [
      { text: q.num, width: 12, align: "center" },
      { text: q.text, width: textWidth },
      { text: q.goTo, width: 25, align: "center" },
      {
        text: "",
        width: 19,
        checkbox: { checked: q.checked, label: `Yes${q.asterisk ? " *" : ""}` },
      },
      {
        text: "",
        width: 19,
        checkbox: { checked: !q.checked, label: "No" },
      },
    ]);
  });

  // Participant Signature Section
  yPos += 8;
  checkPageBreak(8);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("Participant Signature", margin, yPos);

  yPos += 8;
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");

  const statementText1 =
    "If you answered NO to all 10 questions above, a medical evaluation is not required. Please read and agree to the participant statement below by signing and dating it.";

  const statement1Lines = pdf.splitTextToSize(statementText1, contentWidth);
  statement1Lines.forEach((line: string) => {
    checkPageBreak(3.5);
    pdf.text(line, margin, yPos);
    yPos += 3.5;
  });

  yPos += 4;
  checkPageBreak(4);
  pdf.setFont("helvetica", "bold");
  const participantStatement = "Participant Statement: ";
  pdf.text(participantStatement, margin, yPos);

  pdf.setFont("helvetica", "normal");
  const statementText2 =
    "I have answered all questions honestly, and understand that I accept responsibility for any consequences resulting from any questions I may have answered inaccurately or for my failure to disclose any existing or past health conditions.";
  const statement2Lines = pdf.splitTextToSize(
    statementText2,
    contentWidth - pdf.getTextWidth(participantStatement),
  );

  const currentX = margin + pdf.getTextWidth(participantStatement);
  statement2Lines.forEach((line: string, index: number) => {
    checkPageBreak(3.5);
    if (index === 0) {
      pdf.text(line, currentX, yPos);
    } else {
      pdf.text(line, margin, yPos + index * 3.5);
    }
  });

  yPos += statement2Lines.length * 3.5 + 6;

  // Signature fields
  const signatureY = yPos;
  checkPageBreak(20); // Ensure space for signature block
  pdf.setLineWidth(0.5);
  pdf.line(margin, signatureY, margin + 100, signatureY);
  if (formData.participantSignature) {
    pdf.text(formData.participantSignature, margin, signatureY - 2);
  }
  pdf.setFontSize(8);
  pdf.text(
    "Participant Signature (or, if a minor, participant's parent/guardian signature required.",
    margin,
    signatureY + 4,
  );

  pdf.setLineWidth(0.5);
  pdf.line(margin + 110, signatureY, margin + contentWidth, signatureY);
  if (formData.date) {
    pdf.text(formData.date, margin + 110, signatureY - 2);
  }
  pdf.text("Date (dd/mm/yyyy)", margin + 110, signatureY + 4);

  const nameY = signatureY + 12;
  pdf.setLineWidth(0.5);
  pdf.line(margin, nameY, margin + 100, nameY);
  if (formData.participantName) {
    pdf.text(formData.participantName, margin, nameY - 2);
  }
  pdf.text("Participant Name (Print)", margin, nameY + 4);

  pdf.setLineWidth(0.5);
  pdf.line(margin + 110, nameY, margin + contentWidth, nameY);
  if (formData.birthdate) {
    pdf.text(formData.birthdate, margin + 110, nameY - 2);
  }
  pdf.text("Birthdate (dd/mm/yyyy)", margin + 110, nameY + 4);

  const instructorY = nameY + 12;
  pdf.setLineWidth(0.5);
  pdf.line(margin, instructorY, margin + 100, instructorY);
  if (formData.instructorName) {
    pdf.text(formData.instructorName, margin, instructorY - 2);
  }
  pdf.text("Instructor Name (Print)", margin, instructorY + 4);

  pdf.setLineWidth(0.5);
  pdf.line(margin + 110, instructorY, margin + contentWidth, instructorY);
  if (formData.facilityName) {
    pdf.text(formData.facilityName, margin + 110, instructorY - 2);
  }
  pdf.text("Facility Name (Print)", margin + 110, instructorY + 4);

  yPos = instructorY + 12;

  // Asterisk note
  pdf.setFontSize(9);
  const asteriskNote =
    "* If you answered YES to questions 3, 5 or 10 above OR to any of the questions on page 2, please read and agree to the statement above by signing and dating it AND take all three pages of this form (Participant Questionnaire and the Physician's Evaluation Form) to your physician for a medical evaluation. Participation in a diving course requires your physician's approval.";
  const asteriskLines = pdf.splitTextToSize(asteriskNote, contentWidth);
  asteriskLines.forEach((line: string) => {
    checkPageBreak(3.5);
    pdf.text(line, margin, yPos);
    yPos += 3.5;
  });

  // Footer
  pdf.setFontSize(8);
  pdf.text("Version date: 2022-02-01", margin, pageHeight - 15);
  pdf.text("1 of 3", pageWidth / 2, pageHeight - 15, { align: "center" });
  pdf.text("© 2020", pageWidth - margin, pageHeight - 15, { align: "right" });

  // PAGE 2 - Only add if any box has answers (meaning Page 1 triggered them)
  const hasPage2Content =
    formData.question1 ||
    formData.question2 ||
    formData.question4 ||
    formData.question6 ||
    formData.question7 ||
    formData.question8 ||
    formData.question9;

  if (hasPage2Content) {
    pdf.setPage(pdf.getNumberOfPages());
    pdf.addPage();
    yPos = 30;

    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text(
      "Diver Medical | Participant Questionnaire Continued",
      pageWidth / 2,
      yPos,
      { align: "center" },
    );

    yPos += 15;

    // Header info
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, margin + 100, yPos);
    if (formData.participantName) {
      pdf.setFontSize(9);
      pdf.text(formData.participantName, margin, yPos - 2);
    }
    pdf.setFontSize(8);
    pdf.text("Participant Name (Print)", margin, yPos + 4);

    pdf.setLineWidth(0.5);
    pdf.line(margin + 110, yPos, margin + contentWidth, yPos);
    if (formData.birthdate) {
      pdf.setFontSize(9);
      pdf.text(formData.birthdate, margin + 110, yPos - 2);
    }
    pdf.setFontSize(8);
    pdf.text("Birthdate Date (dd/mm/yyyy)", margin + 110, yPos + 4);

    yPos += 20;

    const drawDetailedBox = (
      title: string,
      questions: Array<{ text: string; checked: boolean }>,
      startY: number,
    ) => {
      let boxY = startY;

      // Check if box header fits
      if (checkPageBreak(8 + 5.5)) {
        boxY = margin;
      }

      // Draw box header with background
      pdf.setLineWidth(0.3);
      pdf.setFillColor(230, 230, 230);
      pdf.rect(margin, boxY, contentWidth, 8, "F");
      pdf.rect(margin, boxY, contentWidth, 8);

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text(title, margin + 2, boxY + 5.5);

      boxY += 8;
      pdf.setFont("helvetica", "normal");

      // Draw each question row
      questions.forEach((q) => {
        const textWidth = contentWidth - 45;
        const questionHeight = calculateRowHeight(q.text, textWidth, 12);

        if (checkPageBreak(questionHeight)) {
          boxY = margin;
        }

        drawTableRow(margin, boxY, contentWidth, questionHeight, [
          { text: q.text, width: textWidth },
          {
            text: "",
            width: 22,
            checkbox: { checked: q.checked, label: "Yes *" },
          },
          {
            text: "",
            width: 23,
            checkbox: { checked: !q.checked, label: "No" },
          },
        ]);

        boxY += questionHeight;
      });

      return boxY + 4;
    };

    const boxes = [
      {
        title: "BOX A – I HAVE/HAVE HAD:",
        questions: [
          {
            text: "Chest surgery, heart surgery, heart valve surgery, an implantable medical device (eg, stent, pacemaker, neurostimulator), pneumothorax, and/or chronic lung disease.",
            checked: formData.boxA1,
          },
          {
            text: "Asthma, wheezing, severe allergies, hay fever or congested airways within the last 12 months that limits my physical activity/exercise.",
            checked: formData.boxA2,
          },
          {
            text: "A problem or illness involving my heart such as: angina, chest pain on exertion, heart failure, immersion pulmonary edema, heart attack or stroke, OR am taking medication for any heart condition.",
            checked: formData.boxA3,
          },
          {
            text: "Recurrent bronchitis and currently coughing within the past 12 months, OR have been diagnosed with emphysema.",
            checked: formData.boxA4,
          },
          {
            text: "Symptoms affecting my lungs, breathing, heart and/or blood in the last 30 days that impair my physical or mental performance.",
            checked: formData.boxA5,
          },
        ],
      },
      {
        title: "BOX B – I AM OVER 45 YEARS OF AGE AND:",
        questions: [
          {
            text: "I currently smoke or inhale nicotine by other means.",
            checked: formData.boxB1,
          },
          { text: "I have a high cholesterol level.", checked: formData.boxB2 },
          { text: "I have high blood pressure.", checked: formData.boxB3 },
          {
            text: "I have had a close blood relative die suddenly or of cardiac disease or stroke before the age of 50, OR have a family history of heart disease before age 50 (including abnormal heart rhythms, coronary artery disease or cardiomyopathy).",
            checked: formData.boxB4,
          },
        ],
      },
      {
        title: "BOX C – I HAVE/HAVE HAD:",
        questions: [
          {
            text: "Sinus surgery within the last 6 months.",
            checked: formData.boxC1,
          },
          {
            text: "Ear disease or ear surgery, hearing loss, or problems with balance.",
            checked: formData.boxC2,
          },
          {
            text: "Recurrent sinusitis within the past 12 months.",
            checked: formData.boxC3,
          },
          {
            text: "Eye surgery within the past 3 months.",
            checked: formData.boxC4,
          },
        ],
      },
      {
        title: "BOX D – I HAVE/HAVE HAD:",
        questions: [
          {
            text: "Head injury with loss of consciousness within the past 5 years.",
            checked: formData.boxD1,
          },
          {
            text: "Persistent neurologic injury or disease.",
            checked: formData.boxD2,
          },
          {
            text: "Recurring migraine headaches within the past 12 months, or take medications to prevent them.",
            checked: formData.boxD3,
          },
          {
            text: "Blackouts or fainting (full/partial loss of consciousness) within the last 5 years.",
            checked: formData.boxD4,
          },
          {
            text: "Epilepsy, seizures, or convulsions, OR take medications to prevent them.",
            checked: formData.boxD5,
          },
        ],
      },
      {
        title: "BOX E – I HAVE/HAVE HAD:",
        questions: [
          {
            text: "Behavioral health, mental or psychological problems requiring medical/psychiatric treatment.",
            checked: formData.boxE1,
          },
          {
            text: "Major depression, suicidal ideation, panic attacks, uncontrolled bipolar disorder requiring medication/psychiatric treatment.",
            checked: formData.boxE2,
          },
          {
            text: "Been diagnosed with a mental health condition or a learning/developmental disorder that requires ongoing care or special accommodation.",
            checked: formData.boxE3,
          },
          {
            text: "An addiction to drugs or alcohol requiring treatment within the last 5 years.",
            checked: formData.boxE4,
          },
        ],
      },
      {
        title: "BOX F – I HAVE/HAVE HAD:",
        questions: [
          {
            text: "Recurrent back problems in the last 6 months that limit my everyday activity.",
            checked: formData.boxF1,
          },
          {
            text: "Back or spinal surgery within the last 12 months.",
            checked: formData.boxF2,
          },
          {
            text: "Diabetes, either drug or diet controlled, OR gestational diabetes within the last 12 months.",
            checked: formData.boxF3,
          },
          {
            text: "An uncorrected hernia that limits my physical abilities.",
            checked: formData.boxF4,
          },
          {
            text: "Active or untreated ulcers, problem wounds, or ulcer surgery within the last 6 months.",
            checked: formData.boxF5,
          },
        ],
      },
      {
        title: "BOX G – I HAVE HAD:",
        questions: [
          {
            text: "Ostomy surgery and do not have medical clearance to swim or engage in physical activity.",
            checked: formData.boxG1,
          },
          {
            text: "Dehydration requiring medical intervention within the last 7 days.",
            checked: formData.boxG2,
          },
          {
            text: "Active or untreated stomach or intestinal ulcers or ulcer surgery within the last 6 months.",
            checked: formData.boxG3,
          },
          {
            text: "Frequent heartburn, regurgitation, or gastroesophageal reflux disease (GERD).",
            checked: formData.boxG4,
          },
          {
            text: "Active or uncontrolled ulcerative colitis or Crohn's disease.",
            checked: formData.boxG5,
          },
          {
            text: "Bariatric surgery within the last 12 months.",
            checked: formData.boxG6,
          },
        ],
      },
    ];

    boxes.forEach((box) => {
      yPos = drawDetailedBox(box.title, box.questions, yPos);
    });

    pdf.setFontSize(9);
    checkPageBreak(4);
    pdf.text(
      "*Physician's medical evaluation required (see page 1).",
      margin,
      yPos + 4,
    );

    pdf.setFontSize(8);
    pdf.text("2 of 3", pageWidth / 2, pageHeight - 15, { align: "center" });
    pdf.text("© 2020", pageWidth - margin, pageHeight - 15, {
      align: "right",
    });
  }

  // PAGE 3 - Add if Page 2 exists OR if specific Page 1 questions (3, 5, 10) are Yes
  // Also if the user needs medical clearance (which we track via the alert logic, but here we can infer)
  // Actually, standard is: if Page 2 is needed, Page 3 is needed.
  // Also if Q3, Q5, Q10 are Yes, Page 3 is needed.
  const hasPage3Content =
    hasPage2Content ||
    formData.question3 ||
    formData.question5 ||
    formData.question10;

  if (hasPage3Content) {
    pdf.setPage(pdf.getNumberOfPages());
    pdf.addPage();
    yPos = 30;

    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text(
      "Diver Medical | Medical Examiner's Evaluation Form",
      pageWidth / 2,
      yPos,
      { align: "center" },
    );

    yPos += 15;

    // Header info
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, margin + 100, yPos);
    if (formData.participantName) {
      pdf.setFontSize(9);
      pdf.text(formData.participantName, margin, yPos - 2);
    }
    pdf.setFontSize(8);
    pdf.text("Participant Name (Print)", margin, yPos + 4);

    pdf.setLineWidth(0.5);
    pdf.line(margin + 110, yPos, margin + contentWidth, yPos);
    if (formData.birthdate) {
      pdf.setFontSize(9);
      pdf.text(formData.birthdate, margin + 110, yPos - 2);
    }
    pdf.setFontSize(8);
    pdf.text("Birthdate Date (dd/mm/yyyy)", margin + 110, yPos + 4);

    yPos += 20;

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    const evaluationText =
      "The above-named person requests your opinion of his/her medical suitability to participate in recreational scuba diving or freediving training or activity. Please visit uhms.org for medical guidance on medical conditions as they relate to diving. Review the areas relevant to your patient as part of your evaluation.";
    const evaluationLines = pdf.splitTextToSize(evaluationText, contentWidth);
    evaluationLines.forEach((line: string) => {
      checkPageBreak(3.5);
      pdf.text(line, margin, yPos);
      yPos += 3.5;
    });

    yPos += 10;

    // Evaluation Result
    checkPageBreak(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Evaluation Result", margin, yPos);
    yPos += 10;

    pdf.setFont("helvetica", "normal");
    checkPageBreak(4);
    drawCheckbox(margin, yPos, formData.evaluationResult === "approved", 4);
    pdf.text(
      "Approved – I find no conditions that I consider incompatible with recreational scuba diving or freediving.",
      margin + 8,
      yPos + 3,
    );

    yPos += 10;
    checkPageBreak(4);
    drawCheckbox(margin, yPos, formData.evaluationResult === "not-approved", 4);
    pdf.text(
      "Not approved – I find conditions that I consider incompatible with recreational scuba diving or freediving.",
      margin + 8,
      yPos + 3,
    );

    yPos += 15;

    // Medical Examiner signature fields
    checkPageBreak(20);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, margin + 100, yPos);
    if (formData.medicalExaminerSignature) {
      pdf.text(formData.medicalExaminerSignature, margin, yPos - 2);
    }
    pdf.setFontSize(8);
    pdf.text(
      "Signature of certified medical doctor or other legally certified medical provider",
      margin,
      yPos + 4,
    );

    pdf.setLineWidth(0.5);
    pdf.line(margin + 110, yPos, margin + contentWidth, yPos);
    if (formData.medicalExaminerDate) {
      pdf.setFontSize(9);
      pdf.text(formData.medicalExaminerDate, margin + 110, yPos - 2);
    }
    pdf.setFontSize(8);
    pdf.text("Date (dd/mm/yyyy)", margin + 110, yPos + 4);

    yPos += 15;

    // Full-width fields
    const fullWidthFields = [
      {
        label: "Medical Examiner's Name (Print)",
        value: formData.medicalExaminerName,
      },
      {
        label: "Clinical Degrees/Credentials",
        value: formData.medicalExaminerCredentials,
      },
      { label: "Clinic/Hospital", value: formData.medicalExaminerClinic },
      { label: "Address", value: formData.medicalExaminerAddress },
    ];

    fullWidthFields.forEach((field) => {
      checkPageBreak(12);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPos, margin + contentWidth, yPos);
      if (field.value) {
        pdf.text(field.value, margin, yPos - 2);
      }
      pdf.setFontSize(8);
      pdf.text(field.label, margin, yPos + 4);

      yPos += 12;
    });

    // Phone and Email on same line
    checkPageBreak(12);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, margin + 100, yPos);
    if (formData.medicalExaminerPhone) {
      pdf.setFontSize(9);
      pdf.text(formData.medicalExaminerPhone, margin, yPos - 2);
    }
    pdf.setFontSize(8);
    pdf.text("Phone", margin, yPos + 4);

    pdf.setLineWidth(0.5);
    pdf.line(margin + 110, yPos, margin + contentWidth, yPos);
    if (formData.medicalExaminerEmail) {
      pdf.setFontSize(9);
      pdf.text(formData.medicalExaminerEmail, margin + 110, yPos - 2);
    }
    pdf.setFontSize(8);
    pdf.text("Email", margin + 110, yPos + 4);

    yPos += 20;

    // Physician/Clinic Stamp box
    checkPageBreak(30);
    pdf.setLineWidth(0.3);
    pdf.rect(margin + 60, yPos, 70, 30);
    pdf.setFontSize(8);
    pdf.text("Physician/Clinic Stamp (optional)", margin + 95, yPos + 17, {
      align: "center",
    });

    // Footer
    yPos = pageHeight - 50;
    pdf.setFontSize(8);
    pdf.text(
      "Created by the Diver Medical Screen Committee in association with the",
      margin,
      yPos,
    );
    yPos += 4;
    pdf.text("following bodies:", margin, yPos);
    yPos += 5;
    pdf.text("The Undersea & Hyperbaric Medical Society", margin, yPos);
    yPos += 4;
    pdf.text("DAN (US)", margin, yPos);
    yPos += 4;
    pdf.text("DAN Europe", margin, yPos);
    yPos += 4;
    pdf.text(
      "Hyperbaric Medicine Division, University of California, San Diego",
      margin,
      yPos,
    );

    yPos += 10;
    pdf.text("3 of 3", pageWidth / 2, yPos, { align: "center" });
    pdf.text("10346 EN", margin, yPos);
    pdf.text("© DMSC 2020", pageWidth - margin, yPos, { align: "right" });
  }

  // Save the PDF
  // pdf.save("diver-medical-questionnaire.pdf");
  // Generate PDF Blob instead of auto-downloading
  const pdfBlob = pdf.output("blob");

  // Convert Blob to File for uploading
  const pdfFile = new File([pdfBlob], "diver-medical-questionnaire.pdf", {
    type: "application/pdf",
  });

  return pdfFile;
}
