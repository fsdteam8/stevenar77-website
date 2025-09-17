"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface BookingState {
  currentStep: number
  course: {
    id: string
    name: string
    price: number | number[] // Updated to support both single and multiple prices
    duration: string
    age: string
  }
  pricing?: string
  addOn?: boolean
  participants: number
  selectedDate: Date | null
  selectedTime: string
  addOnSelected: boolean;
  selectedPricing?: string;
  selectedPriceIndex?: number; // Added for tracking selected price index
  personalInfo: {
    name: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    city: string
    state: string
    postalCode: string
    emergencyContact: string
    courseName: string
  }
  medicalHistory: Record<string, boolean>
  activityQuestions: {
    swimmingLevel: string
    divingExperience: string
    lastPhysicalExam: string
    fitnessLevel: string
    physicalApproval: boolean
    canSwim200m: boolean
    claustrophobia: boolean
    panicAttacks: boolean
  }
  liabilityAgreement: {
    releaseOfLiability: boolean
    medicalFitness: boolean
    equipmentTraining: boolean
  }
  documents: File[]
  signature: string
}

type BookingAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_COURSE"; payload: BookingState["course"] }
  | { type: "SET_PARTICIPANTS"; payload: number }
  | { type: "SET_DATE"; payload: Date }
  | { type: "SET_TIME"; payload: string }
  | { type: "SET_PERSONAL_INFO"; payload: Partial<BookingState["personalInfo"]> }
  | { type: "SET_MEDICAL_HISTORY"; payload: Record<string, boolean> }
  | { type: "SET_ACTIVITY_QUESTIONS"; payload: Partial<BookingState["activityQuestions"]> }
  | { type: "SET_LIABILITY_AGREEMENT"; payload: Partial<BookingState["liabilityAgreement"]> }
  | { type: "SET_DOCUMENTS"; payload: File[] }
  | { type: "SET_SIGNATURE"; payload: string }
  | { type: "SET_PRICING"; payload: string }
  | { type: "SET_ADDON"; payload: boolean }
  | { type: "SET_PRICE_INDEX"; payload: number } // Added action for price index

const initialState: BookingState = {
  currentStep: 0,
  course: {
    id: "open-water-diver",
    name: "Open Water Diver",
    price: 450,
    duration: "3-4 days",
    age: "10+",
  },
  pricing: undefined,
  addOn: false,
  participants: 1,
  selectedDate: null,
  selectedTime: "",
  addOnSelected: false,
  selectedPricing: undefined,
  selectedPriceIndex: 0, // Added with default value
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
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload }
    case "SET_COURSE":
      return { ...state, course: action.payload }
    case "SET_PARTICIPANTS":
      return { ...state, participants: action.payload }
    case "SET_DATE":
      return { ...state, selectedDate: action.payload }
    case "SET_TIME":
      return { ...state, selectedTime: action.payload }
    case "SET_PERSONAL_INFO":
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } }
    case "SET_MEDICAL_HISTORY":
      return { ...state, medicalHistory: action.payload }
    case "SET_ACTIVITY_QUESTIONS":
      return { ...state, activityQuestions: { ...state.activityQuestions, ...action.payload } }
    case "SET_LIABILITY_AGREEMENT":
      return { ...state, liabilityAgreement: { ...state.liabilityAgreement, ...action.payload } }
    case "SET_DOCUMENTS":
      return { ...state, documents: action.payload }
    case "SET_SIGNATURE":
      return { ...state, signature: action.payload }
    case "SET_PRICING":
      return { ...state, pricing: action.payload }
    case "SET_ADDON":
      return { ...state, addOn: action.payload }
    case "SET_PRICE_INDEX": // Added case for price index
      return { ...state, selectedPriceIndex: action.payload }
    default:
      return state
  }
}

const BookingContext = createContext<{
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
} | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}