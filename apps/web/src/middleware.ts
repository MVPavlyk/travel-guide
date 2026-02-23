import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/create-post"];
const authOnlyPaths = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    salt: "authjs.session-token",
  });

  const isAuthPage = authOnlyPaths.some((path) => pathname.startsWith(path));
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (isProtected && !token) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-post", "/sign-in", "/sign-up"],
};
