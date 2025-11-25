// "use client";

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// // import { useBooking } from "../booking-context"

// export function ActivityQuestionsStep() {
//   // const { state, dispatch } = useBooking()

//   // const handleChange = (field: string, value: string | boolean) => {
//   //   // dispatch({
//   //   //   type: "SET_ACTIVITY_QUESTIONS",
//   //   //   payload: { [field]: value },
//   //   // })
//   // }

//   // const handleCheckboxChange = (field: string, checked: boolean) => {
//   //   // dispatch({
//   //   //   type: "SET_ACTIVITY_QUESTIONS",
//   //   //   payload: { [field]: checked },
//   //   // })
//   // }

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-6 text-[#343a40]">
//         Activity Specific Questions
//       </h2>

//       <div className="space-y-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <Label className="text-base font-medium mb-3 block">
//               Swimming...
//             </Label>
//             <div className="space-y-2">
//               {["Excellent", "Good", "Fair", "Poor"].map((level) => (
//                 <label key={level} className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="swimming"
//                     value={level}
//                     // checked={state.activityQuestions.swimmingLevel === level}
//                     // onChange={(e) => handleChange("swimmingLevel", e.target.value)}
//                     className="w-4 h-4 text-[#0694a2]"
//                   />
//                   <span className="text-[#68706a]">{level}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <Label className="text-base font-medium mb-3 block">
//               Diving Experience
//             </Label>
//             <div className="space-y-2">
//               {["None", "Beginner", "Intermediate", "Advanced"].map((level) => (
//                 <label key={level} className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="diving"
//                     value={level}
//                     // checked={state.activityQuestions.divingExperience === level}
//                     // onChange={(e) => handleChange("divingExperience", e.target.value)}
//                     className="w-4 h-4 text-[#0694a2]"
//                   />
//                   <span className="text-[#68706a]">{level}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="physical-exam">
//             Date of Last Physical Examination
//           </Label>
//           <Input
//             id="physical-exam"
//             placeholder="mm/dd/yyyy"
//             // value={state.activityQuestions.lastPhysicalExam}
//             // onChange={(e) => handleChange("lastPhysicalExam", e.target.value)}
//             className="mt-2"
//           />
//         </div>

//         <div>
//           <Label className="text-base font-medium mb-3 block">
//             Fitness Level
//           </Label>
//           <div className="flex gap-6">
//             {["Excellent", "Good", "Fair", "Poor"].map((level) => (
//               <label key={level} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="fitness"
//                   value={level}
//                   // checked={state.activityQuestions.fitnessLevel === level}
//                   // onChange={(e) => handleChange("fitnessLevel", e.target.value)}
//                   className="w-4 h-4 text-[#0694a2]"
//                 />
//                 <span className="text-[#68706a]">{level}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <Label className="text-[#68706a] cursor-pointer flex-1">
//               I have physical approval for scuba diving activities
//             </Label>
//             <Switch
//               // checked={state.activityQuestions.physicalApproval}
//               // onCheckedChange={(checked) => handleCheckboxChange("physicalApproval", checked)}
//               className="data-[state=checked]:bg-[#0694a2]"
//             />
//           </div>

//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <Label className="text-[#68706a] cursor-pointer flex-1">
//               I am comfortable in water and can swim at least 200 meters
//             </Label>
//             <Switch
//               // checked={state.activityQuestions.canSwim200m}
//               // onCheckedChange={(checked) => handleCheckboxChange("canSwim200m", checked)}
//               className="data-[state=checked]:bg-[#0694a2]"
//             />
//           </div>

//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <Label className="text-[#68706a] cursor-pointer flex-1">
//               I suffer from claustrophobia
//             </Label>
//             <Switch
//               // checked={state.activityQuestions.claustrophobia}
//               // onCheckedChange={(checked) => handleCheckboxChange("claustrophobia", checked)}
//               className="data-[state=checked]:bg-[#0694a2]"
//             />
//           </div>

//           <div className="flex items-center justify-between p-4 border rounded-lg">
//             <Label className="text-[#68706a] cursor-pointer flex-1">
//               I have a history of panic attacks or anxiety disorders
//             </Label>
//             <Switch
//               // checked={state.activityQuestions.panicAttacks}
//               // onCheckedChange={(checked) => handleCheckboxChange("panicAttacks", checked)}
//               className="data-[state=checked]:bg-[#0694a2]"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
