import FiltersBlock from "@/components/FiltersBlock";
import VehicleTable from "@/components/VehicleTable";
import vehicles from "@/mock/mock_vehicles.json";

export default function AssetsPage() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <FiltersBlock data={vehicles} />
      <VehicleTable data={vehicles} />
    </div>
  );
}
