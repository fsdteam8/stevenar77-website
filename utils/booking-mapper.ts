// // utils/booking-mapper.ts
// import type { BookingState } from '@/components/website/course/booking-context';
// import type { BookingPayload } from '@/types/course';

// export const mapBookingStateToPayload = (state: BookingState): BookingPayload => {
//   // Get selected medical conditions (only true values)
//   const medicalHistory = Object.entries(state.medicalHistory)
//     .filter(([_, isSelected]) => isSelected)
//     .map(([condition, _]) => condition);

//   // Add additional medical info if provided
//   if (state.medicalAdditionalInfo?.trim()) {
//     medicalHistory.push(`Additional info: ${state.medicalAdditionalInfo}`);
//   }

//   // Get activity questions that are true
//   const activityQuestions: string[] = [];
  
//   if (state.activityQuestions.physicalApproval) {
//     activityQuestions.push('I have physical approval for scuba diving activities');
//   }
//   if (state.activityQuestions.canSwim200m) {
//     activityQuestions.push('I am comfortable in water and can swim at least 200 meters');
//   }
//   if (state.activityQuestions.claustrophobia) {
//     activityQuestions.push('I suffer from claustrophobia');
//   }
//   if (state.activityQuestions.panicAttacks) {
//     activityQuestions.push('I have a history of panic attacks or anxiety disorders');
//   }

//   // Calculate total price from BookingSummary logic
//   const coursePrice = Array.isArray(state.course.price) ? state.course.price[0] : state.course.price || 0;
//   const pricingPrices: Record<string, number> = {
//     "3-day": 199,
//     "5-day": 399,
//   };
//   const pricingPrice = state.pricing ? pricingPrices[state.pricing] || 0 : 0;
//   const addOnPrice = state.addOn ? 999 : 0;
//   const participants = state.participants || 1;
//   const totalPrice = (coursePrice + pricingPrice) * participants + addOnPrice;

//   // Format dates for API
//   const classDates: string[] = [];
//   if (state.selectedDate) {
//     // Add the selected date with time if available
//     const dateTime = state.selectedTime 
//       ? `${state.selectedDate.toISOString().split('T')[0]}T${state.selectedTime}:00.000Z`
//       : state.selectedDate.toISOString();
//     classDates.push(dateTime);
//   }

//   return {
//     classId: state.course.id,
//     participant: participants,
//     classDate: classDates,
//     medicalHistory,
//     canSwim: state.activityQuestions.swimmingLevel,
//     divingExperience: state.activityQuestions.divingExperience,
//     lastPhysicalExamination: state.activityQuestions.lastPhysicalExam,
//     fitnessLevel: state.activityQuestions.fitnessLevel,
//     activityLevelSpecificQuestions: activityQuestions,
//     medicalDocuments: state.documents,
//     price: totalPrice,
//   };
// };

// utils/booking-mapper.ts
import type { BookingState } from "@/components/website/course/booking-context";

export const mapBookingStateToFormData = (state: BookingState): FormData => {
  const formData = new FormData();

  // --- Basic course info ---
  formData.append("classId", state.course.id);
  formData.append("participant", String(state.participants || 1));

  // --- Dates ---
  if (state.selectedDate) {
    const dateTime = state.selectedTime
      ? `${state.selectedDate.toISOString().split("T")[0]}T${state.selectedTime}:00.000Z`
      : state.selectedDate.toISOString();
    formData.append("classDate[]", dateTime);
  }

  // --- Personal info ---
  if (state.personalInfo) {
    Object.entries(state.personalInfo).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
  }

  // --- Medical history ---
  Object.entries(state.medicalHistory)
    .filter(([_, selected]) => selected)
    .forEach(([condition]) => {
      formData.append("medicalHistory[]", condition);
    });

  // --- Medical documents ---
  if (state.documents?.length) {
    state.documents.forEach((file) => {
      formData.append("medicalDocuments", file);
    });
  }

  // --- Activity questions ---
  const { activityQuestions } = state;
  if (activityQuestions.swimmingLevel) {
    formData.append("canSwim", activityQuestions.swimmingLevel);
  }
  if (activityQuestions.divingExperience) {
    formData.append("divingExperience", activityQuestions.divingExperience);
  }
  if (activityQuestions.fitnessLevel) {
    formData.append("fitnessLevel", activityQuestions.fitnessLevel);
  }
  if (activityQuestions.lastPhysicalExam) {
    formData.append("lastPhysicalExamination", activityQuestions.lastPhysicalExam);
  }

  if (activityQuestions.physicalApproval) {
    formData.append("activityLevelSpecificQuestions[]", "I have physical approval for scuba diving activities");
  }
  if (activityQuestions.canSwim200m) {
    formData.append("activityLevelSpecificQuestions[]", "I am comfortable in water and can swim at least 200 meters");
  }
  if (activityQuestions.claustrophobia) {
    formData.append("activityLevelSpecificQuestions[]", "I suffer from claustrophobia");
  }
  if (activityQuestions.panicAttacks) {
    formData.append("activityLevelSpecificQuestions[]", "I have a history of panic attacks or anxiety disorders");
  }

  // --- Liability agreement ---
  if (state.liabilityAgreement) {
    Object.entries(state.liabilityAgreement).forEach(([key, value]) => {
      formData.append(`liabilityAgreement[${key}]`, String(value));
    });
  }

  // --- Signature ---
  if (state.signature) {
    formData.append("signature", state.signature);
  }

  // --- Pricing logic ---
  const baseCoursePrice = Array.isArray(state.course.price)
    ? state.course.price[0]
    : state.course.price || 0;

  const pricingPrices: Record<string, number> = {
    "3-day": 199,
    "5-day": 399,
  };
  const pricingPrice = state.pricing ? pricingPrices[state.pricing] || 0 : 0;
  const addOnPrice = state.addOn ? 999 : 0;
  const participants = state.participants || 1;
  const totalPrice =
    (baseCoursePrice + pricingPrice) * participants + addOnPrice;

  formData.append("price", String(totalPrice));

  console.log("Mapped FormData:", Array.from(formData.entries()));
  return formData;
};

export { mapBookingStateToFormData as mapBookingStateToPayload };

