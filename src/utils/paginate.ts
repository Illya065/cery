export function paginate<T>(items: T[], page: number, perPage = 25): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
