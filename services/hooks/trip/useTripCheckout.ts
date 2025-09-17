import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ParticipantData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

export interface CheckoutRequest {
  participants: ParticipantData[];
  totalParticipants: number;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  data: {
    sessionUrl: string;
    tripBookingId: string;
  };
}

const createCheckoutSession = async (
  tripId: string,
  checkoutData: CheckoutRequest,
  accessToken?: string
): Promise<CheckoutResponse> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await axios.post(
    `${API_URL}/trip/${tripId}/checkout`,
    checkoutData,
    { headers }
  );
  return response.data;
};

export const useTripCheckout = (tripId: string) => {
  const { data: session } = useSession();
  
  return useMutation<CheckoutResponse, Error, CheckoutRequest>({
    mutationFn: (checkoutData: CheckoutRequest) =>
      createCheckoutSession(tripId, checkoutData, session?.accessToken),
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.data.sessionUrl) {
        window.location.href = data.data.sessionUrl;
      }
    },
    onError: (error) => {
      console.error("Checkout error:", error);
      // Handle authentication errors
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error("Authentication required. Please login.");
      }
    },
  });
};