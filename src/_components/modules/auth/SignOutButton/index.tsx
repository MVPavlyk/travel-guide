"use client";

import { signOut } from "next-auth/react";

import { Button } from "~/components/ui/button";

export function SignOutButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={className}
      onClick={() => signOut({ callbackUrl: "/" })}
      {...props}
    >
      Sign out
    </Button>
  );
}
