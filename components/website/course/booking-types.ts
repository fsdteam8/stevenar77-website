// context/booking/booking-types.ts

export interface BookingState {
  currentStep: number;
  course: {
    _id: string;
    name: string;
    price: number | number[];
    duration: string;
    age: string;
    image?: string;
    classDates?: string[];
  };
  pricing?: string;
  addOn?: boolean;
  participants: number;
  selectedDate: Date | null;
  selectedTime: {
    label: string;
    iso: string | null;
  } | null;
  addOnSelected: boolean;
  selectedPricing?: string;
  selectedPriceIndex?: number;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    emergencyContact: string;
    courseName: string;
    // gender: "male" || "female";
    shoeSize: number;
    hight: number;
    weight: number;
    gender:  "male" | "female" | "others";
  };
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
  agreed: boolean;
}

export type BookingAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_COURSE"; payload: BookingState["course"] }
  | { type: "SET_PARTICIPANTS"; payload: number }
  | { type: "SET_DATE"; payload: Date }
  | { type: "SET_TIME"; payload: BookingState["selectedTime"] }
  | { type: "SET_PERSONAL_INFO"; payload: Partial<BookingState["personalInfo"]> }
  | { type: "SET_MEDICAL_HISTORY"; payload: Record<string, boolean> }
  | { type: "SET_ACTIVITY_QUESTIONS"; payload: Partial<BookingState["activityQuestions"]> }
  | { type: "SET_LIABILITY_AGREEMENT"; payload: Partial<BookingState["liabilityAgreement"]> }
  | { type: "SET_DOCUMENTS"; payload: File[] }
  | { type: "ADD_DOCUMENT"; payload: File } 
  | { type: "SET_SIGNATURE"; payload: string }
  | { type: "SET_AGREED"; payload: boolean }
  | { type: "SET_PRICING"; payload: string }
  | { type: "SET_ADDON"; payload: boolean }
  | { type: "SET_PRICE_INDEX"; payload: number };
