import { useMemo } from "react";
import { useFilters } from "@/hooks/useFilters";

interface UsePaginationResult {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  range: { start: number; end: number };
}

export function usePagination(
  totalItemsQty: number,
  perPage = 25
): UsePaginationResult {
  const { filters, setFilters } = useFilters();
  const currentPage = filters.page || 1;

  const totalPages = useMemo(
    () => Math.ceil(totalItemsQty / perPage),
    [totalItemsQty, perPage]
  );

  const setPage = (page: number) => {
    setFilters({ page });
  };

  const range = useMemo(() => {
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalItemsQty);
    return { start, end };
  }, [currentPage, perPage, totalItemsQty]);

  return {
    totalPages,
    currentPage,
    setPage,
    range,
  };
}
