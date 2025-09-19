
// utils/booking-mapper.ts

import { BookingState } from "@/components/website/course/booking-context";
import { BookingPayload } from "@/types/course";


export const mapBookingStateToPayload = (state: BookingState): BookingPayload => {
  // Get selected medical conditions (only true values)
  const medicalHistory = Object.entries(state.medicalHistory)
    .filter(([_, isSelected]) => isSelected)
    .map(([condition, _]) => condition);

  // Get activity questions that are true
  const activityQuestions: string[] = [];


  
  if (state.activityQuestions.physicalApproval) {
    activityQuestions.push('I have physical approval for scuba diving activities');
  }
  if (state.activityQuestions.canSwim200m) {
    activityQuestions.push('I am comfortable in water and can swim at least 200 meters');
  }
  if (state.activityQuestions.claustrophobia) {
    activityQuestions.push('I suffer from claustrophobia');
  }
  if (state.activityQuestions.panicAttacks) {
    activityQuestions.push('I have a history of panic attacks or anxiety disorders');
  }

  const classId = state.course._id || state.course._id || '';
  if (!classId) {
    throw new Error('Course ID is missing in booking state');
  }

  // Calculate total price from BookingSummary logic
  const coursePrice = Array.isArray(state.course.price) ? state.course.price[0] : state.course.price || 0;
  const pricingPrices: Record<string, number> = {
    "3-day": 199,
    "5-day": 399,
  };
  const pricingPrice = state.pricing ? pricingPrices[state.pricing] || 0 : 0;
  const addOnPrice = state.addOn ? 999 : 0;
  const participants = state.participants || 1;
  const totalPrice = (coursePrice + pricingPrice) * participants + addOnPrice;

  // Format dates for API
  const classDates: string[] = [];
  if (state.selectedDate) {
    // Add the selected date with time if available
    const dateTime = state.selectedTime 
      ? `${state.selectedDate.toISOString().split('T')[0]}T${state.selectedTime}:00.000Z`
      : state.selectedDate.toISOString();
    if (state.selectedTime?.iso) {
      classDates.push(state.selectedTime.iso);
    }
  }

  console.log(classDates)

  return {
    classId: state.course._id,
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
  };
};

