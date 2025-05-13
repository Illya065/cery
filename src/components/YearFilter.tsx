"use client";
import { useMemo } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { useFilters } from "@/hooks/useFilters";
import { TableItem } from "@/types/table";
import { getUniqueItems } from "@/utils/getUniqueItems";

type Props = {
  data: TableItem[];
};

export default function YearFilter({ data }: Props) {
  const { filters, setFilters } = useFilters();

  const sortedYears = useMemo(() => {
    const uniqueYears = getUniqueItems<TableItem>(data, "year");
    return uniqueYears.sort((a, b) => {
      return Number(a) - Number(b);
    });
  }, [data]);

  const handleChange =
    (key: "yearFrom" | "yearTo") => (value: string | null) => {
      setFilters({
        [key]: value ? parseInt(value) : undefined,
        page: 1,
        sort: undefined,
        order: undefined,
      });
    };

  return (
    <div className="flex items-center gap-4 justify-between">
      <Select
        size="sm"
        label="Year From"
        selectedKeys={filters.yearFrom ? [filters.yearFrom.toString()] : []}
        onChange={(e) => handleChange("yearFrom")(e.target.value)}
        className="w-full"
      >
        {sortedYears.map((year) => (
          <SelectItem key={year} value={String(year)}>
            {year}
          </SelectItem>
        ))}
      </Select>

      <Select
        size="sm"
        label="Year To"
        selectedKeys={filters.yearTo ? [filters.yearTo.toString()] : []}
        onChange={(e) => handleChange("yearTo")(e.target.value)}
        className="w-full"
      >
        {sortedYears.map((year) => (
          <SelectItem key={year} value={String(year)}>
            {year}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
