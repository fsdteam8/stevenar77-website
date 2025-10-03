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
    // includes?:string[];
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    username: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    emergencyName: string;
    emergencyPhoneNumber: string;
    courseName: string;
    shoeSize: number;
    hight: number;
    weight: number;
    gender: string;
  };
  // medicalHistory: Record<string, any>;
  // activityQuestions: {
  //   swimmingLevel: string;
  //   divingExperience: string;
  //   lastPhysicalExam: string;
  //   fitnessLevel: string;
  //   physicalApproval: boolean;
  //   canSwim200m: boolean;
  //   claustrophobia: boolean;
  //   panicAttacks: boolean;
  // };
  // liabilityAgreement: {
  //   releaseOfLiability: boolean;
  //   medicalFitness: boolean;
  //   equipmentTraining: boolean;
  // };
  documents: any[];
  // signature: string;
  // agreed: boolean;
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
  // | { type: "SET_MEDICAL_HISTORY"; payload: Record<string, any> }
  // | {
  //     type: "SET_ACTIVITY_QUESTIONS";
  //     payload: Partial<BookingState["activityQuestions"]>;
  //   }
  // | {
  //     type: "SET_LIABILITY_AGREEMENT";
  //     payload: Partial<BookingState["liabilityAgreement"]>;
  // }
  | { type: "SET_DOCUMENTS"; payload: File }
  | { type: "ADD_DOCUMENT"; payload: File }
  // | { type: "OTHER_ACTION"; payload: any }
  // | { type: "SET_SIGNATURE"; payload: string }
  // | { type: "SET_AGREED"; payload: boolean }
  | { type: "SET_PRICING"; payload: string | undefined }
  | {
      type: "TOGGLE_ADDON";
      payload: { id: string; title: string; price: number };
    }
  | { type: "SET_PRICE_INDEX"; payload: number };
