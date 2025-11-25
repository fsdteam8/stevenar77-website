"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  emergencyContact: string;
  courseName: string;
}

interface Course {
  id: string;
  name: string;
  price: number;
  duration: string;
  age: string;
  maximumCapacity?: number;
}

interface BookingState {
  currentStep: number;
  tripId: string;
  course: Course;
  participants: number;
  selectedDate: Date | null;
  selectedTime: string;
  personalInfo: PersonalInfo;
  medicalHistory: Record<string, boolean>;
  activityQuestions: {
    swimmingLevel: string;
    divingExperience: string;
    lastPhysicalExam: string;
    fitnessLevel: string;
    physicalApproval: boolean;
    canSwim200m: boolean;
    claustrophobia: boolean;
    panicAttacks: boolean;
  };
  liabilityAgreement: {
    releaseOfLiability: boolean;
    medicalFitness: boolean;
    equipmentTraining: boolean;
  };
  documents: File[];
  signature: string;
}

type BookingAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_TRIP_ID"; payload: string }
  | { type: "SET_COURSE"; payload: Course }
  | { type: "SET_PARTICIPANTS"; payload: number }
  | { type: "SET_DATE"; payload: Date }
  | { type: "SET_TIME"; payload: string }
  | { type: "SET_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "SET_MEDICAL_HISTORY"; payload: Record<string, boolean> }
  | {
      type: "SET_ACTIVITY_QUESTIONS";
      payload: Partial<BookingState["activityQuestions"]>;
    }
  | {
      type: "SET_LIABILITY_AGREEMENT";
      payload: Partial<BookingState["liabilityAgreement"]>;
    }
  | { type: "SET_DOCUMENTS"; payload: File[] }
  | { type: "SET_SIGNATURE"; payload: string };

const initialState: BookingState = {
  currentStep: 0,
  tripId: "",
  course: {
    id: "",
    name: "Open Water Diver Trip",
    price: 299,
    duration: "3-4 days",
    age: "10+",
    maximumCapacity: 50,
  },
  participants: 1,
  selectedDate: null,
  selectedTime: "",
  personalInfo: {
    name: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    emergencyContact: "",
    courseName: "",
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

function bookingReducer(
  state: BookingState,
  action: BookingAction,
): BookingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_TRIP_ID":
      return { ...state, tripId: action.payload };
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
    default:
      return state;
  }
}

interface BookingContextType {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
}

const TripBookingContext = createContext<BookingContextType | undefined>(
  undefined,
);

export function TripBookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <TripBookingContext.Provider value={{ state, dispatch }}>
      {children}
    </TripBookingContext.Provider>
  );
}

export function useTripBooking() {
  const context = useContext(TripBookingContext);
  if (context === undefined) {
    throw new Error("useTripBooking must be used within a TripBookingProvider");
  }
  return context;
}
