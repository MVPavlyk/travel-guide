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
      name: string;
      email: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
  }
}
