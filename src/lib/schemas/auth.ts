import { z } from "zod";

const emailSchema = z.string().email("Invalid email");
const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .max(72, "At most 72 characters");

export const credentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().min(1, "Name is required").max(100).optional()
  ),
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
