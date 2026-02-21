import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createPostSchema } from "~/lib/schemas/post";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const paginationInput = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  perPage: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getPaginated: publicProcedure
    .input(paginationInput)
    .query(async ({ ctx, input }) => {
      const skip = (input.page - 1) * input.perPage;
      const [posts, total] = await Promise.all([
        ctx.db.post.findMany({
          skip,
          take: input.perPage,
          orderBy: { createdAt: "desc" },
          include: {
            createdBy: {
              select: { id: true, name: true, email: true },
            },
          },
        }),
        ctx.db.post.count(),
      ]);
      return { posts, total };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.coerce.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
        include: {
          createdBy: {
            select: { id: true, name: true, email: true },
          },
        },
      });
      if (!post) throw new TRPCError({ code: "NOT_FOUND" });
      return post;
    }),

  delete: protectedProcedure
    .input(z.object({ postId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        select: { createdById: true },
      });
      if (!post)
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      if (post.createdById !== ctx.session.user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete your own post",
        });
      await ctx.db.post.delete({ where: { id: input.postId } });
      return { ok: true };
    }),
});
