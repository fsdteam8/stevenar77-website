// hooks/useProfile.ts
import { useQuery } from "@tanstack/react-query";
import { getMyProfile, UserProfile } from "@/lib/profile";

export const useProfile = () => {
  return useQuery<UserProfile, Error>({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });
};
