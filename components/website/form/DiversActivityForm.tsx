// "use client"
// import React, { useRef, useState } from 'react'

// const DiversActivityForm = () => {
//   const formRef = useRef(null)
//   const [isExporting, setIsExporting] = useState(false)

//   const exportToPDF = async () => {
//     if (formRef.current) {
//       setIsExporting(true)
//       try {
//         // Dynamically import html2canvas and jsPDF
//         const html2canvas = (await import('html2canvas')).default
//         const jsPDF = (await import('jspdf')).default

//         const canvas = await html2canvas(formRef.current, {
//           scale: 2,
//           useCORS: true,
//           backgroundColor: '#ffffff',
//           width: formRef.current.offsetWidth,
//           height: formRef.current.offsetHeight,
//         })

//         const imgData = canvas.toDataURL('image/png')
        
//         // Calculate PDF dimensions (A4 size)
//         const pdfWidth = 210; // A4 width in mm
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
//         const pdf = new jsPDF({
//           orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
//           unit: 'mm',
//           format: [pdfWidth, pdfHeight]
//         });

//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('padi-liability-form.pdf');

//       } catch (error) {
//         console.error('Error generating PDF:', error)
//         alert('Error generating PDF. Please try again.')
//       } finally {
//         setIsExporting(false)
//       }
//     }
//   }

//   return (
//     <div className="w-full">
//       {/* Export Button */}
//       <div className="mb-4 text-center">
//         <button
//           onClick={exportToPDF}
//           disabled={isExporting}
//           className={`${
//             isExporting 
//               ? 'bg-gray-400 cursor-not-allowed' 
//               : 'bg-blue-600 hover:bg-blue-700'
//           } text-white font-bold py-2 px-6 rounded transition-colors duration-200`}
//         >
//           {isExporting ? 'Generating PDF...' : 'Export to PDF'}
//         </button>
//         <p className="text-sm text-gray-600 mt-2">
//           Downloads the form as a PDF document
//         </p>
//       </div>

//       {/* Form Container */}
//       <div 
//         ref={formRef}
//         className="max-w-4xl mx-auto p-6 font-sans text-xs leading-tight bg-white border border-gray-200 shadow-lg"
//         style={{ 
//           minWidth: '794px', // A4 width in pixels at 96dpi
//           fontFamily: 'Arial, sans-serif'
//         }}
//       >
//       {/* Header Section */}
//       <div className="flex items-center mb-5 border-b-4 border-black pb-3">
//         <div className="mr-5">
//           <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center relative mb-2">
//             <div className="w-16 h-16 border-2 border-black rounded-full relative bg-white">
//               <div className="absolute top-2 left-2 w-12 h-12 border border-black rounded-full"></div>
//               <div className="absolute top-4 left-1 w-14 h-6 border-t border-b border-black"></div>
//             </div>
//           </div>
//           <div className="text-2xl font-bold tracking-widest">PADI</div>
//         </div>
//         <div className="flex-1 text-center">
//           <div className="text-sm font-bold mb-1">Release of Liability/Assumption of Risk/Non-agency Acknowledgment Form</div>
//           <div className="text-lg font-bold tracking-widest">DIVER ACTIVITIES</div>
//         </div>
//       </div>

//       {/* Content Paragraphs */}
//       <div className="text-justify mb-4">
//         I am aware safe dive practices recommend a refresher or guided orientation dive following a period of diving inactivity. I understand 
//         such refresher/guided dive is available for an additional fee. If I choose not to follow this recommendation I will not hold the Released 
//         Parties responsible for my decision.
//       </div>

//       <div className="text-justify mb-4">
//         I acknowledge Released Parties may provide an in-water guide (hereinafter "Guide") during the Excursion. The Guide is present to 
//         assist in navigation during the dive and identifying local flora and fauna. If I choose to dive with the Guide I acknowledge it is my 
//         responsibility to stay in proximity to the Guide during the dive. I assume all risks associated with my choice whether to dive in proximity 
//         to the Guide or to dive independent of the Guide. I acknowledge my participation in diving is at my own risk and peril.
//       </div>

//       <div className="text-justify mb-4">
//         I affirm it is my responsibility to inspect all of the equipment I will be using prior to the leaving the dock for the Excursion and that I 
//         should not dive if the equipment is not functioning properly. I will not hold the Released Parties responsible for my failure to inspect 
//         the equipment prior to diving or if I choose to dive with equipment that may not be functioning properly.
//       </div>

//       <div className="text-justify mb-4">
//         I acknowledge Released Parties have made no representation to me, implied or otherwise, that they or their crew can or will perform 
//         affective rescues or render first aid. In the event I show signs of distress or call for aid I would like assistance and will not hold the 
//         Released Parties, their crew, dive boats or passengers responsible for their actions in attempting the performance of rescue or first aid.
//       </div>

//       <div className="text-justify mb-4">
//         I hereby state and agree that this Agreement will be effective for all Excursions in which I participate for one (1) year from the date 
//         on which I sign this Agreement.
//       </div>

//       <div className="text-justify mb-4">
//         I further state that I am of lawful age and legally competent to sign this liability release, or that I have acquired the written consent of 
//         my parent or guardian. I understand the terms herein are contractual and not a mere recital, and that I have signed this Agreement 
//         of my own free act and with the knowledge that I hereby agree to waive my legal rights. I further agree that if any provision of 
//         this Agreement is found to be unenforceable or invalid, that provision shall be severed from this Agreement. The remainder of this 
//         Agreement will then be construed as though the unenforceable provision had never been contained herein. I understand and agree 
//         that I am not only giving up my right to sue the Released Parties but also any rights my heirs, assigns, or beneficiaries may have to 
//         sue the Released Parties resulting from my death. I further represent that I have the authority to do so and that my heirs, assigns, and 
//         beneficiaries will be estopped from claiming otherwise because of my representations to the Released Parties.
//       </div>

//       <div className="text-justify mb-4">
//         I, <span className="inline-block w-72 border-b border-black h-5"></span>, BY THIS INSTRUMENT, AGREE TO EXEMPT AND RELEASE THE RELEASED 
//         PARTIES DEFINED ABOVE FROM ALL LIABILITY OR RESPONSIBILITY WHATSOEVER FOR PERSONAL INJURY, PROPERTY DAMAGE OR 
//         WRONGFUL DEATH HOWEVER CAUSED, INCLUDING BUT NOT LIMITED TO THE NEGLIGENCE OF THE RELEASED PARTIES, WHETHER 
//         PASSIVE OR ACTIVE.
//       </div>

//       <div className="font-bold my-5">
//         I HAVE FULLY INFORMED MYSELF AND MY HEIRS OF THE CONTENTS OF THIS NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT 
//         AGREEMENT, AND LIABILITY RELEASE AND ASSUMPTION OF RISK AGREEMENT BY READING BOTH BEFORE SIGNING BELOW ON 
//         BEHALF OF MYSELF AND MY HEIRS.
//       </div>

//       {/* Signature Section */}
//       <div className="grid grid-cols-2 gap-5 items-end mt-8">
//         <div>
//           <div className="border-b border-black h-8 mb-1"></div>
//           <div className="text-xs text-center">Participant Signature</div>
//         </div>
//         <div>
//           <div className="border-b border-black h-8 mb-1"></div>
//           <div className="text-xs text-center">Date (Day/Month/Year)</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-5 items-end mt-6">
//         <div>
//           <div className="border-b border-black h-8 mb-1"></div>
//           <div className="text-xs text-center">Signature of Parent of Guardian (where applicable)</div>
//         </div>
//         <div>
//           <div className="border-b border-black h-8 mb-1"></div>
//           <div className="text-xs text-center">Date (Day/Month/Year)</div>
//         </div>
//       </div>

//       {/* Insurance Section */}
//       <div className="flex items-center gap-3 mt-5">
//         <span>Diver Accident Insurance?</span>
//         <div className="w-4 h-4 border border-black"></div>
//         <span>NO</span>
//         <div className="w-4 h-4 border border-black"></div>
//         <span>YES</span>
//         <span className="ml-5">Policy Number</span>
//         <div className="inline-block w-48 border-b border-black h-5 ml-3"></div>
//       </div>

//       {/* Footer */}
//       <div className="text-center mt-8 text-xs">
//         - page 2 of 2 -
//       </div>
//       </div>
//     </div>
//   )
// }

// export default DiversActivityForm

import React from 'react'

const DiversActivityForm = () => {
  return (
    <div>
        
    </div>
  )
}

export default DiversActivityForm