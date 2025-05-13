"use client";
import { Button } from "@nextui-org/button";
import AutocompleteFilter from "@/components/AutocompleteFilter";
import YearFilter from "@/components/YearFilter";
import MileageFilter from "@/components/MileageFilter";
import { useFilters } from "@/hooks/useFilters";
import { TableItem } from "@/types/table";

interface FiltersBlockProps {
  data: TableItem[];
}

export default function FiltersBlock({ data = [] }: FiltersBlockProps) {
  const { resetFilters } = useFilters();

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between">
        <AutocompleteFilter label="Make" data={data} name="make" />
        <AutocompleteFilter label="Model" data={data} name="model" />
      </div>

      <YearFilter data={data} />
      <MileageFilter data={data} />

      <Button size="sm" onPress={resetFilters} className="mx-auto block">
        Reset All Filters
      </Button>
    </div>
  );
}
