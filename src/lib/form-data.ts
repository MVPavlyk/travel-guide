import type { ZodType, ZodTypeAny } from "zod";

type SchemaWithShape = { shape: Record<string, ZodTypeAny> };

function getKeys(schema: SchemaWithShape): string[] {
  return Object.keys(schema.shape);
}

export function formDataToObject(
  formData: FormData,
  schema: SchemaWithShape,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of getKeys(schema)) {
    const value = formData.get(key);
    result[key] = typeof value === "string" ? value.trim() : "";
  }
  return result;
}

export function parseFormData<T>(
  formData: FormData,
  schema: ZodType<T> & SchemaWithShape,
) {
  return schema.safeParse(formDataToObject(formData, schema)) as
    | { success: true; data: T }
    | {
        success: false;
        error: { flatten: () => { fieldErrors: Record<string, string[]> } };
      };
}

export function getFirstErrorMessage(
  fieldErrors: Record<string, string[] | undefined> | undefined | null,
  fallback = "Invalid input",
): string {
  if (!fieldErrors) return fallback;
  const first = Object.values(fieldErrors).flat()[0];
  return first ?? fallback;
}
