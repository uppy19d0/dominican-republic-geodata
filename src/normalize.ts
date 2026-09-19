export function normalizePlaceName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function matchesPlaceName(
  query: string,
  values: readonly (string | undefined)[],
): boolean {
  const normalizedQuery = normalizePlaceName(query);
  return values.some(
    (value) => value !== undefined && normalizePlaceName(value) === normalizedQuery,
  );
}
