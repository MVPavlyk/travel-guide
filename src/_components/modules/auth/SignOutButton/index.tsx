"use client";

import { type ComponentProps } from "react";
import { signOut } from "next-auth/react";

import { Button } from "~/components/ui/button";

export function SignOutButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
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
