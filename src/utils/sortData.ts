type SortOrder = "asc" | "desc";

interface SortDataParams<T> {
  data: T[];
  sort: keyof T;
  order: SortOrder;
}

export function sortData<T>({ sort, data, order }: SortDataParams<T>): T[] {
  if (!sort) return data;

  const sorted = data.sort((a, b) => {
    const valA = a[sort];
    const valB = b[sort];

    if (valA == null) return 1;
    if (valB == null) return -1;

    if (valA < valB) return order === "desc" ? 1 : -1;
    if (valA > valB) return order === "desc" ? -1 : 1;
    return 0;
  });

  return sorted;
}
