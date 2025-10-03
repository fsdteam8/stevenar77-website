
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  postalCode: string;
  image: {
    public_id: string;
    url: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

// export interface BookingPayload {
//   classId: string;
//   participant: number;
//   classDate: string[];
//   medicalHistory: string[];
//   canSwim: string;
//   divingExperience: string;
//   lastPhysicalExamination: string;
//   fitnessLevel: string;
//   activityLevelSpecificQuestions: string[];
//   medicalDocuments: File[];
//   price: number;
//     // Personal info
//   gender: string;
//   shoeSize: number;
//   hight: number;   // or height
//   weight: number;
// }

export interface BookingPayload {
  classId: string;
  participant: number;
  classDate: string[];
  medicalHistory: string[];
  canSwim?: string;
  divingExperience?: string;
  lastPhysicalExamination?: string;
  fitnessLevel?: string;
  activityLevelSpecificQuestions: string[];
  medicalDocuments: File[];
  price: number;

  // Personal info
  Username: string;   // ✅ matches backend case
  email: string;
  phoneNumber?: string;
  emergencyName?: string;
  emergencyPhoneNumber?: string;

  gender: string;
  shoeSize: number;
  hight: number;   // backend typo, keep as-is
  weight: number;
}


export interface BookingResponse {
  bookingId: string;
  sessionUrl: string;
}