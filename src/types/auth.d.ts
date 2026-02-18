import type { DefaultSession } from "next-auth";

export interface AuthCredentialsInputs extends Record<
  string,
  { label?: string; type?: string }
> {
  email: { label: string; type: "email" };
  password: { label: string; type: "password" };
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
