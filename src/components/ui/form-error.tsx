export function FormError({
  message,
  className,
}: {
  message: string | undefined | null;
  className?: string;
}) {
  if (!message) return null;

  return (
    <p className={`text-destructive text-sm ${className ?? ""}`} role="alert">
      {message}
    </p>
  );
}
