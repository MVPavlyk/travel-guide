import type { ReactNode } from "react";
import Link from "next/link";

import {
  navLinkVariantStyles,
  sizeStyles,
  type NavLinkVariant,
} from "~/lib/action-styles";
import { cn } from "~/lib/utils";

const base =
  "inline-flex items-center justify-center font-semibold no-underline transition-colors";

const navSizes = { default: sizeStyles.default, sm: sizeStyles.sm } as const;

type Props = {
  href: string;
  variant?: NavLinkVariant;
  size?: keyof typeof navSizes;
  className?: string;
  children: ReactNode;
};

export function NavLink({
  href,
  variant = "secondary",
  size = "default",
  className,
  children,
}: Props) {
  const sizeClass =
    variant === "link"
      ? "h-auto px-0 py-0 rounded-none text-sm"
      : navSizes[size];
  return (
    <Link
      href={href}
      className={cn(base, sizeClass, navLinkVariantStyles[variant], className)}
    >
      {children}
    </Link>
  );
}
