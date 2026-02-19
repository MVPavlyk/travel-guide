import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "~/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantStyles = {
  default:
    "bg-iris-100 text-white font-bold shadow hover:opacity-90",
  secondary:
    "bg-gray-100 text-gray-800 font-bold shadow-sm hover:bg-gray-200",
  outline:
    "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100",
  ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-800",
  link: "text-iris-100 underline-offset-4 hover:underline",
};

const sizeStyles = {
  default: "h-11 rounded-[5px] px-8 text-sm",
  sm: "h-9 rounded-[5px] px-4 text-xs",
  lg: "h-11 rounded-[5px] px-8 text-sm",
  icon: "h-9 w-9 rounded-[5px]",
};

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris-100 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
