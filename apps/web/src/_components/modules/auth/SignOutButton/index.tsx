import { signOut } from "next-auth/react";

import { Button } from "@travel-guide/ui";

export function SignOutButton() {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </Button>
  );
}
