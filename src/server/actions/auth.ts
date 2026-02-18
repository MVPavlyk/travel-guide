"use server";

import { firstFieldError, parseFormData } from "~/lib/form-data";
import { signUpSchema } from "~/lib/schemas/auth";
import { hashPassword } from "~/lib/auth/password";
import { db } from "~/server/db";

export type SignUpState =
  | { success: true }
  | { success: false; error: string; field?: string };

export async function signUp(
  _prev: SignUpState | null,
  formData: FormData
): Promise<SignUpState> {
  const parsed = parseFormData(formData, signUpSchema);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const field = Object.keys(fieldErrors)[0] ?? "email";
    return {
      success: false,
      error: firstFieldError(fieldErrors),
      field,
    };
  }

  const { email, password, name } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await db.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existing) {
    return {
      success: false,
      error: "An account with this email already exists",
      field: "email",
    };
  }

  const hashed = await hashPassword(password);
  await db.user.create({
    data: {
      email: normalizedEmail,
      password: hashed,
      name: typeof name === "string" ? name : null,
    },
  });

  return { success: true };
}
