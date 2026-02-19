import { redirect } from "next/navigation";

import { AppFooter } from "~/app/_components/AppFooter";
import { AppHeader } from "~/app/_components/AppHeader";
import { CreatePostForm } from "~/_components/modules/post/CreatePostForm";
import { auth } from "~/server/auth";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-background">
      <AppHeader variant="back" />

      <div className="flex flex-col items-center px-60 py-10">
        <h1 className="mb-6 text-4xl font-semibold text-gray-700">
          Create New Post
        </h1>
        <CreatePostForm />
      </div>
      <AppFooter />
    </main>
  );
}
