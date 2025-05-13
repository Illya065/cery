export type TableItem = {
  unique_id: string;
  mileage: number;
  year: string;
  make: string;
  model: string;
  updated_at?: string;
};

export type SortOrder = "asc" | "desc";

export type FilterableFields = Pick<
  TableItem,
  "make" | "model" | "mileage" | "year" | "updated_at"
>;
