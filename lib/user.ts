const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export interface UserResponse {
  success: boolean;
  data: {
    avatar?: { url?: string };
    email?: string;
    role?: string;
    id?: string;
  };
}

export async function fetchUserById(userId: string): Promise<UserResponse> {
  const res = await fetch(`${baseUrl}/user/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // disable caching (important for avatars)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
