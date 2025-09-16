// services/hooks/auth/useChangePassword.ts
import { useMutation } from "@tanstack/react-query";
import { changePassword, ChangePasswordPayload, ChangePasswordResponse } from "@/lib/auth";
import { useSession } from "next-auth/react";

export const useChangePassword = () => {
  const { data: session } = useSession();

  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationFn: async (payload: ChangePasswordPayload) => {
      if (!session?.accessToken) throw new Error("You must be logged in");
      return changePassword(payload, session.accessToken);
    },
  });
};
