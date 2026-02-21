import { z } from "zod";

export const createCommentSchema = z.object({
  postId: z.coerce.number().int().positive("Post is required"),
  text: z
    .string()
    .trim()
    .min(2, "At least 2 characters")
    .max(5000, "Comment is too long"),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
