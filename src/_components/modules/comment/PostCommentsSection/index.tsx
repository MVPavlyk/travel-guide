"use client";

import { CreateCommentForm } from "~/_components/modules/comment/CreateCommentForm";
import { CommentCard } from "~/_components/modules/comment/CommentCard";
import { api } from "~/trpc/react";

type Session = {
  user?: { id: string } | null;
} | null;

type Props = {
  postId: number;
  session: Session;
};

export function PostCommentsSection({ postId, session }: Props) {
  const { data: comments, isLoading } = api.comment.getByPostId.useQuery({
    postId,
  });
  const currentUserId = session?.user?.id ?? null;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Comments</h2>

      {session?.user && (
        <div className="rounded-lg border border-white/20 bg-white/5 p-4">
          <CreateCommentForm postId={postId} />
        </div>
      )}

      {isLoading ? (
        <p className="text-white/70">Loading comments…</p>
      ) : !comments?.length ? (
        <p className="text-white/70">No comments yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentCard comment={comment} currentUserId={currentUserId} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
