import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-4 bg-gray-800 px-60 py-12 text-white">
      <p className="text-lg font-bold">Travel Guide</p>
      <div className="flex gap-6 text-sm">
        <Link href="/" className="no-underline hover:underline">
          Home
        </Link>
        <Link href="/sign-in" className="no-underline hover:underline">
          Sign in
        </Link>
      </div>
    </footer>
  );
}
