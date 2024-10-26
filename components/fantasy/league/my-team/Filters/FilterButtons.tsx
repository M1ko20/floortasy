import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterButtonsProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterButtons = ({ filter, setFilter }: FilterButtonsProps) => {
  return (
    <Select onValueChange={setFilter} value={filter}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Position" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All players</SelectItem>
        <SelectItem value="FWD">Forwards</SelectItem>
        <SelectItem value="DEF">Defenders</SelectItem>
        <SelectItem value="GK">Goalkeepers</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterButtons;
