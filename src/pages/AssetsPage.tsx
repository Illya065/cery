import FiltersBlock from "@/components/FiltersBlock";
import VehicleTable from "@/components/VehicleTable";
import vehicles from "@/mock/mock_vehicles.json";
import { Suspense } from "react";

export default function AssetsPage() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <Suspense fallback={<div>Filters Loading...</div>}>
        <FiltersBlock data={vehicles} />
      </Suspense>

      <Suspense fallback={<div>Vehicles Loading...</div>}>
        <VehicleTable data={vehicles} />
      </Suspense>
    </div>
  );
}
