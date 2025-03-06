import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  apiAuthPrefix,
  protectedRoutes
} from "@/routes";
// import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Allow API authentication calls
  if (isApiAuthRoute) return null;

  // Redirect unauthenticated users away from protected routes
  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
