import html2pdf from 'html2pdf.js';


export const generatePaginatedPDF = async (
  element: HTMLElement,
  fileName: string,
): Promise<File> => {
  const options = {
    margin: 10,
    filename: fileName,
    image: { type: "jpeg" as const, quality: 0.7 },
    html2canvas: {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      onclone: (clonedDoc: Document) => {
        // Inject global styles for PDF rendering
        const style = clonedDoc.createElement("style");
        style.innerHTML = `
          p, .text-justify {
            text-align: justify !important;
            text-justify: inter-word !important;
            line-height: 1.4 !important;
          }
          p, h1, h2, h3, h4, li, .no-split, .signature-block {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .pdf-columns {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
            page-break-inside: auto !important;
            break-inside: auto !important;
          }
          .pdf-columns > div {
            flex: none !important;
            width: auto !important;
          }
          .print-area {
            padding: 0 !important;
            margin: 0 !important;
            padding-bottom: 30px !important; /* Increased buffer */
          }
          input {
            border-bottom: 1px solid black !important;
          }
        `;
        clonedDoc.head.appendChild(style);

        // Color sanitization logic
        try {
          clonedDoc.querySelectorAll("*").forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.style) {
              const computedStyle =
                clonedDoc.defaultView?.getComputedStyle(htmlEl);
              if (computedStyle) {
                const colorProps = [
                  "color",
                  "background-color",
                  "border-color",
                  "border-top-color",
                  "border-bottom-color",
                  "border-left-color",
                  "border-right-color",
                  "outline-color",
                  "text-decoration-color",
                ];
                colorProps.forEach((prop) => {
                  const computedValue = computedStyle.getPropertyValue(prop);
                  if (
                    computedValue &&
                    (computedValue.includes("lab(") ||
                      computedValue.includes("oklch("))
                  ) {
                    const replacement = prop.includes("background")
                      ? "rgb(255, 255, 255)"
                      : "rgb(0, 0, 0)";
                    htmlEl.style.setProperty(prop, replacement, "important");
                  }
                });
              }
            }
          });
        } catch (e) {
          console.warn("Color sanitization warning:", e);
        }
      },
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const, compress: true },
    pagebreak: {
      mode: ["avoid-all", "css"],
      avoid: ["tr", ".no-split", ".signature-block"],
    },
  };

  const pdfBlob = await html2pdf().set(options).from(element).output("blob");
  return new File([pdfBlob], fileName, { type: "application/pdf" });
};

export const downloadPDF = (file: File) => {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
