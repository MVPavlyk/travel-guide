export type FieldErrors = Record<string, string[] | undefined>;

export function FieldError({
  name,
  fieldErrors,
  className,
}: {
  name: string;
  fieldErrors: FieldErrors | undefined | null;
  className?: string;
}) {
  const messages = fieldErrors?.[name];
  const message = messages?.[0];
  if (!message) return null;

  return (
    <p className={`text-destructive text-sm ${className ?? ""}`} role="alert">
      {message}
    </p>
  );
}
