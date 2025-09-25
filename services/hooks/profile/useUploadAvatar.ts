// hooks/useUploadAvatar.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar, UserProfile } from "@/lib/profile";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, Error, File>({
    mutationFn: uploadAvatar,
    onSuccess: (data) => {
      // Update the cached profile after successful avatar upload
      queryClient.setQueryData(["my-profile"], data);
    },
  });
};
