import type { Session } from "next-auth";
import type { ReactNode } from "react";

import { AppFooter } from "~/app/_components/AppFooter";
import { AppHeader } from "~/app/_components/AppHeader";

type Props = { children: ReactNode; session: Session | null };

export function AppLayout({ children, session }: Props) {
  return (
    <>
      <main className="bg-background flex min-h-screen flex-col">
        <AppHeader session={session} />
        {children}
      </main>
      <AppFooter session={session} />
    </>
  );
}
