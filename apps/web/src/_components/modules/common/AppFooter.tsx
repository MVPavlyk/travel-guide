import { NavLink } from "@travel-guide/ui";
import type { Session } from "next-auth";

type Props = { session: Session | null };

export function AppFooter({ session }: Props) {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-4 bg-gray-800 px-60 py-12 text-white">
      <p className="text-lg font-bold">Travel Guide</p>
      <div className="flex gap-6 text-sm">
        <NavLink
          href="/"
          variant="link"
          className="text-white hover:underline"
        >
          Home
        </NavLink>
        {session?.user ? (
          <NavLink
            href="/create-post"
            variant="link"
            className="text-white hover:underline"
          >
            New post
          </NavLink>
        ) : (
          <NavLink
            href="/sign-in"
            variant="link"
            className="text-white hover:underline"
          >
            Sign in
          </NavLink>
        )}
      </div>
    </footer>
  );
}
