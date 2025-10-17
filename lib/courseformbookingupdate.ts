// lib/courseformbookingupdate.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateCourseFormBooking(
  bookingId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: Record<string, any>
) {
  try {
    const response = await axios.patch(
      `${API_URL}/class/bookings/update/medical-documents/${bookingId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
}
