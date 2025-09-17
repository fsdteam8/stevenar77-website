"use client";

import { fetchUserById, UserResponse } from "@/lib/user";
import { useEffect, useState } from "react";

export function useUser(userId?: string) {
  const [data, setData] = useState<UserResponse["data"] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const getUser = async () => {
      setLoading(true);
      try {
        const res = await fetchUserById(userId);
        if (res.success) {
          setData(res.data);
        } else {
          setData(null);
        }
      } catch (err: any) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

  return { user: data, loading, error };
}
