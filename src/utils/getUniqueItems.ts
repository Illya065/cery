export function getUniqueItems<T>(data: T[], key: keyof T) {
  const items = data.map((item) => item[key]);
  return Array.from(new Set(items));
}
