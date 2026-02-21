"use client";

import type { Session } from "next-auth";

import { CreateCommentForm } from "~/_components/modules/comment/CreateCommentForm";
import { CommentCard } from "~/_components/modules/comment/CommentCard";
import { api } from "~/trpc/react";

type Comment = {
  id: number;
  text: string;
  postId: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
};

type Props = {
  postId: number;
  session: Session | null;
  comments: Comment[];
};

export function PostCommentsSection({
  postId,
  session,
  comments: initialComments,
}: Props) {
  const { data: comments } = api.comment.getByPostId.useQuery(
    { postId },
    { initialData: initialComments },
  );

  const currentUserId = session?.user?.id ?? null;

  return (
    <section className="w-lg space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Comments</h2>

      {session?.user && (
        <div className="rounded-lg border border-gray-300 bg-gray-100 p-4">
          <CreateCommentForm postId={postId} />
        </div>
      )}

      {!comments ? (
        <p className="text-gray-600">No comments yet.</p>
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
