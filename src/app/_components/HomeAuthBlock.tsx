"use client";

import Link from "next/link";

import { SignOutButton } from "~/_components/modules/auth/SignOutButton";

type Session = { user?: { name?: string | null } | null } | null;

export function HomeAuthBlock({ session }: { session: Session }) {
  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-700">
          {session.user?.name ?? "Logged in"}
        </span>
        <SignOutButton className="rounded-[5px] border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100" />
      </div>
    );
  }
  return (
    <Link
      href="/sign-in"
      className="text-xl text-iris-100 no-underline hover:underline"
    >
      Sign in
    </Link>
  );
}
