import Link from "next/link";

import { HomeAuthBlock } from "~/app/_components/HomeAuthBlock";

type Session = { user?: { name?: string | null } | null } | null;

type Props = { variant: "home"; session: Session } | { variant: "back" };

const linkClass =
  "rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20";

export function AppHeader(props: Props) {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-4 py-4">
      <Link href="/" className="text-xl font-bold">
        Travel Guide
      </Link>
      <div className="flex items-center gap-4">
        {props.variant === "home" ? (
          <>
            <HomeAuthBlock session={props.session} />
            {props.session?.user && (
              <Link href="/create-post" className={linkClass}>
                New post
              </Link>
            )}
          </>
        ) : (
          <Link href="/" className={linkClass}>
            Back to posts
          </Link>
        )}
      </div>
    </header>
  );
}
