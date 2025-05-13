"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import EmptyState from "@/components/VehicleTable/EmptyState";
import TableFooter from "@/components/VehicleTable/TableFooter";
import { useVehicleTable } from "@/hooks/useVehicleTable";
import { FilterableFields, TableItem } from "@/types/table";
import { DateUtil } from "@/utils/date";

type VehicleTableProps = {
  data?: TableItem[];
};

const COLUMNS: { key: keyof FilterableFields; label: string }[] = [
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "mileage", label: "Mileage" },
  { key: "year", label: "Year" },
  { key: "updated_at", label: "Last Update" },
];

export default function VehicleTable({ data = [] }: VehicleTableProps) {
  const { tableData, toggleSort, isPending, resetFilters } =
    useVehicleTable(data);

  return (
    <Table
      aria-label="Vehicles Table"
      isHeaderSticky
      bottomContent={<TableFooter data={data} />}
      className="flex-[1_1_0] overflow-auto h-full"
    >
      <TableHeader>
        {COLUMNS.map((column) => (
          <TableColumn
            key={column.key}
            onClick={() => toggleSort(column.key)}
            allowsSorting
          >
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody
        isLoading={isPending}
        loadingContent="Loading..."
        className="overflow-auto"
        emptyContent={<EmptyState resetFilters={resetFilters} />}
        items={tableData}
      >
        {tableData?.map((item) => (
          <TableRow
            key={item.unique_id}
            className="hover:bg-content3 hover:cursor-pointer"
          >
            <TableCell>{item.make}</TableCell>
            <TableCell>{item.model}</TableCell>

            <TableCell className="text-right">{item.mileage} mi</TableCell>
            <TableCell className="text-right min-w-20">{item.year}</TableCell>
            <TableCell className="min-w-32">
              {DateUtil(item.updated_at).format("MM/DD/YYYY HH:mm")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
