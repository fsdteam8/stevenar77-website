// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Upload, X } from "lucide-react"
// import { useBooking } from "../booking-context"

// export function DocumentUploadStep() {
//   const { state, dispatch } = useBooking()
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [dragActive, setDragActive] = useState(false)

//   const handleFiles = (files: FileList) => {
//     const newFiles = Array.from(files).filter((file) => {
//       const validTypes = ["application/pdf", "image/jpeg", "image/png"]
//       const maxSize = 10 * 1024 * 1024 // 10MB
//       return validTypes.includes(file.type) && file.size <= maxSize
//     })

//     dispatch({ type: "SET_DOCUMENTS", payload: [...state.documents, ...newFiles] })
//   }

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true)
//     } else if (e.type === "dragleave") {
//       setDragActive(false)
//     }
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(false)

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFiles(e.dataTransfer.files)
//     }
//   }

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files)
//     }
//   }

//   const removeFile = (index: number) => {
//     const newFiles = state.documents.filter((_, i) => i !== index)
//     dispatch({ type: "SET_DOCUMENTS", payload: newFiles })
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">Medical certifications & Document</h2>

//       <p className="text-[#6c757d] mb-6">
//         Upload any medical certificates, doctor&apos;s notes, or other relevant documents. Accepted formats: PDF, JPG, PNG.
//         Maximum file size: 10MB per file.
//       </p>

//       <Card
//         className={`border-2 border-dashed p-8 text-center transition-colors ${
//           dragActive ? "border-[#0694a2] bg-blue-50" : "border-[#c0c3c1]"
//         }`}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       >
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-16 h-16 bg-[#0694a2] rounded-full flex items-center justify-center">
//             <Upload className="w-8 h-8 text-white" />
//           </div>
//           <div>
//             <p className="text-[#6c757d] mb-2">Browse and choose the files you want to upload from your computer</p>
//             <Button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className="bg-[#0694a2] hover:bg-[#0694a2]/90 text-white"
//             >
//               <Upload className="w-4 h-4 mr-2" />
//               Choose Files
//             </Button>
//           </div>
//         </div>

//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           accept=".pdf,.jpg,.jpeg,.png"
//           onChange={handleFileInput}
//           className="hidden"
//         />
//       </Card>

//       {state.documents.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-medium mb-3 text-[#343a40]">Uploaded Files</h3>
//           <div className="space-y-2">
//             {state.documents.map((file, index) => (
//               <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-[#0694a2] rounded flex items-center justify-center">
//                     <span className="text-white text-xs font-medium">{file.name.split(".").pop()?.toUpperCase()}</span>
//                   </div>
//                   <div>
//                     <p className="font-medium text-sm text-[#343a40]">{file.name}</p>
//                     <p className="text-xs text-[#6c757d]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                   </div>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => removeFile(index)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useBooking } from "../booking-context";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import StandardsForm from "../../form/StandardsForm";

export function DocumentUploadStep() {
  const { state, dispatch } = useBooking();

  // State to manage which modal is open
  const [openModal, setOpenModal] = React.useState<"modal1" | "modal2" | null>(null);

  const closeModal = () => setOpenModal(null);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#343a40]">
        Medical certifications & Document
      </h2>

      <p className="text-[#6c757d] mb-6">
        Upload any medical certificates, doctor&apos;s notes, or other relevant documents. Accepted formats: PDF, JPG, PNG.
        Maximum file size: 10MB per file.
      </p>

      {/* Buttons to open modals */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setOpenModal("modal1")}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Open Standards Form
        </Button>

        <Button
          onClick={() => setOpenModal("modal2")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Open Modal 2
        </Button>
      </div>

      {/* Modal 1 - StandardsForm */}
      <Dialog open={openModal === "modal1"} onOpenChange={(open) => !open && closeModal()} >
        <DialogContent className="">
          {/* Optional title */}
          <DialogTitle>Standards Form</DialogTitle>

          {/* Embed the form */}
          <StandardsForm />

          <DialogFooter>
            <Button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal 2 */}
      <Dialog open={openModal === "modal2"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md">
          <DialogTitle>Modal 2</DialogTitle>
          <p>This is the content of Modal 2.</p>

          <DialogFooter>
            <Button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
