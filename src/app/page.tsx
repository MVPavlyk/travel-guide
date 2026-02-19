import { AppHeader } from "~/app/_components/AppHeader";
import { Pagination } from "~/app/_components/Pagination";
import { PostCard } from "~/app/_components/PostCard";
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
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <AppHeader variant="home" session={session} />

      <div className="container mx-auto flex flex-1 flex-col px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Posts</h1>
        {posts.length === 0 ? (
          <p className="text-white/80">No posts yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </main>
  );
}
