"use client";

import Link from "next/link";

import { SignOutButton } from "~/_components/modules/auth/SignOutButton";

type Session = { user?: { name?: string | null } | null } | null;

export function HomeAuthBlock({ session }: { session: Session }) {
  if (session?.user) {
    return (
      <>
        <p className="text-center text-2xl text-white">
          Logged in as {session.user?.name}
        </p>
        <SignOutButton className="rounded-full bg-white/10 px-10 py-3 font-semibold hover:bg-white/20" />
      </>
    );
  }
  return (
    <Link
      href="/sign-in"
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      Sign in
    </Link>
  );
}
