"use client";

import type { Session } from "next-auth";

import { NavLink } from "~/app/_components/NavLink";
import { SignOutButton } from "~/_components/modules/auth/SignOutButton";

export function HomeAuthBlock({ session }: { session: Session | null }) {
  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="px-2 text-sm text-gray-600">
          {session.user.name}
        </span>
        <SignOutButton />
      </div>
    );
  }
  return (
    <NavLink href="/sign-in" variant="primary">
      Sign in
    </NavLink>
  );
}
