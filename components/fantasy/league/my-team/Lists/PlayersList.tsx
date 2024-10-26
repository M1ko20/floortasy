import ListPlayer from "../Player/ListPlayer";

export interface Player {
  id: number;
  name: string;
  team: string;
  teamShortName: string;
  position: "DEF" | "FWD" | "GK";
  rank: number;
  points: number;
  state: string;
  value: number;
  league: string;
}

export interface CanAddResult {
  canAdd: boolean;
  reason?: string;
}

interface PlayerListProps {
  players: Player[];
  handleSelect: (player: Player) => void;
  selectedPlayers: Player[];
  canAddPlayer: (player: Player) => CanAddResult;
  showBuyable: boolean;
}

const PlayerList = ({
  players,
  handleSelect,
  selectedPlayers,
  canAddPlayer,
  showBuyable,
}: PlayerListProps) => {
  return (
    <div className="mt-2 flex flex-col gap-1">
      {players.map((player) => (
        <ListPlayer
          key={player.id}
          player={player}
          onSelect={() => handleSelect(player)}
          isSelected={!!selectedPlayers.find((p) => p.id === player.id)}
          canAddPlayer={canAddPlayer}
          showBuyable={showBuyable}
        />
      ))}
    </div>
  );
};

export default PlayerList;
