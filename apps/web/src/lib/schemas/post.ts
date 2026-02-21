import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(10, "At least 10 characters"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
