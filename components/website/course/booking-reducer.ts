// context/booking/booking-reducer.ts
import { BookingState, BookingAction } from "./booking-types";

export function createInitialState(
  initialCourse?: { id: string; name: string; price: number; age: string; image?: string }
): BookingState {
  let courseId = initialCourse?.id || "";

  // fallback: extract from URL if no id passed
  if (!courseId && typeof window !== "undefined") {
    const parts = window.location.pathname.split("/");
    courseId = parts[3] || "";
  }

  return {
    currentStep: 0,
    course: {
      _id: courseId,
      name: initialCourse?.name || "Open Water Diver",
      price: initialCourse?.price ?? 450,
      duration: "3-4 days",
      age: initialCourse?.age || "10+",
      image: initialCourse?.image, // keep image if passed
    },
    pricing: undefined,
    addOn: false,
    participants: 1,
    selectedDate: null,
    selectedTime: { label: "", iso: null },
    addOnSelected: false,
    selectedPricing: undefined,
    selectedPriceIndex: 0,
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      emergencyContact: "",
      courseName: initialCourse?.name || "", // pre-fill courseName if available
    },
    medicalHistory: {},
    activityQuestions: {
      swimmingLevel: "",
      divingExperience: "",
      lastPhysicalExam: "",
      fitnessLevel: "",
      physicalApproval: false,
      canSwim200m: false,
      claustrophobia: false,
      panicAttacks: false,
    },
    liabilityAgreement: {
      releaseOfLiability: false,
      medicalFitness: false,
      equipmentTraining: false,
    },
    documents: [],
    signature: "",
  };
}

export function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_COURSE":
      return { ...state, course: action.payload };
    case "SET_PARTICIPANTS":
      return { ...state, participants: action.payload };
    case "SET_DATE":
      return { ...state, selectedDate: action.payload };
    case "SET_TIME":
      return { ...state, selectedTime: action.payload };
    case "SET_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    case "SET_MEDICAL_HISTORY":
      return { ...state, medicalHistory: action.payload };
    case "SET_ACTIVITY_QUESTIONS":
      return {
        ...state,
        activityQuestions: { ...state.activityQuestions, ...action.payload },
      };
    case "SET_LIABILITY_AGREEMENT":
      return {
        ...state,
        liabilityAgreement: { ...state.liabilityAgreement, ...action.payload },
      };
    case "SET_DOCUMENTS":
      return { ...state, documents: action.payload };
    case "SET_SIGNATURE":
      return { ...state, signature: action.payload };
    case "SET_PRICING":
      return { ...state, pricing: action.payload };
    case "SET_ADDON":
      return { ...state, addOn: action.payload };
    case "SET_PRICE_INDEX":
      return { ...state, selectedPriceIndex: action.payload };
    default:
      return state;
  }
}
