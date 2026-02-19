import { notFound } from "next/navigation";
import { TRPCError } from "@trpc/server";

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
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <AppHeader variant="back" />

      <article className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
        <p className="mb-6 text-white/70">
          {post.createdBy.name ?? post.createdBy.email ?? "Anonymous"} ·{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="whitespace-pre-wrap text-white/90">{post.content}</div>
        {isAuthor && (
          <div className="mt-6 flex items-center gap-4">
            <DeletePostButton postId={postId} />
            <span className="text-sm text-white/60">(You are the author)</span>
          </div>
        )}
      </article>

      <section className="container mx-auto max-w-2xl px-4 pb-12">
        <PostCommentsSection postId={postId} session={session} />
      </section>
    </main>
  );
}
