import { Pagination } from "@nextui-org/pagination";
import { usePagination } from "@/hooks/usePagination";
import { useTotalItems } from "@/hooks/useTotalItems";
import { TableItem } from "@/types/table";

interface TableFooterProps {
  data: TableItem[];
}

export default function TableFooter({ data }: TableFooterProps) {
  const totalItems = useTotalItems(data);

  const { setPage, totalPages, range, currentPage } = usePagination(
    totalItems,
    25
  );

  return (
    <div className="flex w-full bg-background justify-between items-center sticky bottom-0 z-1 py-2 px-5 rounded-xl">
      <span className="text-sm">
        {range.start} of {range.end}
      </span>
      <Pagination
        initialPage={currentPage}
        showControls
        total={totalPages}
        page={currentPage}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}
