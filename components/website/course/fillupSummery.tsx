// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { format } from "date-fns";
// import { useSession, signIn } from "next-auth/react";
// import {  AlertCircle } from "lucide-react";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// import { useBooking } from "./booking-context";
// import { useCreateBooking } from "@/services/hooks/profile/useCreateBooking";
// import { mapBookingStateToPayload } from "@/utils/booking-mapper";
// import type { CourseDetail } from "@/lib/course";

// interface BookingSummaryProps {
//   courseData: CourseDetail;
// }

// export function FillupSummary({ courseData }: BookingSummaryProps) {
//   const { state } = useBooking();
//   const {  status } = useSession();
//   const createBookingMutation = useCreateBooking();

//   const [validationError, setValidationError] = useState<string>("");

//   // -------------------------------------------------------
//   // 🧩 Derived Data & Computations
//   // -------------------------------------------------------
//   const isAuthenticated = status === "authenticated";
//   const isOnFinalStep = state.currentStep === 1; // ✅ Adjust based on total steps in your flow
//   const selectedTime = "10:00";

//   // Format class date
//   const formatDate = (date: Date | null): string =>
//     date ? format(date, "EEEE, MMMM dd") : "Not selected";

//   // Handle multiple pricing scenarios
//   const hasMultiplePrices =
//     Array.isArray(state.course.price) && state.course.price.length > 1;

//   const pricingOptions: Record<string, number> = {
//     "3-day": 199,
//     "5-day": 399,
//   };

//   const basePrice = Array.isArray(state.course.price)
//     ? state.course.price[0]
//     : state.course.price || 0;

//   const pricingPrice = state.pricing ? pricingOptions[state.pricing] || 0 : 0;

//   const addOnsTotal = state.addOns.reduce((sum, addon) => sum + addon.price, 0);
//   const participants = state.participants || 1;

//   const totalPrice = (basePrice + pricingPrice) * participants + addOnsTotal;

//   // -------------------------------------------------------
//   // ✅ Validation Logic
//   // -------------------------------------------------------
//   const validateBooking = (): boolean => {
//     setValidationError("");

//     if (!isAuthenticated) {
//       setValidationError("Please sign in to proceed with booking.");
//       return false;
//     }

//     if (!isOnFinalStep) {
//       setValidationError(
//         "Please complete all booking steps before proceeding.",
//       );
//       return false;
//     }

//     const { name, email } = state.personalInfo;
//     if (!name.trim() || !email.trim()) {
//       setValidationError("Please fill in all required personal information.");
//       return false;
//     }

//     if (!state.selectedDate) {
//       setValidationError("Please select a class date before proceeding.");
//       return false;
//     }

//     return true;
//   };

//   // -------------------------------------------------------
//   // 🧾 Handle Booking Submission
//   // -------------------------------------------------------
//   const handleProceedToPayment = async () => {
//     if (!validateBooking()) return;

//     try {
//       const bookingPayload = {
//         ...mapBookingStateToPayload(state),
//         selectedTime,
//       };

//       await createBookingMutation.mutateAsync(bookingPayload);
//     } catch (error) {
//       console.error("Booking failed:", error);
//       setValidationError("Failed to create booking. Please try again.");
//     }
//   };

//   // -------------------------------------------------------
//   // 🔐 Handle Authentication
//   // -------------------------------------------------------
//   const handleSignIn = () => signIn();

//   // -------------------------------------------------------
//   // 🖼️ Render
//   // -------------------------------------------------------
//   return (
//     <Card className="p-6 sticky top-4">
//       <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
//         Booking Summary
//       </h2>

//       <div className="space-y-4">
//         {/* Course Information */}
//         <div className="flex items-center gap-3">
//           <Image
//             src={state.course.image || "/scuba-diving-course-thumbnail.jpg"}
//             alt={state.course.name || "Course thumbnail"}
//             width={64}
//             height={48}
//             className="rounded object-cover"
//           />
//           <div>
//             <h3 className="font-medium text-[#343a40]">
//               {state.course.name || "Unknown Course"}
//             </h3>
//             {/* {state.course.age && (
//               <p className="text-sm text-[#6c757d]">Age: {state.course.age}</p>
//             )} */}
//           </div>
//         </div>

//         {/* Sign-In Prompt */}
//         {status === "unauthenticated" && (
//           <Alert>
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription className="flex items-center justify-between">
//               <span>Sign in required for booking</span>
//               <Button size="sm" onClick={handleSignIn} variant="outline">
//                 Sign In
//               </Button>
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* Selected Date & Time */}
//         <div className="space-y-2 text-sm text-[#6c757d]">
//           <div>
//             {formatDate(
//               (() => {
//                 const sd = state.selectedDate;
//                 if (!sd) return null;
//                 if (Array.isArray(sd)) return new Date(sd[0]);
//                 return new Date(sd);
//               })(),
//             )}
//           </div>
//           <div className="hidden">{selectedTime}am</div>
//         </div>

//         {/* Price Breakdown */}
//         <div className="border-t pt-4 space-y-2 text-sm text-[#6c757d]">
//           <div className="flex justify-between">
//             <span>Course fee (x{participants})</span>
//             <span>${(basePrice * participants).toFixed(2)}</span>
//           </div>

//           {hasMultiplePrices && state.pricing && (
//             <div className="flex justify-between">
//               <span>
//                 Pricing option ({state.pricing.replace("-", " ")}) (x
//                 {participants})
//               </span>
//               <span>${(pricingPrice * participants).toFixed(2)}</span>
//             </div>
//           )}

//           {state.addOns.length > 0 && (
//             <div className="space-y-1">
//               {state.addOns.map((addon) => (
//                 <div key={addon.id} className="flex justify-between">
//                   <span>Add-On: {addon.title}</span>
//                   <span>${addon.price.toFixed(2)}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Total Price */}
//         <div className="border-t pt-4">
//           <div className="flex justify-between text-lg font-semibold text-[#343a40]">
//             <span>Total Paid</span>
//             <span>${totalPrice.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Validation Error */}
//         {validationError && (
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{validationError}</AlertDescription>
//           </Alert>
//         )}

//         {/* API Error */}
//         {createBookingMutation.error && (
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               {createBookingMutation.error.message ||
//                 "Failed to create booking. Please try again."}
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* Proceed Button */}
//         {/* <Button
//           className="w-full bg-[#0694a2] hover:bg-[#0694a2]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
//           onClick={handleProceedToPayment}
//           disabled={
//             createBookingMutation.isPending ||
//             !isAuthenticated
//             ||
//             !isOnFinalStep
//           }
//         >
//           {createBookingMutation.isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Processing...
//             </>
//           ) : !isAuthenticated ? (
//             "Sign In to Proceed"
//           ) : !isOnFinalStep ? (
//             "Complete All Steps First"
//           ) : (
//             "Proceed to Payment"
//           )}
//         </Button> */}

//         {/* What's Included */}
//         {courseData?.courseIncludes?.length ? (
//           <div className="mt-6 text-sm text-[#6c757d]">
//             <h3 className="font-medium mb-3 text-[#343a40]">
//               What&apos;s Included
//             </h3>
//             <ul className="space-y-2">
//               {courseData.courseIncludes.map((item, idx) => (
//                 <li className="flex items-center gap-2" key={idx}>
//                   <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : null}
//       </div>
//     </Card>
//   );
// }
