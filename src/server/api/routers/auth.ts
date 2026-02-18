import { hashPassword } from "~/lib/auth/password";
import { signUpSchema } from "~/lib/schemas/auth";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const normalizedEmail = input.email.trim().toLowerCase();
      const name =
        typeof input.name === "string" && input.name.trim()
          ? input.name.trim()
          : null;

      const existing = await ctx.db.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        return {
          success: false,
          formError: "An account with this email already exists",
        };
      }

      const hashed = await hashPassword(input.password);

      try {
        await ctx.db.user.create({
          data: {
            email: normalizedEmail,
            password: hashed,
            name,
          },
        });
      } catch {
        return {
          success: false,
          formError: "Something went wrong. Please try again.",
        };
      }

      return { success: true };
    }),
});
