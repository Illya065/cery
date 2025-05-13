import { TableItem } from "@/types/table";
import { sortData } from "./sortData";
import { Filters } from "@/hooks/useFilters";

interface FilterDataParams {
  data: TableItem[];
  filters: Filters;
}

export function applyFilters({ data, filters }: FilterDataParams) {
  const { sort, order, model, make, yearFrom, yearTo, mileageFrom, mileageTo } =
    filters;

  let rawData = data;

  if (sort && order) {
    rawData = sortData<TableItem>({ data: data, sort, order });
  }

  if (make) {
    rawData = rawData.filter((item) => item.make === make);
  }

  if (model) {
    rawData = rawData.filter((item) => item.model === model);
  }

  if (yearFrom) {
    rawData = rawData.filter((item) => Number(item.year) >= Number(yearFrom));
  }

  if (yearTo) {
    rawData = rawData.filter((item) => Number(item.year) <= Number(yearTo));
  }

  if (mileageFrom) {
    rawData = rawData.filter(
      (item) => Number(item.mileage) >= Number(mileageFrom)
    );
  }

  if (mileageTo) {
    rawData = rawData.filter(
      (item) => Number(item.mileage) <= Number(mileageTo)
    );
  }

  return rawData;
}
