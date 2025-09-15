// services/hooks/auth/useChangePassword.ts
import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "@/lib/auth";

export const useChangePassword = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationFn: changePassword,
  });
};
