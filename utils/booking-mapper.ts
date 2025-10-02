// utils/booking-mapper.ts

import { BookingState } from "@/components/website/course/booking-context";
import { BookingPayload } from "@/types/course";

export const mapBookingStateToPayload = (
  state: BookingState,
): BookingPayload => {
  // Medical history
  const medicalHistory = Object.entries(state.medicalHistory)
    .filter(([_, isSelected]) => isSelected)
    .map(([condition]) => condition);

  // Activity questions
  const activityQuestions: string[] = [];
  if (state.activityQuestions.physicalApproval) {
    activityQuestions.push(
      "I have physical approval for scuba diving activities",
    );
  }
  if (state.activityQuestions.canSwim200m) {
    activityQuestions.push(
      "I am comfortable in water and can swim at least 200 meters",
    );
  }
  if (state.activityQuestions.claustrophobia) {
    activityQuestions.push("I suffer from claustrophobia");
  }
  if (state.activityQuestions.panicAttacks) {
    activityQuestions.push(
      "I have a history of panic attacks or anxiety disorders",
    );
  }

  // Course
  const classId = state.course._id || "";
  if (!classId) {
    throw new Error("Course ID is missing in booking state");
  }

  // Pricing logic
  const coursePrice = Array.isArray(state.course.price)
    ? state.course.price[0]
    : state.course.price || 0;
  const pricingPrices: Record<string, number> = {
    "3-day": 199,
    "5-day": 399,
  };
  const pricingPrice = state.pricing ? pricingPrices[state.pricing] || 0 : 0;
  const addOnPrice = state.addOn ? 999 : 0;
  const participants = state.participants || 1;
  const totalPrice = (coursePrice + pricingPrice) * participants + addOnPrice;

  // Dates
  const classDates: string[] = [];
  if (state.selectedDate) {
    if (state.selectedTime?.iso) {
      classDates.push(state.selectedTime.iso);
    } else {
      classDates.push(state.selectedDate.toISOString());
    }
  }

  // 🔑 Return full payload with personal info included
  return {
    classId,
    participant: participants,
    classDate: classDates,
    medicalHistory,
    canSwim: state.activityQuestions.swimmingLevel,
    divingExperience: state.activityQuestions.divingExperience,
    lastPhysicalExamination: state.activityQuestions.lastPhysicalExam,
    fitnessLevel: state.activityQuestions.fitnessLevel,
    activityLevelSpecificQuestions: activityQuestions,
    medicalDocuments: state.documents,
    price: totalPrice,

    // Only the fields defined in BookingPayload
    gender: state.personalInfo.gender,
    shoeSize: state.personalInfo.shoeSize,
    hight: state.personalInfo.hight,
    weight: state.personalInfo.weight,
  };
};
