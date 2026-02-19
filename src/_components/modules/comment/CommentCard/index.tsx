"use client";

import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { type RouterOutputs, api } from "~/trpc/react";

type Comment = RouterOutputs["comment"]["getByPostId"][number];

type Props = {
  comment: Comment;
  currentUserId: string | null;
};

export function CommentCard({ comment, currentUserId }: Props) {
  const utils = api.useUtils();
  const deleteComment = api.comment.delete.useMutation({
    onSuccess: async () => {
      toast.success("Comment deleted.");
      await utils.comment.getByPostId.invalidate({ postId: comment.postId });
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const canDelete = currentUserId != null && comment.userId === currentUserId;
  const authorName = comment.user.name ?? comment.user.email ?? "Anonymous";

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-800">{authorName}</span>
        <span className="text-xs text-gray-600">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
        {canDelete && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-auto text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            disabled={deleteComment.isPending}
            onClick={() => deleteComment.mutate({ commentId: comment.id })}
          >
            {deleteComment.isPending ? "…" : "Delete"}
          </Button>
        )}
      </div>
      <p className="whitespace-pre-wrap text-gray-700">{comment.text}</p>
    </div>
  );
}
