import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  createdBy: { id: string; name: string | null; email: string | null };
};

export function PostCard({ post }: { post: Post }) {
  const excerpt =
    post.content.length > 120
      ? post.content.slice(0, 120).trim() + "…"
      : post.content;

  return (
    <article className="flex flex-col gap-2 rounded-xl bg-white/10 p-4">
      <h2 className="text-xl font-semibold">
        <Link href={`/post/${post.id}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="line-clamp-3 text-white/90">{excerpt}</p>
      <p className="text-sm text-white/70">
        {post.createdBy.name ?? post.createdBy.email ?? "Anonymous"} ·{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </article>
  );
}
