"use server";

import { parseFormData } from "~/lib/form-data";
import { signUpSchema } from "~/lib/schemas/auth";
import { hashPassword } from "~/lib/auth/password";
import { db } from "~/server/db";

export type FieldErrors = Record<string, string[]>;

export type AuthState =
  | { success: true; fieldErrors?: undefined; formError?: undefined }
  | {
      success: false;
      fieldErrors?: FieldErrors;
      formError?: string;
    };

export async function signUp(
  _prev: AuthState | null,
  formData: FormData,
): Promise<AuthState> {
  const parsed = parseFormData(formData, signUpSchema);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as FieldErrors,
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
      formError: "An account with this email already exists",
    };
  }

  const hashed = await hashPassword(password);

  try {
    await db.user.create({
      data: {
        email: normalizedEmail,
        password: hashed,
        name: typeof name === "string" ? name : null,
      },
    });
  } catch (e) {
    console.error(e);

    return {
      success: false,
      formError: "Something went wrong. Please try again.",
    };
  }

  return { success: true };
}
