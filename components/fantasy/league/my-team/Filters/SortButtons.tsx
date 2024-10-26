import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";

interface SortButtonsProps {
  sortOrder: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (order: string) => void;
  showBuyable: boolean;
  setShowBuyable: (value: boolean) => void;
}

const SortButtons = ({
  sortOrder,
  sortDirection,
  handleSort,
  showBuyable,
  setShowBuyable,
}: SortButtonsProps) => {
  return (
    <div className="flex h-full w-full flex-row items-center justify-between">
      <div className="flex items-center">
        <Checkbox
          id="buyable-checkbox"
          checked={showBuyable}
          onCheckedChange={() => setShowBuyable(!showBuyable)}
        />
        <label htmlFor="buyable-checkbox" className="ml-2">
          Able to buy
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Toggle
          variant="outline"
          pressed={sortOrder === "points"}
          onPressedChange={() => handleSort("points")}
          className="flex items-center"
        >
          <span>Points</span>
          {sortOrder === "points" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </Toggle>
        <Toggle
          variant="outline"
          pressed={sortOrder === "value"}
          onPressedChange={() => handleSort("value")}
          className="flex items-center"
        >
          <span>Price</span>
          {sortOrder === "value" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </Toggle>
      </div>
    </div>
  );
};

export default SortButtons;
