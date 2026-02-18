"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { FormError } from "~/components/ui/form-error";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getFirstErrorMessage, parseFormData } from "~/lib/form-data";
import { signUpSchema } from "~/lib/schemas/auth";
import type { AuthState } from "~/server/actions/auth";
import { signUp } from "~/server/actions/auth";

export function SignUpForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    AuthState | null,
    FormData
  >(async (prev, formData) => {
    const parsed = parseFormData(formData, signUpSchema);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return { success: false, fieldErrors };
    }

    const result = await signUp(prev, formData);

    if (result.success) {
      toast.success("Account created. Sign in with your credentials.");
      router.push("/sign-in");
    } else {
      const message =
        result.formError ?? getFirstErrorMessage(result.fieldErrors);
      if (message) toast.error(message);
    }

    return result;
  }, null);

  const fieldErrors = state?.fieldErrors;
  const formError = state?.formError;

  return (
    <form action={formAction} className="grid gap-4">
      <FormError message={formError} />
      <div className="grid gap-2">
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          disabled={isPending}
          aria-invalid={!!fieldErrors?.name}
        />
        <FieldError name="name" fieldErrors={fieldErrors} />
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
          aria-invalid={!!fieldErrors?.email}
        />
        <FieldError name="email" fieldErrors={fieldErrors} />
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
          aria-invalid={!!fieldErrors?.password}
        />
        <FieldError name="password" fieldErrors={fieldErrors} />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing up…" : "Sign up"}
      </Button>
    </form>
  );
}
