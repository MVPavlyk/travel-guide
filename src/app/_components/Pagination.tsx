import { NavLink } from "~/app/_components/NavLink";

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
        <NavLink
          href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}
          variant="dark"
          size="sm"
          className="min-w-[2.25rem]"
        >
          Previous
        </NavLink>
      )}
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <NavLink
          href={`/?page=${currentPage + 1}`}
          variant="dark"
          size="sm"
          className="min-w-[2.25rem]"
        >
          Next
        </NavLink>
      )}
    </nav>
  );
}
