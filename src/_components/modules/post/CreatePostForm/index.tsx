"use client";

import { type SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/ui/field-error";
import { FormError } from "~/components/ui/form-error";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getFieldErrors, parseFormData } from "~/lib/form-data";
import { createPostSchema } from "~/lib/schemas/post";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

type FieldErrors = Record<string, string[] | undefined>;

export function CreatePostForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | undefined>();
  const [formError, setFormError] = useState<string | undefined>();

  const createPost = api.post.create.useMutation({
    onSuccess(data) {
      toast.success("Post created.");
      router.push(`/post/${data.id}`);
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

    const formData = new FormData(e.currentTarget);
    const parsed = parseFormData(formData, createPostSchema);

    if (!parsed.success) {
      setFieldErrors(getFieldErrors(parsed) as FieldErrors);
      return;
    }

    createPost.mutate(parsed.data);
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-lg gap-4">
      <FormError message={formError} />
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Post title"
          autoComplete="off"
          disabled={createPost.isPending}
          aria-invalid={!!fieldErrors?.title}
        />
        <FieldError name="title" fieldErrors={fieldErrors} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="content">Content</Label>
        <textarea
          id="content"
          name="content"
          rows={6}
          placeholder="Write your post..."
          disabled={createPost.isPending}
          aria-invalid={!!fieldErrors?.content}
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          )}
        />
        <FieldError name="content" fieldErrors={fieldErrors} />
      </div>
      <Button type="submit" className="w-full" disabled={createPost.isPending}>
        {createPost.isPending ? "Creating…" : "Create post"}
      </Button>
    </form>
  );
}
