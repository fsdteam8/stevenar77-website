// // hooks/api/useCreateBooking.ts
// import { useMutation } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';
// import { courseBookingApi } from '@/lib/coursebookinguser';
// import type { ApiResponse, BookingResponse, BookingPayload } from '@/types/course';

// export const useCreateBooking = () => {
//   const { data: session } = useSession();
  
//   return useMutation({
//     mutationFn: async (payload: BookingPayload) => {
//       // Check if user is authenticated
//       if (!session) {
//         throw new Error('You must be logged in to create a booking');
//       }

//       const formData = new FormData();
      
//       // Add text fields
//       formData.append('classId', payload.classId);
//       formData.append('participant', payload.participant.toString());
//       formData.append('canSwim', payload.canSwim);
//       formData.append('divingExperience', payload.divingExperience);
//       formData.append('lastPhysicalExamination', payload.lastPhysicalExamination);
//       formData.append('fitnessLevel', payload.fitnessLevel);
//       formData.append('price', payload.price.toString());

//       // Add arrays
//       payload.classDate.forEach(date => {
//         formData.append('classDate[]', date);
//       });

//       payload.medicalHistory.forEach(condition => {
//         formData.append('medicalHistory[]', condition);
//       });

//       payload.activityLevelSpecificQuestions.forEach(question => {
//         formData.append('activityLevelSpecificQuestions[]', question);
//       });

//       // Add files
//       payload.medicalDocuments.forEach(file => {
//         formData.append('medicalDocuments', file);
//       });

//       return courseBookingApi.postFormData<ApiResponse<BookingResponse>>('/class/bookings', formData);
//     },
//     onSuccess: (data) => {
//       if (data.success && data.data.sessionUrl) {
//         // Redirect to Stripe checkout
//         window.location.href = data.data.sessionUrl;
//       }
//     },
//     onError: (error) => {
//       console.error('Booking creation failed:', error);
//     },
//   });
// };

// hooks/api/useCreateBooking.ts
import { useMutation } from '@tanstack/react-query';
// import { api } from '@/lib/api';
import { ApiResponse, BookingPayload, BookingResponse } from '@/types/course';
import { api } from '@/lib/coursebookinguser';

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (payload: BookingPayload) => {
      const formData = new FormData();
      
      // Add text fields
      formData.append('classId', payload.classId);
      formData.append('participant', payload.participant.toString());
      formData.append('canSwim', payload.canSwim);
      formData.append('divingExperience', payload.divingExperience);
      formData.append('lastPhysicalExamination', payload.lastPhysicalExamination);
      formData.append('fitnessLevel', payload.fitnessLevel);
      formData.append('price', payload.price.toString());
      // formData.append('classDate', Array(payload.classDate).toString());
      // Add arrays
      payload.classDate.forEach(date => {
        formData.append('classDate', date);
      });
      console.log(payload.classDate);

      payload.medicalHistory.forEach(condition => {
        formData.append('medicalHistory', condition);
      });

      payload.activityLevelSpecificQuestions.forEach(question => {
        formData.append('activityLevelSpecificQuestions', question);
      });

      // Add files
      payload.medicalDocuments.forEach(file => {
        formData.append('medicalDocuments', file);
      });

      return api.postFormData<ApiResponse<BookingResponse>>('/class/bookings', formData);
    },
    onSuccess: (data) => {
      if (data.success && data.data.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = data.data.sessionUrl;
      }
    },
  });
};
