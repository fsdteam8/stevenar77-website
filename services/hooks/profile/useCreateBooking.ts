// hooks/api/useCreateBooking.ts
import { useMutation } from "@tanstack/react-query";
// import { api } from '@/lib/api';
import { ApiResponse, BookingPayload, BookingResponse } from "@/types/course";
import { api } from "@/lib/coursebookinguser";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (payload: BookingPayload) => {
      const formData = new FormData();

      // Add text fields
      formData.append("classId", payload.classId);
      formData.append("participant", payload.participant.toString());
      // formData.append("canSwim", payload.canSwim);
      // formData.append("divingExperience", payload.divingExperience);
      // formData.append(
      //   "lastPhysicalExamination",
      //   payload.lastPhysicalExamination,
      // );
      // formData.append("fitnessLevel", payload.fitnessLevel);
      formData.append("price", payload.price.toString());
      // formData.append('classDate', Array(payload.classDate).toString());
      // Add arrays
      payload.classDate.forEach((date) => {
        formData.append("classDate[]", date);
      });
 


      // ===== Personal Info (new) =====
      formData.append("Username", payload.Username); // ⚡ capitalized as backend requires
      formData.append("email", payload.email);
      if (payload.phoneNumber) formData.append("phoneNumber", payload.phoneNumber);
      if (payload.emergencyName) formData.append("emergencyName", payload.emergencyName);
      if (payload.emergencyPhoneNumber) {
        formData.append("emergencyPhoneNumber", payload.emergencyPhoneNumber);
      }


      formData.append("gender", payload.gender);
      formData.append("shoeSize", payload.shoeSize.toString());
      formData.append("hight", payload.hight.toString()); // ⚠️ confirm backend spelling
      formData.append("weight", payload.weight.toString());
      formData.append("scheduleId", payload.scheduleId.toString());

      // payload.classDate.forEach(date => {

      //   let arraydate  = [];
      //   arraydate.push(date);
      // });
      // console.log("this is thed classdate",payload.classDate);

      // payload.medicalHistory.forEach((condition) => {
      //   formData.append("medicalHistory", condition);
      // });

      // payload.activityLevelSpecificQuestions.forEach((question) => {
      //   formData.append("activityLevelSpecificQuestions", question);
      // });

      // Add files
      payload.medicalDocuments.forEach((file) => {
        formData.append("medicalDocuments", file);
      });

      return api.postFormData<ApiResponse<BookingResponse>>(
        "/class/bookings",
        formData,
      );
    },
    onSuccess: (data) => {
      if (data.success && data.data.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = data.data.sessionUrl;
      }
    },
  });
};
