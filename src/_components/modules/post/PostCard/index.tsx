import { NavLink } from "~/app/_components/NavLink";
import type { Post } from "~/trpc/react";

export function PostCard({ post }: { post: Post }) {
  const excerpt =
    post.content.length > 120
      ? post.content.slice(0, 120).trim() + "…"
      : post.content;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-white p-7 shadow-xl">
      <h2 className="text-lg font-bold text-black">
        <NavLink
          href={`/post/${post.id}`}
          variant="link"
          className="text-black hover:underline"
        >
          {post.title}
        </NavLink>
      </h2>
      <p className="mt-1 text-gray-600">
        {post.createdBy.name ?? post.createdBy.email ?? "Anonymous"} ·{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-5 h-px border-0 bg-gray-300" />
      <p className="line-clamp-3 flex-1 text-gray-600">{excerpt}</p>
      <hr className="my-5 h-px border-0 bg-gray-300" />
      <div className="flex items-center justify-end">
        <NavLink href={`/post/${post.id}`} variant="primary">
          Details
        </NavLink>
      </div>
    </article>
  );
}
