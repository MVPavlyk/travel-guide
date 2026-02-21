import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createCommentSchema } from "~/lib/schemas/comment";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  getByPostId: publicProcedure
    .input(z.object({ postId: z.coerce.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { postId: input.postId },
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        select: { id: true },
      });
      if (!post)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      return ctx.db.comment.create({
        data: {
          text: input.text,
          post: { connect: { id: input.postId } },
          user: { connect: { id: ctx.session.user.id } },
        },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ commentId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true },
      });
      if (!comment)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      if (comment.userId !== ctx.session.user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete your own comment",
        });
      await ctx.db.comment.delete({ where: { id: input.commentId } });
      return { ok: true };
    }),
});
