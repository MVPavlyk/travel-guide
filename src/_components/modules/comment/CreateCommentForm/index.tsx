"use client";

import { type SubmitEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { FormError } from "~/components/ui/form-error";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { getFieldErrors, parseFormData } from "~/lib/form-data";
import { createCommentSchema } from "~/lib/schemas/comment";
import { api } from "~/trpc/react";

type FieldErrors = Record<string, string[] | undefined>;

type Props = {
  postId: number;
};

export function CreateCommentForm({ postId }: Props) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  const utils = api.useUtils();
  const createComment = api.comment.create.useMutation({
    onSuccess: async () => {
      toast.success("Comment added.");
      await utils.comment.getByPostId.invalidate({ postId });
    },
    onError(err) {
      setFormError(err.message ?? "Something went wrong");
      toast.error(err.message);
    },
  });

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(undefined);
    setFieldErrors(undefined);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const parsed = parseFormData(formData, createCommentSchema);

    if (!parsed.success) {
      setFieldErrors(getFieldErrors(parsed) as FieldErrors);
      return;
    }

    createComment.mutate(
      { postId: parsed.data.postId, text: parsed.data.text },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FormError message={formError} />
      <input type="hidden" name="postId" value={postId} />
      <div className="grid gap-2">
        <Label htmlFor="comment-text">Comment</Label>
        <Textarea
          id="comment-text"
          name="text"
          rows={4}
          placeholder="Write a comment..."
          disabled={createComment.isPending}
          aria-invalid={!!fieldErrors?.text}
        />
        <FieldError name="text" fieldErrors={fieldErrors} />
      </div>
      <Button type="submit" disabled={createComment.isPending}>
        {createComment.isPending ? "Sending…" : "Comment"}
      </Button>
    </form>
  );
}
