import jsPDF from "jspdf";

export const generatePaginatedPDF = async (
  element: HTMLElement,
  fileName: string,
): Promise<File> => {
  const { default: html2canvas } = await import("html2canvas");

  // Capture the element as a canvas
  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
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

  const imgData = canvas.toDataURL("image/png", 1.0);

  // Initialize jsPDF with A4 size
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

  // Calculate image dimensions to fit A4 width
  const imgProps = pdf.getImageProperties(imgData);
  const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add the first page
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Add subsequent pages if content overflows
  while (heightLeft > 0) {
    position -= pdfHeight; // Move the image up by one page height
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;
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
