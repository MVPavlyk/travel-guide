import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

import type { AuthCredentialsInputs } from "~/types/auth";
import { credentialsSchema } from "~/lib/schemas/auth";
import { verifyPassword } from "~/lib/auth/password";
import { db } from "~/server/db";

export const authConfig: NextAuthConfig = {
  providers: [
    DiscordProvider,
    CredentialsProvider<AuthCredentialsInputs>({
      id: "credentials",
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const normalizedEmail = email.trim().toLowerCase();
        const user = await db.user.findUnique({
          where: { email: normalizedEmail },
        });
        if (!user?.password) return null;
        const ok = await verifyPassword(password, user.password);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email ?? "",
          name: user.name,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db) as NextAuthConfig["adapter"],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        id: (token.sub ?? token.id) as string,
        email: token.email ?? session.user.email ?? "",
        name: token.name ?? session.user.name ?? "",
      },
    }),
  },
  pages: {
    signIn: "/sign-in",
  },
};
