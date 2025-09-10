// types.ts
export interface Course {
  image: string;
  title: string;
  description?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  age: string;
  price: number;
  includes?: string[];
}

export interface BookingData {
  name?: string;
  email?: string;
  phone?: string;
  medicalConditions?: string;
  participants?: number;
  selectedDate?: string;
  selectedTime?: string;
  course?: string;
  totalPrice?: number;
  [key: string]: unknown;
}
