type SearchableKeys<T> = (keyof T)[];

export function searchArray<T>(
  array: T[],
  keyword: string,
  keys: SearchableKeys<T>,
): T[] {
  const normalizedKeyword = keyword.toLowerCase();

  return array.filter((item) => {
    return keys.some((key) => {
      const value = item[key];

      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return String(value).toLowerCase().includes(normalizedKeyword);
      }

      return false;
    });
  });
}
