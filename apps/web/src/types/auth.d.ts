export interface AuthCredentialsInputs extends Record<
  string,
  { label?: string; type?: string }
> {
  email: { label: string; type: "email" };
  password: { label: string; type: "password" };
}

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
  }
}
