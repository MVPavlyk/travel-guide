import type { NextAuthConfig } from "next-auth";

export const authConfigVercelRuntime: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [],
  session: { strategy: "jwt" },
  trustHost: true,
};
