import { useMemo } from "react";
import { useFilters } from "@/hooks/useFilters";
import { TableItem } from "@/types/table";
import { applyFilters } from "@/utils/applyFilters";

export function useTotalItems(data: TableItem[]) {
  const { filters } = useFilters();

  return useMemo(() => {
    if (
      filters.model ||
      filters.make ||
      filters.yearFrom ||
      filters.yearTo ||
      filters.mileageFrom ||
      filters.mileageTo
    ) {
      const filteredData = applyFilters({ data, filters });
      return filteredData.length;
    } else {
      return data.length;
    }
  }, [JSON.stringify(filters), data]);
}
