import { notFound } from "next/navigation";
import { TRPCError } from "@trpc/server";

import { AppFooter } from "~/app/_components/AppFooter";
import { AppHeader } from "~/app/_components/AppHeader";
import { PostCommentsSection } from "~/_components/modules/comment/PostCommentsSection";
import { DeletePostButton } from "~/_components/modules/post/DeletePostButton";
import { auth } from "~/server/auth";
import { serverCaller } from "~/trpc/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const session = await auth();
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId) || postId < 1) notFound();

  let post: Awaited<ReturnType<typeof serverCaller.post.getById>>;
  try {
    post = await serverCaller.post.getById({ id: postId });
  } catch (err) {
    if (err instanceof TRPCError && err.code === "NOT_FOUND") notFound();
    throw err;
  }

  const isAuthor = session?.user?.id === post.createdById;

  return (
    <main className="min-h-screen bg-background">
      <AppHeader variant="back" />

      <div className="flex h-[200px] w-full items-center justify-between bg-gray-100 px-60">
        <div className="flex flex-1 flex-col">
          <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
          <p className="mt-4 text-gray-600">
            {post.createdBy.name ?? post.createdBy.email ?? "Anonymous"} ·{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <article className="px-60 py-16">
        <div className="max-w-2xl whitespace-pre-wrap text-gray-600">
          {post.content}
        </div>
        {isAuthor && (
          <div className="mt-6 flex max-w-2xl items-center gap-4">
            <DeletePostButton postId={postId} />
            <span className="text-sm text-gray-600">(You are the author)</span>
          </div>
        )}
      </article>

      <section className="max-w-2xl px-60 pb-16">
        <PostCommentsSection postId={postId} session={session} />
      </section>
      <AppFooter />
    </main>
  );
}
