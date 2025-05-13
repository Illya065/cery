import { useCallback } from "react";
import { useFilters } from "@/hooks/useFilters";
import { FilterableFields } from "@/types/table";

export function useSorting() {
  const { filters, setFilters } = useFilters();

  const { sort, order } = filters;

  const toggleSort = useCallback(
    (field: keyof FilterableFields) => {
      if (filters.sort === field) {
        const newOrder = filters.order === "asc" ? "desc" : "asc";
        setFilters({ order: newOrder, page: 1 });
      } else {
        setFilters({ sort: field, order: "asc", page: 1 });
      }
    },
    [filters.sort, filters.order, setFilters]
  );

  return {
    sort,
    order,
    toggleSort,
  };
}
