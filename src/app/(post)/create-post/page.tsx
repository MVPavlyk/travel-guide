import { redirect } from "next/navigation";

import { AppLayout } from "~/_components/modules/common/AppLayout";
import { CreatePostForm } from "~/_components/modules/post/CreatePostForm";
import { auth } from "~/server/auth";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <AppLayout session={session}>
      <div className="flex flex-col items-center px-60 py-10">
        <h1 className="mb-6 text-4xl font-semibold text-gray-700">
          Create New Post
        </h1>
        <CreatePostForm />
      </div>
    </AppLayout>
  );
}
