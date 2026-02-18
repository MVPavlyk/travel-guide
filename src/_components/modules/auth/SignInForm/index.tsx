"use client";

import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { firstFieldError, parseFormData } from "~/lib/form-data";
import { credentialsSchema } from "~/lib/schemas/auth";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      const parsed = parseFormData(formData, credentialsSchema);
      if (!parsed.success) {
        const message = firstFieldError(
          parsed.error.flatten().fieldErrors,
          "Invalid email or password"
        );
        toast.error(message);
        return { error: message };
      }

      const { email, password } = parsed.data;
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        const message = "Invalid email or password";
        toast.error(message);
        return { error: message };
      }
      if (result?.ok) {
        toast.success("Signed in successfully");
        window.location.href = "/";
        return null;
      }
      const message = "Something went wrong";
      toast.error(message);
      return { error: message };
    },
    null
  );

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isPending}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
        />
      </div>
      {state?.error && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
