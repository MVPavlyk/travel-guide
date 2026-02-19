import Link from "next/link";

import { HomeAuthBlock } from "~/app/_components/HomeAuthBlock";

type Session = { user?: { name?: string | null } | null } | null;

type Props = { variant: "home"; session: Session } | { variant: "back" };

export function AppHeader(props: Props) {
  return (
    <header className="flex h-20 w-full items-center justify-between bg-gray-100 px-60">
      <Link
        href="/"
        className="text-xl font-bold text-gray-800 no-underline hover:underline"
      >
        Travel Guide
      </Link>
      <div className="flex items-center gap-6">
        {props.variant === "home" ? (
          <>
            <HomeAuthBlock session={props.session} />
            {props.session?.user && (
              <Link
                href="/create-post"
                className="text-xl text-iris-100 no-underline hover:underline"
              >
                New post
              </Link>
            )}
          </>
        ) : (
          <Link
            href="/"
            className="text-gray-800 no-underline hover:underline"
          >
            Back to posts
          </Link>
        )}
      </div>
    </header>
  );
}
