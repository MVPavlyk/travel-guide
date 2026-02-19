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
      className="mt-12 flex w-full items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}
          className="flex h-8 min-w-[2.25rem] items-center justify-center rounded-[5px] bg-gray-700 px-4 text-xs text-white no-underline hover:bg-gray-800"
        >
          Previous
        </Link>
      )}
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="flex h-8 min-w-[2.25rem] items-center justify-center rounded-[5px] bg-gray-700 px-4 text-xs text-white no-underline hover:bg-gray-800"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
