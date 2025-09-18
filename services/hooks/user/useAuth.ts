// hooks/useAuth.ts
"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: session, status } = useSession();

  const query = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => session,
    enabled: status !== "loading", // don’t run query until NextAuth finishes loading
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  return {
    isAuthenticated: !!query.data,
    isLoading: status === "loading" || query.isLoading,
    session: query.data,
  };
}
