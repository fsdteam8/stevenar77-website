import jsPDF from "jspdf";

export const generatePaginatedPDF = async (
  element: HTMLElement,
  fileName: string,
): Promise<File> => {
  const { default: html2canvas } = await import("html2canvas");

  // Capture the element as a canvas
  const canvas = await html2canvas(element, {
    scale: 1.5, // Reduced from 2 to 1.5 for better file size
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    width: element.scrollWidth,
    height: element.scrollHeight,
    ignoreElements: (el) =>
      el.classList.contains("no-print") ||
      (el.tagName === "IMG" &&
        (el.getAttribute("src")?.startsWith("http") ?? false)),
    onclone: (clonedDoc) => {
      // Color sanitization logic (copied from existing forms)
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
  });

  // Use JPEG with 0.7 quality for significant size reduction
  const imgData = canvas.toDataURL("image/jpeg", 0.7);

  // Initialize jsPDF with A4 size and compression
  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    compress: true,
  });
  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

  // Calculate image dimensions to fit A4 width with margins
  const margin = 10; // 10mm margin
  const innerWidth = pdfWidth - 2 * margin;
  const innerHeight = pdfHeight - 2 * margin;

  const imgProps = pdf.getImageProperties(imgData);
  const imgHeight = (imgProps.height * innerWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add the first page
  pdf.addImage(
    imgData,
    "JPEG",
    margin,
    margin + position,
    innerWidth,
    imgHeight,
    undefined,
    "FAST",
  );

  // Overlay margins with white rectangles to prevent content spillover
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pdfWidth, margin, "F"); // Top
  pdf.rect(0, pdfHeight - margin, pdfWidth, margin, "F"); // Bottom
  pdf.rect(0, 0, margin, pdfHeight, "F"); // Left
  pdf.rect(pdfWidth - margin, 0, margin, pdfHeight, "F"); // Right

  heightLeft -= innerHeight;

  // Add subsequent pages if content overflows
  while (heightLeft > 0) {
    position -= innerHeight; // Move the image up by the inner height of the page
    pdf.addPage();
    pdf.addImage(
      imgData,
      "JPEG",
      margin,
      margin + position,
      innerWidth,
      imgHeight,
      undefined,
      "FAST",
    );

    // Overlay margins on subsequent pages
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pdfWidth, margin, "F"); // Top
    pdf.rect(0, pdfHeight - margin, pdfWidth, margin, "F"); // Bottom
    pdf.rect(0, 0, margin, pdfHeight, "F"); // Left
    pdf.rect(pdfWidth - margin, 0, margin, pdfHeight, "F"); // Right

    heightLeft -= innerHeight;
  }

  const pdfBlob = pdf.output("blob");
  const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

  return pdfFile;
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
