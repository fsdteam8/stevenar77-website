// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// import { any, number, string } from "zod";

export interface sets {
  date: string;
  location: string;
  type: string;
  isActive: boolean;
}
export interface Schedules {
  set: sets[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookingState {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  submittedForms: any[];
  currentStep: number;
  course: {
    _id: string;
    name: string;
    price: number;
    duration: string;
    age: string;
    image?: string;
    classDates?: string[];
    // classDates?: Schedules[];
    formTitle?: string[];
  };
  pricing: string | undefined;
  addOns: Array<{
    id: string;
    title: string;
    price: number;
  }>;
  participants: number;
  selectedDate: string | null;
  selectedTime: { label: string; iso: string | null };
  addOnSelected: boolean;
  selectedPricing: string | undefined;
  selectedPriceIndex: number;
  personalInfo: {
    [x: string]: any;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    emergencyName: string;
    emergencyPhoneNumber: string;
    courseName: string;
    shoeSize: string;
    hight: number;
    weight: string;
    gender: string;
  };
  documents: any[];
}

export interface FormConfig {
  id: string;
  label: string;
  color: string;
  component: React.ReactNode;
}

export type BookingAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_COURSE"; payload: BookingState["course"] }
  | { type: "SET_PARTICIPANTS"; payload: number }
  | { type: "SET_DATE"; payload: string | null }
  | { type: "SET_TIME"; payload: BookingState["selectedTime"] }
  | {
      type: "SET_PERSONAL_INFO";
      payload: Partial<BookingState["personalInfo"]>;
    }
  | { type: "SET_DOCUMENTS"; payload: { file: File; label: string }[] }
  | { type: "ADD_DOCUMENT"; payload: { file: File; label: string } }
  | { type: "SET_PRICING"; payload: string | undefined }
  | {
      type: "TOGGLE_ADDON";
      payload: { id: string; title: string; price: number };
    }
  | { type: "SET_PRICE_INDEX"; payload: number }
  | { type: "MARK_FORM_SUBMITTED"; payload: any }
  | { type: "RESET_SUBMITTED_FORMS" };
