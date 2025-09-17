// lib/auth.ts
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: unknown; // can replace 'unknown' with a more specific type if your API returns user info
}

/**
 * Change user password
 * @param payload - Current and new password
 * @param accessToken - JWT access token
 */
export const changePassword = async (
  payload: ChangePasswordPayload,
  accessToken: string
): Promise<ChangePasswordResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // send JWT token
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to change password");
  }

  return res.json();
};
