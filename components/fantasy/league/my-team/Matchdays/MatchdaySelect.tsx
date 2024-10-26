import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

export interface Matchday {
  id: number;
  created_at: string;
  updated_at: string;
  league: string;
  season: string;
  matchday: number;
  deadline: string;
  finished: boolean;
  counting: boolean;
  current: boolean;
}

interface MatchdaySelectProps {
  matchdays: Matchday[];
  selectedMatchday: Matchday | undefined;
  setSelectedMatchday: (matchday: Matchday) => void;
  loading: boolean;
}

const MatchdaySelect: FC<MatchdaySelectProps> = ({
  matchdays,
  selectedMatchday,
  setSelectedMatchday,
  loading,
}) => {
  const handleChange = (id: string) => {
    const selected = matchdays.find((m) => m.id === parseInt(id));
    if (selected) {
      setSelectedMatchday(selected);
    }
  };

  return (
    <div className="h-full w-full">
      {loading || !selectedMatchday ? (
        <Skeleton className="h-full w-full rounded-lg" />
      ) : (
        <Select
          value={selectedMatchday ? selectedMatchday.id.toString() : ""}
          onValueChange={(value) => handleChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Matchday" />
          </SelectTrigger>
          <SelectContent>
            {matchdays.map((matchday) => (
              <SelectItem key={matchday.id} value={matchday.id.toString()}>
                Matchday {matchday.matchday}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default MatchdaySelect;
