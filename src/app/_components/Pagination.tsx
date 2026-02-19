import Link from "next/link";

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
};

export function Pagination({ total, currentPage, perPage }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-2 py-6"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
        >
          Previous
        </Link>
      )}
      <span className="text-white/80">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
