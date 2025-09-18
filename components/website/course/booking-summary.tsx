// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useBooking } from "./booking-context";
// import { format } from "date-fns";
// import Image from "next/image";

// export function BookingSummary() {
//   const { state } = useBooking();

//   const formatDate = (date: Date | null) => {
//     if (!date) return "Not selected";
//     return format(date, "EEEE, MMMM dd");
//   };

//   // Check if course has multiple prices (only addition to your original code)
//   const coursePrice = state.course.price;
//   const hasMultiplePrices = Array.isArray(coursePrice) && coursePrice.length > 1;

//   // Map of pricing options to their prices
//   const pricingPrices: Record<string, number> = {
//     "3-day": 199,
//     "5-day": 399,
//   };

//   // Base course price (ensuring it's a number even if course.price is an array)
//   const basePrice = Array.isArray(state.course.price) ? state.course.price[0] : state.course.price || 0;

//   // Price for selected pricing option (your original logic)
//   const pricingPrice = state.pricing ? pricingPrices[state.pricing] || 0 : 0;

//   // Add-on price - Fixed: using state.addOn instead of state.addOnSelected (your original logic)
//   const addOnPrice = state.addOn ? 999 : 0;

//   // Number of participants (your original logic)
//   const participants = state.participants || 1;

//   console.log("Booking state:", state);

//   console.log({
//     addOn: state.addOn, // Fixed: using state.addOn
//     participants: state.participants,
//     coursePrice: state.course.price,
//     hasMultiplePrices, // Added for debugging
//   });

//   // Calculate total price (your original logic)
//   // Add base price + pricing option price, multiply by participants, then add add-on price (not multiplied)
//   const totalPrice = (basePrice + pricingPrice) * participants + addOnPrice;

//   return (
//     <Card className="p-6 sticky top-4">
//       <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
//         Booking Summary
//       </h2>

//       <div className="space-y-4">
//         {/* Course Info */}
//         <div className="flex items-center gap-3">
//           <Image
//             src="/scuba-diving-course-thumbnail.jpg"
//             alt="Course thumbnail"
//             width={64}
//             height={48}
//             className="rounded object-cover"
//           />
//           <div>
//             <h3 className="font-medium text-[#343a40]">{state.course.name}</h3>
//             <p className="text-sm text-[#6c757d]">Age: {state.course.age}</p>
//           </div>
//         </div>

//         {/* Date & Time */}
//         <div className="space-y-2 text-sm text-[#6c757d]">
//           <div className="flex items-center gap-2">
//             <span>📅</span>
//             <span>{formatDate(state.selectedDate)}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span>⏰</span>
//             <span>{state.selectedTime || "Not selected"}</span>
//           </div>
//         </div>

//         {/* Price Breakdown */}
//         <div className="border-t pt-4 space-y-2 text-sm text-[#6c757d]">
//           <div className="flex justify-between">
//             <span>Course fee (x{participants})</span>
//             <span>${(basePrice * participants).toFixed(2)}</span>
//           </div>

//           {/* Only show this line if course has multiple prices AND pricing is selected */}
//           {hasMultiplePrices && state.pricing && (
//             <div className="flex justify-between">
//               <span>
//                 Pricing option ({state.pricing.replace("-", " ")}) (x
//                 {participants})
//               </span>
//               <span>${(pricingPrice * participants).toFixed(2)}</span>
//             </div>
//           )}

//           {state.addOn && (
//             <div className="flex justify-between">
//               <span>Add-On: Catalina Weekend</span>
//               <span>${addOnPrice.toFixed(2)}</span>
//             </div>
//           )}

//           <div className="flex justify-between">
//             <span>Equipment rental</span>
//             <span>Included</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Digital certification</span>
//             <span>Included</span>
//           </div>
//         </div>

//         {/* Total */}
//         <div className="border-t pt-4">
//           <div className="flex justify-between text-lg font-semibold text-[#343a40]">
//             <span>Total</span>
//             <span>${totalPrice.toFixed(2)}</span>
//           </div>
//           <p className="text-xs text-[#6c757d] mt-1">100% Safe & Secure</p>
//           <p className="text-xs text-[#6c757d]">Free Cancellation up to 24h</p>
//         </div>

//         {/* Proceed Button */}
//         <Button className="w-full bg-[#0694a2] hover:bg-[#0694a2]/90 text-white">
//           Proceed to Payment
//         </Button>

//         {/* What's Included */}
//         <div className="mt-6 text-sm text-[#6c757d]">
//           <h3 className="font-medium mb-3 text-[#343a40]">
//             What&apos;s Included
//           </h3>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
//               Theory sessions
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
//               Pool training
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>4 open
//               water dives
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
//               Digital certification
//             </li>
//           </ul>
//         </div>
//       </div>
//     </Card>
//   );
// }


"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "./booking-context";
import { format } from "date-fns";
import Image from "next/image";
import { mapBookingStateToPayload } from "@/utils/booking-mapper";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCreateBooking } from "@/services/hooks/profile/useCreateBooking";

export function BookingSummary() {
  const { state } = useBooking();
  const { data: session, status } = useSession();
  const createBookingMutation = useCreateBooking();
  const [validationError, setValidationError] = useState("");

  const formatDate = (date: Date | null) => {
    if (!date) return "Not selected";
    return format(date, "EEEE, MMMM dd");
  };

  // Check if course has multiple prices
  const coursePrice = state.course.price;
  const hasMultiplePrices =
    Array.isArray(coursePrice) && coursePrice.length > 1;

  // Map of pricing options to their prices
  const pricingPrices: Record<string, number> = {
    "3-day": 199,
    "5-day": 399,
  };

  // Base course price
  const basePrice = Array.isArray(state.course.price)
    ? state.course.price[0]
    : state.course.price || 0;
  const pricingPrice = state.pricing ? pricingPrices[state.pricing] || 0 : 0;
  const addOnPrice = state.addOn ? 999 : 0;
  const participants = state.participants || 1;
  const totalPrice = (basePrice + pricingPrice) * participants + addOnPrice;

  // Enhanced validation function
  const validateBooking = (): boolean => {
    setValidationError("");

    // Check authentication
    if (status !== "authenticated") {
      setValidationError("Please sign in to proceed with booking.");
      return false;
    }

    // Check if all liability agreement checkboxes are checked
    const { releaseOfLiability, medicalFitness, equipmentTraining } =
      state.liabilityAgreement;
    if (!releaseOfLiability || !medicalFitness || !equipmentTraining) {
      setValidationError(
        "Please accept all liability agreement terms before proceeding.",
      );
      return false;
    }

    // Check if electronic signature is provided
    if (!state.signature.trim()) {
      setValidationError(
        "Please provide your electronic signature before proceeding.",
      );
      return false;
    }

    // Check required personal information
    if (!state.personalInfo.name.trim() || !state.personalInfo.email.trim()) {
      setValidationError(
        "Please fill in all required personal information (Name and Email).",
      );
      return false;
    }

    // Check if date and time are selected
    if (!state.selectedDate) {
      setValidationError("Please select a class date before proceeding.");
      return false;
    }

    // Check if required activity questions are answered
    if (!state.activityQuestions.swimmingLevel) {
      setValidationError(
        "Please answer all activity questions (Swimming level is required).",
      );
      return false;
    }

    if (!state.activityQuestions.divingExperience) {
      setValidationError(
        "Please answer all activity questions (Diving experience is required).",
      );
      return false;
    }

    if (!state.activityQuestions.fitnessLevel) {
      setValidationError(
        "Please answer all activity questions (Fitness level is required).",
      );
      return false;
    }

    return true;
  };

  const handleProceedToPayment = async () => {
    if (!validateBooking()) {
      return;
    }

    try {
      const bookingPayload = mapBookingStateToPayload(state);
      console.log("Booking payload:", bookingPayload);
      await createBookingMutation.mutateAsync(bookingPayload);
      // Redirect happens automatically in the mutation's onSuccess callback
    } catch (error) {
      console.error("Booking failed:", error);
      setValidationError("Failed to create booking. Please try again.");
    }
  };

  const handleSignIn = () => {
    signIn();
  };

  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Booking Summary
      </h2>

      <div className="space-y-4">
        {/* Course Info */}
        <div className="flex items-center gap-3">
          <Image
            src="/scuba-diving-course-thumbnail.jpg"
            alt="Course thumbnail"
            width={64}
            height={48}
            className="rounded object-cover"
          />
          <div>
            <h3 className="font-medium text-[#343a40]">{state.course.name}</h3>
            <p className="text-sm text-[#6c757d]">Age: {state.course.age}</p>
          </div>
        </div>

        {/* Authentication Status */}
        {status === "unauthenticated" && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Sign in required for booking</span>
              <Button size="sm" onClick={handleSignIn} variant="outline">
                Sign In
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Date & Time */}
        <div className="space-y-2 text-sm text-[#6c757d]">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{formatDate(state.selectedDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⏰</span>
            <span>{state.selectedTime || "Not selected"}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 space-y-2 text-sm text-[#6c757d]">
          <div className="flex justify-between">
            <span>Course fee (x{participants})</span>
            <span>${(basePrice * participants).toFixed(2)}</span>
          </div>

          {hasMultiplePrices && state.pricing && (
            <div className="flex justify-between">
              <span>
                Pricing option ({state.pricing.replace("-", " ")}) (x
                {participants})
              </span>
              <span>${(pricingPrice * participants).toFixed(2)}</span>
            </div>
          )}

          {state.addOn && (
            <div className="flex justify-between">
              <span>Add-On: Catalina Weekend</span>
              <span>${addOnPrice.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Equipment rental</span>
            <span>Included</span>
          </div>
          <div className="flex justify-between">
            <span>Digital certification</span>
            <span>Included</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold text-[#343a40]">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-xs text-[#6c757d] mt-1">100% Safe & Secure</p>
          <p className="text-xs text-[#6c757d]">Free Cancellation up to 24h</p>
        </div>

        {/* Validation Error */}
        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        {/* API Error */}
        {createBookingMutation.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {createBookingMutation.error.message ||
                "Failed to create booking. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        {/* Proceed Button */}
        <Button
          className="w-full bg-[#0694a2] hover:bg-[#0694a2]/90 text-white"
          onClick={handleProceedToPayment}
          disabled={
            createBookingMutation.isPending || status !== "authenticated"
          }
        >
          {createBookingMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : status !== "authenticated" ? (
            "Sign In to Proceed"
          ) : (
            "Proceed to Payment"
          )}
        </Button>

        {/* What's Included */}
        <div className="mt-6 text-sm text-[#6c757d]">
          <h3 className="font-medium mb-3 text-[#343a40]">
            What&apos;s Included
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Theory sessions
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Pool training
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>4 open
              water dives
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
              Digital certification
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}


// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useBooking } from "./booking-context";
// import { format } from "date-fns";
// import Image from "next/image";
// import { mapBookingStateToPayload } from "@/utils/booking-mapper";
// import { useSession, signIn } from "next-auth/react";
// import { useState } from "react";
// import { Loader2, AlertCircle } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useCreateBooking } from "@/services/hooks/profile/useCreateBooking";

// export function BookingSummary() {
//   const { state } = useBooking();
//   const { data: session, status } = useSession();
//   const createBookingMutation = useCreateBooking();
//   const [validationError, setValidationError] = useState("");

//   const formatDate = (date: Date | null) => {
//     if (!date) return "Not selected";
//     return format(date, "EEEE, MMMM dd");
//   };

//   // Check if course has multiple prices
//   const coursePrice = state.course.price;
//   const hasMultiplePrices =
//     Array.isArray(coursePrice) && coursePrice.length > 1;

//   // Map of pricing options to their prices
//   const pricingPrices: Record<string, number> = {
//     "3-day": 199,
//     "5-day": 399,
//   };

//   // Base course price
//   const basePrice = Array.isArray(state.course.price)
//     ? state.course.price[0]
//     : state.course.price || 0;
//   const pricingPrice = state.pricing ? pricingPrices[state.pricing] || 0 : 0;
//   const addOnPrice = state.addOn ? 999 : 0;
//   const participants = state.participants || 1;
//   const totalPrice = (basePrice + pricingPrice) * participants + addOnPrice;

//   // Enhanced validation function
//   const validateBooking = (): boolean => {
//     setValidationError("");

//     // Check authentication
//     if (status !== "authenticated") {
//       setValidationError("Please sign in to proceed with booking.");
//       return false;
//     }

//     // Check if all liability agreement checkboxes are checked
//     const { releaseOfLiability, medicalFitness, equipmentTraining } =
//       state.liabilityAgreement;
//     if (!releaseOfLiability || !medicalFitness || !equipmentTraining) {
//       setValidationError(
//         "Please accept all liability agreement terms before proceeding.",
//       );
//       return false;
//     }

//     // Check if electronic signature is provided
//     if (!state.signature.trim()) {
//       setValidationError(
//         "Please provide your electronic signature before proceeding.",
//       );
//       return false;
//     }

//     // Removed electronic agreement check as the property does not exist on BookingState.

//     // Check required personal information
//     if (!state.personalInfo.name.trim() || !state.personalInfo.email.trim()) {
//       setValidationError(
//         "Please fill in all required personal information (Name and Email).",
//       );
//       return false;
//     }

//     // Check if date and time are selected
//     if (!state.selectedDate) {
//       setValidationError("Please select a class date before proceeding.");
//       return false;
//     }

//     // Check if required activity questions are answered
//     if (!state.activityQuestions.swimmingLevel) {
//       setValidationError(
//         "Please answer all activity questions (Swimming level is required).",
//       );
//       return false;
//     }

//     if (!state.activityQuestions.divingExperience) {
//       setValidationError(
//         "Please answer all activity questions (Diving experience is required).",
//       );
//       return false;
//     }

//     if (!state.activityQuestions.fitnessLevel) {
//       setValidationError(
//         "Please answer all activity questions (Fitness level is required).",
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleProceedToPayment = async () => {
//     if (!validateBooking()) {
//       return;
//     }

//     try {
//       const bookingPayload = mapBookingStateToPayload(state);
//       const bookingPayloadObj = Object.fromEntries(
//         bookingPayload.entries(),
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       ) as any; // Convert FormData to a plain object for logging
//       await createBookingMutation.mutateAsync(bookingPayloadObj);
//       // Redirect happens automatically in the mutation's onSuccess callback
//     } catch (error) {
//       console.error("Booking failed:", error);
//       setValidationError("Failed to create booking. Please try again.");
//     }
//   };

//   const handleSignIn = () => {
//     signIn();
//   };

//   return (
//     <Card className="p-6 sticky top-4">
//       <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
//         Booking Summary
//       </h2>

//       <div className="space-y-4">
//         {/* Course Info */}
//         <div className="flex items-center gap-3">
//           <Image
//             src="/scuba-diving-course-thumbnail.jpg"
//             alt="Course thumbnail"
//             width={64}
//             height={48}
//             className="rounded object-cover"
//           />
//           <div>
//             <h3 className="font-medium text-[#343a40]">{state.course.name}</h3>
//             <p className="text-sm text-[#6c757d]">Age: {state.course.age}</p>
//           </div>
//         </div>

//         {/* Authentication Status */}
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

//         {/* Date & Time */}
//         <div className="space-y-2 text-sm text-[#6c757d]">
//           <div className="flex items-center gap-2">
//             <span>📅</span>
//             <span>{formatDate(state.selectedDate)}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span>⏰</span>
//             <span>{state.selectedTime || "Not selected"}</span>
//           </div>
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

//           {state.addOn && (
//             <div className="flex justify-between">
//               <span>Add-On: Catalina Weekend</span>
//               <span>${addOnPrice.toFixed(2)}</span>
//             </div>
//           )}

//           <div className="flex justify-between">
//             <span>Equipment rental</span>
//             <span>Included</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Digital certification</span>
//             <span>Included</span>
//           </div>
//         </div>

//         {/* Total */}
//         <div className="border-t pt-4">
//           <div className="flex justify-between text-lg font-semibold text-[#343a40]">
//             <span>Total</span>
//             <span>${totalPrice.toFixed(2)}</span>
//           </div>
//           <p className="text-xs text-[#6c757d] mt-1">100% Safe & Secure</p>
//           <p className="text-xs text-[#6c757d]">Free Cancellation up to 24h</p>
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
//         <Button
//           className="w-full bg-[#0694a2] hover:bg-[#0694a2]/90 text-white"
//           onClick={handleProceedToPayment}
//           disabled={
//             createBookingMutation.isPending || status !== "authenticated"
//           }
//         >
//           {createBookingMutation.isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Processing...
//             </>
//           ) : status !== "authenticated" ? (
//             "Sign In to Proceed"
//           ) : (
//             "Proceed to Payment"
//           )}
//         </Button>

//         {/* What's Included */}
//         <div className="mt-6 text-sm text-[#6c757d]">
//           <h3 className="font-medium mb-3 text-[#343a40]">
//             What&apos;s Included
//           </h3>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
//               Theory sessions
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
//               Pool training
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>4 open
//               water dives
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-2 h-2 bg-[#0694a2] rounded-full"></span>
//               Digital certification
//             </li>
//           </ul>
//         </div>
//       </div>
//     </Card>
//   );
// }
