const primary = "bg-iris-100 text-white font-bold shadow hover:opacity-90";
const outline =
  "border border-gray-300 bg-white text-gray-800 hover:bg-gray-200";
const link = "text-iris-100 underline-offset-4 hover:underline";

const secondaryFilled =
  "bg-gray-100 text-gray-800 font-bold shadow-sm hover:bg-gray-200";
const ghost = "text-gray-700 hover:bg-gray-100 hover:text-gray-800";

const secondaryText = "text-gray-800 hover:bg-gray-200";
const dark = "bg-gray-700 text-white hover:bg-gray-800";

export const sizeStyles = {
  default: "h-11 rounded-[5px] px-6 text-sm",
  sm: "h-9 rounded-[5px] px-4 text-xs",
  lg: "h-11 rounded-[5px] px-6 text-sm",
  icon: "h-9 w-9 rounded-[5px]",
} as const;

export const buttonVariantStyles = {
  default: primary,
  secondary: secondaryFilled,
  outline,
  ghost,
  link,
} as const;

export const navLinkVariantStyles = {
  primary,
  secondary: secondaryText,
  outline,
  dark,
  link: link + " h-auto px-0 py-0 rounded-none",
} as const;

export type ButtonVariant = keyof typeof buttonVariantStyles;
export type NavLinkVariant = keyof typeof navLinkVariantStyles;
