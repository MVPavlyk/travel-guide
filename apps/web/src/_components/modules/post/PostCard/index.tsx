import { NavLink } from "@travel-guide/ui";
import type { Post } from "~/trpc/react";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white p-7 shadow-xl">
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
        {post.user.name} · {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-5 h-px border-0 bg-gray-300" />
      <p className="line-clamp-4 flex-1 text-gray-600">{post.content}</p>
      <hr className="my-5 h-px border-0 bg-gray-300" />
      <div className="flex items-center justify-end">
        <NavLink href={`/post/${post.id}`} variant="primary">
          Details
        </NavLink>
      </div>
    </div>
  );
}
