"use client";

import { type SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { FormError } from "~/components/ui/form-error";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getFieldErrors, parseFormData } from "~/lib/form-data";
import { signUpSchema } from "~/lib/schemas/auth";
import { api } from "~/trpc/react";

type FieldErrors = Record<string, string[] | undefined>;

export function SignUpForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  const signUp = api.auth.signUp.useMutation({
    onSuccess(result) {
      if (result.success) {
        toast.success("Account created. Sign in with your credentials.");
        router.push("/sign-in");
      } else {
        setFormError(result.formError);
        toast.error(result.formError);
      }
    },
    onError(err) {
      const message =
        (err.data as { formError?: string } | undefined)?.formError ??
        err.message ??
        "Something went wrong";
      setFormError(message);
      toast.error(message);
    },
  });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(undefined);
    setFieldErrors(undefined);

    const formData = new FormData(e.currentTarget);
    const parsed = parseFormData(formData, signUpSchema);

    if (!parsed.success) {
      const errors = getFieldErrors(parsed) as FieldErrors;
      setFieldErrors(errors);

      return;
    }

    signUp.mutate({
      email: parsed.data.email,
      password: parsed.data.password,
      name: parsed.data.name,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FormError message={formError} />
      <div className="grid gap-2">
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          disabled={signUp.isPending}
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
          required
          disabled={signUp.isPending}
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
          required
          disabled={signUp.isPending}
          aria-invalid={!!fieldErrors?.password}
        />
        <FieldError name="password" fieldErrors={fieldErrors} />
      </div>
      <Button type="submit" className="w-full" disabled={signUp.isPending}>
        {signUp.isPending ? "Signing up…" : "Sign up"}
      </Button>
    </form>
  );
}
