import type { Session } from "next-auth";

import { HomeAuthBlock } from "~/_components/modules/auth/HomeAuthBlock";
import { NavLink } from "~/app/_components/NavLink";

type Props = { session: Session | null };

export function AppHeader({ session }: Props) {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-300 bg-gray-100 px-60">
      <NavLink href="/" variant="secondary">
        Travel Guide
      </NavLink>
      <nav className="flex items-center gap-3" aria-label="Main">
        <HomeAuthBlock session={session} />
        {session?.user && (
          <NavLink href="/create-post" variant="primary">
            New post
          </NavLink>
        )}
      </nav>
    </header>
  );
}
