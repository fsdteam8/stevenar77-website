// // hooks/api/useUserProfile.ts
// import { useQuery } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';
// import { courseBookingApi, ApiError } from '@/lib/coursebookinguser';
// import type { ApiResponse, UserProfile } from '@/types/course';

// export const useUserProfile = () => {
//   const { data: session, status } = useSession();
  
//   return useQuery({
//     queryKey: ['user-profile', session?.user?.email],
//     queryFn: () => courseBookingApi.get<ApiResponse<UserProfile>>('/user/my-profile'),
//     enabled: status === 'authenticated', // Only run when authenticated
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     retry: (failureCount, error) => {
//       // Don't retry on 401/403 (auth issues)
//       if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
//         return false;
//       }
//       return failureCount < 2;
//     },
//   });
// };


// hooks/api/useUserProfile.ts
import { useQuery } from '@tanstack/react-query';
// import { api } from '@/lib/api';
import { ApiResponse, UserProfile } from '@/types/course';
import { api } from '@/lib/coursebookinguser';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => api.get<ApiResponse<UserProfile>>('/user/my-profile'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};