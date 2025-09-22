"use client";

import { useEffect, useState } from "react";

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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true); // make sure loading starts
      try {
        const res = await fetch("/user/my-profile", {
          method: "GET",
          credentials: "include", // important for sending cookies/session
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
  }, []);

  return { user, loading, error };
}
