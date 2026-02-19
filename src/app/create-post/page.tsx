import { redirect } from "next/navigation";

import { AppHeader } from "~/app/_components/AppHeader";
import { CreatePostForm } from "~/_components/modules/post/CreatePostForm";
import { auth } from "~/server/auth";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <AppHeader variant="back" />

      <div className="container mx-auto max-w-lg px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">New post</h1>
        <CreatePostForm />
      </div>
    </main>
  );
}
