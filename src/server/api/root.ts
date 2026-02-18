import { authRouter } from "~/server/api/routers/auth";
import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
