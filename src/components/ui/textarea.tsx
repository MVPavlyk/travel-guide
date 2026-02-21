import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "~/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "text-foreground focus:ring-iris-100 w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm transition-colors placeholder:text-gray-500 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
