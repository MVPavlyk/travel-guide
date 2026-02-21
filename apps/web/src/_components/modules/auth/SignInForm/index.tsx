"use client";

import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { FieldError, type FieldErrors } from "~/components/ui/field-error";
import { FormError } from "~/components/ui/form-error";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getFieldErrors, parseFormData } from "~/lib/form-data";
import { credentialsSchema } from "~/lib/schemas/auth";
import { useRouter } from "next/navigation";

type SignInState = { fieldErrors?: FieldErrors; formError?: string } | null;

export function SignInForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    async (_prev: SignInState, formData: FormData) => {
      const parsed = parseFormData(formData, credentialsSchema);

      if (!parsed.success) {
        return { fieldErrors: getFieldErrors(parsed) };
      }

      const { email, password } = parsed.data;

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        const formError = "Invalid email or password";
        toast.error(formError);
        return { formError };
      }

      if (result?.ok) {
        toast.success("Signed in successfully");
        router.push("/");
        return null;
      }

      return null;
    },
    null,
  );

  const fieldErrors = state?.fieldErrors;
  const formError = state?.formError;

  return (
    <form action={formAction} className="grid gap-4">
      <FormError message={formError} />
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
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
          autoComplete="current-password"
          required
          disabled={isPending}
          aria-invalid={!!fieldErrors?.password}
        />
        <FieldError name="password" fieldErrors={fieldErrors} />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
