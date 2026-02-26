"use client";

import { type SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Button,
  FieldError,
  type FieldErrors,
  FormError,
  Input,
  Label,
} from "@travel-guide/ui";
import { getFieldErrors, parseFormData } from "~/lib/form-data";
import { signUpSchema } from "~/lib/schemas/auth";
import { api } from "~/trpc/react";

export function SignUpForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  const signUp = api.auth.signUp.useMutation({
    onSuccess() {
      toast.success("Account created. Sign in with your credentials.");
      router.push("/sign-in");
    },
    onError(err) {
      setFormError(err.message);
      toast.error(err.message);
    },
  });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(undefined);
    setFieldErrors(undefined);

    const formData = new FormData(e.currentTarget);
    const parsed = parseFormData(formData, signUpSchema);

    if (!parsed.success) {
      setFieldErrors(getFieldErrors(parsed));

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
        <Label htmlFor="name">Name</Label>
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
