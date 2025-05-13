import { Button } from "@nextui-org/button";

interface EmptyStateProps {
  resetFilters: () => void;
}

export default function EmptyState({ resetFilters }: EmptyStateProps) {
  return (
    <div>
      <p className="mb-2">Can't find any items</p>
      <Button size="sm" color="warning" onPress={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
}
