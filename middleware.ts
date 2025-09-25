import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = req.nextUrl;

  // Public paths that don't require authentication
  const isPublicPath = pathname === "/";
  const isAuthPath = pathname.startsWith("/auth") || pathname === "/login";

  // Check for token error (expired token)
  if (token?.error === "RefreshAccessTokenError") {
    // Redirect to login if token refresh failed
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set("error", "Session expired");
    return NextResponse.redirect(signInUrl);
  }

  // If user is authenticated and tries to access public paths
  if (token && (isPublicPath || isAuthPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is not authenticated and tries to access protected paths
  if (!token && !isPublicPath && !isAuthPath) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account",
    "/courses/book/:id",
    "/trips/book/:id",
    "/messaging",

  ],
};
