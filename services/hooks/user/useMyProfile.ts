"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image?: {
    public_id: string;
    url: string;
  };
}

export function useMyProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      if (!session?.accessToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/my-profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          setUser(data.data);
        } else {
          setUser(null);
          setError(new Error(data.message || "Failed to fetch user"));
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session?.accessToken]);

  return { user, loading, error };
}
