// export interface UserProfile {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   isVerified: boolean;
//   createdAt: string;
//   updatedAt: string;
//   phone: string;
//   dateOfBirth: string;
//   location: string;
//   postalCode: string;
//   image: {
//     public_id: string;
//     url: string;
//   };
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   statusCode: number;
//   data: T;
// }

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
// }

// export interface BookingResponse {
//   bookingId: string;
//   sessionUrl: string;
// }

// export interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   price: number | number[];
//   duration: string;
//   age: string;
//   image?: {
//     public_id: string;
//     url: string;
//   };
//   courseIncludes?: string[];
//   avgRating?: number;
//   totalReviews?: number;
//   totalParticipates?: number;
// }

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

export interface BookingPayload {
  classId: string;
  participant: number;
  classDate: string[];
  medicalHistory: string[];
  canSwim: string;
  divingExperience: string;
  lastPhysicalExamination: string;
  fitnessLevel: string;
  activityLevelSpecificQuestions: string[];
  medicalDocuments: File[];
  price: number;
    // Personal info
  gender: string;
  shoeSize: string;
  hight: string;   // or height
  weight: string;
}

export interface BookingResponse {
  bookingId: string;
  sessionUrl: string;
}