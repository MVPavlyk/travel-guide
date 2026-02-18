import { z } from "zod";

export const createPostSchema = z.object({
  name: z.string().min(1, "Title is required"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
