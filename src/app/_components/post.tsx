"use client";

import { toast } from "sonner";

import { firstFieldError, parseFormData } from "~/lib/form-data";
import { createPostSchema } from "~/lib/schemas/post";
import { api } from "~/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const parsed = parseFormData(
            new FormData(e.currentTarget),
            createPostSchema
          );
          if (!parsed.success) {
            toast.error(firstFieldError(parsed.error.flatten().fieldErrors));
            return;
          }
          createPost.mutate(parsed.data);
        }}
        className="flex flex-col gap-2"
      >
        <input
          name="name"
          type="text"
          placeholder="Title"
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
