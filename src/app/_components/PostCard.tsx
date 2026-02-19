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
    <article className="flex flex-col overflow-hidden rounded-lg bg-white p-7 shadow-xl">
      <h2 className="text-lg font-bold text-black">
        <Link
          href={`/post/${post.id}`}
          className="no-underline hover:underline"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-1 text-gray-600">
        {post.createdBy.name ?? post.createdBy.email ?? "Anonymous"} ·{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-5 h-px border-0 bg-gray-300" />
      <p className="line-clamp-3 flex-1 text-gray-600">{excerpt}</p>
      <hr className="my-5 h-px border-0 bg-gray-300" />
      <div className="flex items-center justify-end">
        <Link
          href={`/post/${post.id}`}
          className="inline-flex h-11 items-center justify-center rounded-[5px] bg-iris-100 px-8 text-sm font-bold text-white no-underline hover:opacity-90"
        >
          Details
        </Link>
      </div>
    </article>
  );
}
