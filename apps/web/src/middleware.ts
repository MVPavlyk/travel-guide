import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfigVercelRuntime } from "~/auth.config.vercel";

const { auth: middleware } = NextAuth(authConfigVercelRuntime);

const protectedPaths = ["/create-post"];
const authOnlyPaths = ["/sign-in", "/sign-up"];

export default middleware((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  const isAuthPage = authOnlyPaths.some((path) => pathname.startsWith(path));
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (isProtected && !isLoggedIn) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/create-post", "/sign-in", "/sign-up"],
};
