import { useSession as useNextAuthSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export const useSession = () => {
  const { data: session, status, update } = useNextAuthSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      // If we have a refresh token error, sign out and redirect to login
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);

  return { session, status, update };
};
