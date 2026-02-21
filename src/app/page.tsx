import { AppLayout } from "~/app/_components/AppLayout";
import { Pagination } from "~/app/_components/Pagination";
import { PostCard } from "~/_components/modules/post/PostCard";
import { auth } from "~/server/auth";
import { serverCaller } from "~/trpc/server";

const PER_PAGE = 10;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const session = await auth();
  const { page: pageParam } = await searchParams;
  const rawPage = Number(pageParam);
  const currentPage = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;

  const { posts, total } = await serverCaller.post.getPaginated({
    page: currentPage,
    perPage: PER_PAGE,
  });

  return (
    <AppLayout session={session}>
      <section className="flex h-[320px] w-full items-center justify-center bg-gray-100">
        <h2 className="text-5xl font-bold text-gray-800">Travel with us</h2>
      </section>

      <div className="flex flex-1 flex-col px-60 py-32">
        <h1 className="mb-6 text-3xl font-bold text-gray-700">Posts</h1>
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          <ul className="grid grid-cols-3 gap-10">
            {posts.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
        <Pagination
          total={total}
          currentPage={currentPage}
          perPage={PER_PAGE}
        />
      </div>
    </AppLayout>
  );
}
