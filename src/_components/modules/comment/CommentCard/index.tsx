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
    <div className="rounded-lg border border-white/20 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-white/90">{authorName}</span>
        <span className="text-xs text-white/60">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
        {canDelete && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-auto text-white/80 hover:bg-white/10 hover:text-white"
            disabled={deleteComment.isPending}
            onClick={() => deleteComment.mutate({ commentId: comment.id })}
          >
            {deleteComment.isPending ? "…" : "Delete"}
          </Button>
        )}
      </div>
      <p className="whitespace-pre-wrap text-white/90">{comment.text}</p>
    </div>
  );
}
