import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterableFields, SortOrder } from "@/types/table";

export interface Filters {
  page?: number;
  make?: string;
  sort?: keyof FilterableFields;
  order?: SortOrder;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
}

const DEFAULTS: Partial<Filters> = {
  page: 1,
};

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: Filters = useMemo(() => {
    const params = new URLSearchParams((searchParams || "").toString());

    const getNumber = (key: string) => {
      const val = params.get(key);
      return val ? Number(val) : undefined;
    };

    return {
      page: getNumber("page") || DEFAULTS.page,
      sort: params.get("sort") as Filters["sort"],
      order: params.get("order") as Filters["order"],
      model: params.get("model") || undefined,
      make: params.get("make") || undefined,
      yearFrom: getNumber("yearFrom"),
      yearTo: getNumber("yearTo"),
      mileageFrom: getNumber("mileageFrom"),
      mileageTo: getNumber("mileageTo"),
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Partial<Filters>) => {
      const params = new URLSearchParams((searchParams || "").toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === "" ||
          (DEFAULTS as any)[key] === value
        ) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const resetFilters = useCallback(() => {
    router.push("?");
  }, [router]);

  return {
    filters,
    setFilters,
    resetFilters,
  };
}
