"use client";
import { useMemo } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useFilters } from "@/hooks/useFilters";
import { TableItem } from "@/types/table";
import { getUniqueItems } from "@/utils/getUniqueItems";

type AutocompleteFilterProps = {
  data: TableItem[];
  name: keyof Pick<TableItem, "make" | "model">;
  label: string;
};

export default function AutocompleteFilter({
  data,
  name,
  label,
}: AutocompleteFilterProps) {
  const { filters, setFilters } = useFilters();

  const handleChange = (option: string | null) => {
    setFilters({
      [name]: option || undefined,
      page: 1,
      sort: undefined,
      order: undefined,
    });
  };

  const items = useMemo(
    () => getUniqueItems<TableItem>(data, name),
    [data, name]
  );

  return (
    <Autocomplete
      size="sm"
      label={label}
      defaultItems={items.map((item) => ({ id: item, name: item }))}
      selectedKey={filters[name] ?? null}
      onSelectionChange={(key) => handleChange(key?.toString() || null)}
      allowsCustomValue={false}
      placeholder="Select model"
      variant="bordered"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name as string}>
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
