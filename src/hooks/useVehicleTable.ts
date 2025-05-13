import { useEffect, useState, useTransition } from "react";
import { useSorting } from "@/hooks/useSorting";
import { useFilters } from "@/hooks/useFilters";
import { TableItem } from "@/types/table";
import { applyFilters } from "@/utils/applyFilters";
import { paginate } from "@/utils/paginate";

export function useVehicleTable(data: TableItem[]) {
  const [isPending, startTransition] = useTransition();

  const { toggleSort } = useSorting();
  const { filters, resetFilters } = useFilters();

  const [tableData, setTableData] = useState<TableItem[]>(
    paginate(
      applyFilters({
        data: data,
        filters: filters,
      }),
      filters.page || 1,
      25
    )
  );

  useEffect(() => {
    startTransition(() => {
      const filteredData = applyFilters({
        data: data,
        filters,
      });

      const paginatedData = paginate(filteredData, filters.page || 1, 25);

      setTableData(paginatedData);
    });
  }, [JSON.stringify(filters)]);

  return {
    tableData,
    isPending,
    toggleSort,
    resetFilters,
  };
}
