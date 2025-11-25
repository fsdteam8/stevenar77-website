export interface ProceedToPaymentData {
  cartsIds: string[];
  totalPrice: number;
  userId: string;
}

// Type definitions
export interface Class {
  title: string;
  image?: { url: string };
}

export interface CartDetails {
  classId?: Class;
  totalPrice: number;
  title?: string;
  images?: { url: string } | { url: string }[];
  price?: number;
}

export interface Participant {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
}

export interface CartItem {
  _id: string;
  details?: CartDetails;
  type?: string;
  price?: number;
  participants?: Participant[];
  quantity?: number;
}

export interface ProceedToPaymentPayload {
  cartsIds: string[];
  totalPrice: number;
  userId: string;
  // Add other fields if necessary
}

export interface TripBookingPayload {
  userId?: string;
  itemId?: string;
  type: "trip";
  price: number;
  participants: Participant[];
}

export interface ProductBookingPayload {
  userId?: string;
  itemId?: string;
  type: "product";
  price: number;
  quantity: number;
  color: string;
  images: string[];
}

export type TripBookingData = TripBookingPayload | ProductBookingPayload;
