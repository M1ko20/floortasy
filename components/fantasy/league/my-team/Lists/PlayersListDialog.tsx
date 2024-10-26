import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import PlayerList, { CanAddResult, Player } from "./PlayersList";
import SearchBar from "../Filters/SearchBar";
import FilterButtons from "../Filters/FilterButtons";
import SortButtons from "../Filters/SortButtons";

interface PlayerListDialogProps {
  open: boolean;
  onClose: () => void;
  players: Player[];
  handleSelect: (player: Player) => void;
  selectedPlayers: Player[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  sortOrder: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (order: string) => void;
  canAddPlayer: (order: Player) => CanAddResult;
  showBuyable: boolean;
  setShowBuyable: (b: boolean) => void;
}

const PlayersListDialog = ({
  open,
  onClose,
  players,
  handleSelect,
  selectedPlayers,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  sortOrder,
  sortDirection,
  handleSort,
  canAddPlayer,
  showBuyable,
  setShowBuyable,
}: PlayerListDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="my-3 max-w-[360px] p-4 sm:max-w-[425px] md:max-w-[600px]">
        <DialogTitle></DialogTitle>

        <DialogTitle>Select a Player</DialogTitle>
        <DialogDescription>
          Choose a player to add to your team.
        </DialogDescription>

        <div className="mt-5 flex flex-col">
          <div className="mt-5 flex flex-col gap-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <FilterButtons filter={filter} setFilter={setFilter} />
          </div>

          <div className="mt-4 flex w-full justify-end">
            <SortButtons
              sortOrder={sortOrder}
              sortDirection={sortDirection}
              handleSort={handleSort}
              showBuyable={showBuyable}
              setShowBuyable={setShowBuyable}
            />
          </div>

          <PlayerList
            players={players}
            handleSelect={handleSelect}
            selectedPlayers={selectedPlayers}
            canAddPlayer={canAddPlayer}
            showBuyable={showBuyable}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayersListDialog;
