"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type Props = {
  postId: number;
};

export function DeletePostButton({ postId }: Props) {
  const router = useRouter();
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted.");
      router.push("/");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="border-gray-300 text-gray-700 hover:bg-gray-100"
      disabled={deletePost.isPending}
      onClick={() => deletePost.mutate({ postId })}
    >
      {deletePost.isPending ? "Deleting…" : "Delete post"}
    </Button>
  );
}
