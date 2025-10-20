// // utils/booking-mapper.ts

import { BookingState } from "@/components/website/course/booking-context";
import { BookingPayload } from "@/types/course";
// import { number } from "zod";

export const mapBookingStateToPayload = (
  state: BookingState,
): BookingPayload => {
  // Medical history

  // Activity questions
  // const activityQuestions: string[] = [];

  // Course
  const classId = state.course._id || "";
  if (!classId) {
    throw new Error("Course ID is missing in booking state");
  }

  // Pricing logic

  // ✅ Proper pricing calculation
  const coursePrice = Array.isArray(state.course.price)
    ? state.course.price[0]
    : state.course.price || 0;

  const addOnPrice = state.addOns
    ? state.addOns.reduce((sum, addon) => sum + (addon.price || 0), 0)
    : 0;

  const participants = state.participants || 1;

  const totalPrice = coursePrice * participants + addOnPrice;

  // ✅ Dynamically sum selected add-ons
  // const addOnPrice = state.addOns
  //   ? state.addOns.reduce((sum, addon) => sum + (addon.price || 0), 0)
  //   : 0;
  // const participants = state.participants || 1;
  // // const totalPrice = (coursePrice + pricingPrice) * participants + addOnPrice;
  //  const totalPrice =  participants + addOnPrice;

  // Dates
  const classDates: string[] = [];
  if (state.selectedDate) {
    if (Array.isArray(state.selectedDate)) {
      // Multiple ISO strings from calendar
      classDates.push(...state.selectedDate.map((d) => String(d)));
    } else if (state.selectedTime?.iso) {
      classDates.push(state.selectedTime.iso);
    } else {
      classDates.push(String(state.selectedDate));
    }
  }

  // ✅ Return full payload
  // return {
  //   classId,
  //   participant: participants,
  //   classDate: classDates,                     // ✅ now included
  //   // activityLevelSpecificQuestions: activityQuestions,  // ✅ now included
  //   medicalDocuments: state.documents,
  //   price: totalPrice, 

  //   // Personal info
  //   Username: state.personalInfo.username, // ⚡ backend requires capitalized "Username"
  //   email: state.personalInfo.email,
  //   phoneNumber: state.personalInfo.phoneNumber,
  //   emergencyName: state.personalInfo.emergencyName,
  //   emergencyPhoneNumber: state.personalInfo.emergencyPhoneNumber,

  //   gender: state.personalInfo.gender,
  //   shoeSize: state.personalInfo.shoeSize,
  //   hight: state.personalInfo.hight,
  //   weight: state.personalInfo.weight,
  // };

  return {
    classId,
    participant: participants,
    classDate: classDates,
    medicalDocuments: state.documents,

    // Pricing
    price: totalPrice, // backend expects this

    // Personal info
    Username: state.personalInfo.email, // backend expects this
    email: state.personalInfo.email,
    phoneNumber: state.personalInfo.phone,
    emergencyName: state.personalInfo.emergencyName,
    emergencyPhoneNumber: state.personalInfo.emergencyPhoneNumber,

    gender: state.personalInfo.gender,
    shoeSize: Number(state.personalInfo.shoeSize),
    hight: state.personalInfo.hight,
    weight: Number(state.personalInfo.weight),
    scheduleId: state.personalInfo.scheduleId,

    // Add missing properties required by BookingPayload type
    medicalHistory: [], // empty for now
    activityLevelSpecificQuestions: [], // empty for now
  };
};
