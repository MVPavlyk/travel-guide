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
            "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-foreground placeholder:text-gray-500 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-iris-100 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
