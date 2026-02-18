"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { firstFieldError, parseFormData } from "~/lib/form-data";
import { signUpSchema } from "~/lib/schemas/auth";
import type { SignUpState } from "~/server/actions/auth";
import { signUp } from "~/server/actions/auth";

export function SignUpForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    SignUpState | null,
    FormData
  >(async (prev, formData) => {
    const parsed = parseFormData(formData, signUpSchema);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const field = Object.keys(fieldErrors)[0] ?? "email";
      const message = firstFieldError(fieldErrors);
      toast.error(message);
      return { success: false, error: message, field };
    }
    const result = await signUp(prev, formData);
    if (result.success) {
      toast.success("Account created. Sign in with your credentials.");
      router.push("/sign-in");
    }
    return result;
  }, null);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          disabled={isPending}
        />
      </div>
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
          aria-invalid={
            state && !state.success && state.field === "email" ? true : undefined
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={72}
          disabled={isPending}
          aria-invalid={
            state && !state.success && state.field === "password"
              ? true
              : undefined
          }
        />
      </div>
      {state && !state.success && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing up…" : "Sign up"}
      </Button>
    </form>
  );
}
