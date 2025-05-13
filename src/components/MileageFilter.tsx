"use client";
import { useMemo } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { useFilters } from "@/hooks/useFilters";
import { TableItem } from "@/types/table";
import { getUniqueItems } from "@/utils/getUniqueItems";

type MileageFilterProps = {
  data: TableItem[];
};

export default function MileageFilter({ data }: MileageFilterProps) {
  const { filters, setFilters } = useFilters();

  const sortedMileage = useMemo(() => {
    const uniqeMileageValues = getUniqueItems<TableItem>(data, "mileage");

    return uniqeMileageValues.sort((a, b) => {
      return Number(a) - Number(b);
    });
  }, [data]);

  const handleChange =
    (key: "mileageFrom" | "mileageTo") => (value: string | null) => {
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
        label="Mileage From"
        selectedKeys={
          filters.mileageFrom ? [filters.mileageFrom.toString()] : []
        }
        onChange={(e) => handleChange("mileageFrom")(e.target.value)}
        className="w-full"
      >
        {sortedMileage.map((mileage) => (
          <SelectItem
            key={mileage}
            value={String(mileage)}
            textValue={String(mileage)}
          >
            {mileage}
          </SelectItem>
        ))}
      </Select>

      <Select
        size="sm"
        label="Mileage To"
        selectedKeys={filters.mileageTo ? [filters.mileageTo.toString()] : []}
        onChange={(e) => handleChange("mileageTo")(e.target.value)}
        className="w-full"
      >
        {sortedMileage.map((mileage) => (
          <SelectItem
            key={mileage}
            value={String(mileage)}
            textValue={String(mileage)}
          >
            {mileage}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
