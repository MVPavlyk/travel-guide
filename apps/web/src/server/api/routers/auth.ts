import { TRPCError } from "@trpc/server";

import { hashPassword } from "~/lib/auth/password";
import { signUpSchema } from "~/lib/schemas/auth";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const normalizedEmail = input.email.trim().toLowerCase();
      const name = input.name.trim();

      const existing = await ctx.db.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An account with this email already exists",
        });
      }

      const hashed = await hashPassword(input.password);

      try {
        await ctx.db.user.create({
          data: {
            email: normalizedEmail,
            password: hashed,
            name: name,
          },
        });
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong. Please try again.",
        });
      }
    }),
});
