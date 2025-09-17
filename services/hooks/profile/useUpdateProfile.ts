// services/hooks/profile/useUpdateProfile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, UpdateProfilePayload, UserProfile } from "@/lib/profile";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, Error, UpdateProfilePayload>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["my-profile"], data);
    },
  });
};
