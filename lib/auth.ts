// lib/auth.ts
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;  
}

export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // include cookies if JWT/session is cookie-based
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to change password");
  }

  return res.json();
};
