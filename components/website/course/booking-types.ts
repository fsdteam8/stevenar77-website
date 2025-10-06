

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookingState {
  currentStep: number;
  course: {
    _id: string;
    name: string;
    price: number;
    duration: string;
    age: string;
    image?: string;
    classDates?: string[];
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
    height: string; // Fixed typo from 'hight' to 'height'
    weight: string;
    gender: string;
  };
  documents: any[];
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
  | { type: "SET_DOCUMENTS"; payload: File }
  | { type: "ADD_DOCUMENT"; payload: File }
  | { type: "SET_PRICING"; payload: string | undefined }
  | {
      type: "TOGGLE_ADDON";
      payload: { id: string; title: string; price: number };
    }
  | { type: "SET_PRICE_INDEX"; payload: number };
