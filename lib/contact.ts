// lib/contact.ts
import axios from "axios";

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export async function submitContact(
  data: ContactPayload
): Promise<ContactResponse> {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/contact/send-message`,
    data
  );
  return response.data as ContactResponse;
}
