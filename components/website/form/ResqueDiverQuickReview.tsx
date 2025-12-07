// "use client";
// import Image from "next/image";
// import React, { useState, useRef } from "react";
//         <div className="max-w-6xl mx-auto mb-4 no-print">
//           {/* <button
//             onClick={handleExportPDF}
//             disabled={isGeneratingPDF}
//             className={`font-bold py-3 px-6 rounded-lg transition duration-200 w-full ${
//               isGeneratingPDF
//                 ? "bg-gray-400 cursor-not-allowed text-gray-700"
//                 : "bg-blue-600 hover:bg-blue-700 text-white"
//             }`}
//           >
//             {isGeneratingPDF ? "Generating PDF..." : "Submit Form"}
//           </button> */}
//         </div>

//         {/* Form Content */}
//         <div
//           ref={formRef}
//           className="print-area max-w-6xl mx-auto bg-white p-10 text-sm leading-relaxed font-serif shadow-lg"
//         >
//           <div className="flex justify-end">
//             <p className="text-xl">Name:</p>{" "}
//             <input
//               type="text"
//               value={participantName}
//               onChange={(e) => setParticipantName(e.target.value)}
//               placeholder="Participant Name"
//               className="border-b border-black w-46 h-8 px-1 bg-transparent focus:outline-none"
//             />{" "}
//           </div>
//           <div className="flex items-center pb-4">
//             <div className="mr-6 flex-shrink-0">
//               <Image
//                 src={"/images/pdf-logo.jpg"}
//                 alt="Padi logo"
//                 width={200}
//                 height={200}
//                 crossOrigin="anonymous"
//               />
//             </div>

//             <div className="flex-1">
//               <div>
//                 <h1 className="text-center font-bold text-gray-600 tracking-wider text-5xl mb-1">
//                   Rescue Diver Course Online
//                 </h1>
//                 <h2 className="text-center text-4xl font-semibold tracking-tight mb-4">
//                   Quick Review Answer Sheet
//                 </h2>
//                 <p className=" capitalize text-gray-700 text-3xl text-center">
//                   Directions: Choose the best answer from the choices provided.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Questions Section */}
//           <div className="ml-10 grid grid-cols-2 gap-x-10 gap-y-6">
//             {questions.map((question) => (
//               <div key={question.id} className="mb-6">
//                 <p className="text-lg font-medium mb-3 leading-relaxed">
//                   {question.id}. {question.text}
//                 </p>

//                 <div className="ml-4 space-y-2">
//                   {question.options.map((option) => (
//                     <label
//                       key={option}
//                       className="flex items-center gap-3 cursor-pointer"
//                     >
//                       <input
//                         type="checkbox"
//                         name={`question-${question.id}`}
//                         value={option}
//                         checked={
//                           answers[question.id]?.includes(option) || false
//                         }
//                         onChange={(e) =>
//                           handleAnswerChange(
//                             question.id,
//                             e.target.value,
//                             e.target.checked,
//                           )
//                         }
//                         className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
//                       />
//                       <span className="text-base">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 border-2 p-6">
//             <p className="text-base p-3 mt-4 mb-4">
//               <span className="font-bold">eLearner Statement</span>: Any
//               questions I answered incorrectly I&apos;ve had explained to me and
//               I understand what I missed.
//             </p>
//             <div className="flex gap-10">
//               <div className="flex-5 w-full">
//                 <div>
//                   <label className="block text-center text-sm mb-1">
//                     Parent/Guardian Signature (if applicable):
//                   </label>
//                   <input
//                     type="text"
//                     value={guardianSignature}
//                     onChange={(e) => setGuardianSignature(e.target.value)}
//                     placeholder="Parent/Guardian Signature"
//                     className="border-b border-black w-full h-8 px-1 bg-transparent focus:outline-none"
//                     style={{ fontFamily: "cursive" }}
//                   />
//                 </div>
//               </div>
//               <div className="flex-2">
//                 <label className="block text-sm mb-1">Date (DD/MM/YYYY):</label>
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   placeholder="DD/MM/YYYY"
//                   className="border-b border-black w-full h-8 px-1 bg-transparent focus:outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto mb-4 mt-4 no-print">
//           <button
//             onClick={handleExportPDF}
//             disabled={isGeneratingPDF}
//             className={`font-bold py-3 px-6 rounded-lg transition duration-200 w-full ${
//               isGeneratingPDF
//                 ? "bg-gray-400 cursor-not-allowed text-gray-700"
//                 : "bg-blue-600 hover:bg-blue-700 text-white"
//             }`}
//           >
//             {isGeneratingPDF ? "Generating PDF..." : "Submit Form"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResqueDiverQuickReview;
// const onSubmitSuccess = () => {};
