import { LandPlot, ListIcon } from "lucide-react";
import React, { useState } from "react";
import LoadingPlayer from "../Player/LoadingPlayer";
import PlaceholderPlayer from "../Player/PlaceHolderPlayer";
import SelectedPlayer from "../Player/SelectedPlayer";
import { Button } from "@/components/ui/button";

interface Player {
  id: number;
  name: string;
  team: string;
  position: "DEF" | "FWD" | "GK";
  rank: number;
  points: number;
  state: string;
  value: number;
  league: string;
  teamShortName: string;
}

interface SelectedPlayersListProps {
  selectedPlayers: Player[];
  handleSelect: (player: Player) => void;
  captainId: number | null;
  setCaptainId: (id: Player) => void;
  isLoading: boolean;
  setDialogOpen: (isOpen: boolean) => void;
  currentMatchday: boolean;
  selectedMatchday: number;
  teams: {
    [key: string]: { id: string; short_name: string };
  };
}

const SelectedPlayersList = ({
  selectedPlayers,
  handleSelect,
  captainId,
  setCaptainId,
  isLoading,
  setDialogOpen,
  currentMatchday,
  selectedMatchday,
  teams,
}: SelectedPlayersListProps) => {
  const [viewMode, setViewMode] = useState<"list" | "field">("list");

  const maxGKs = 1;
  const maxDEFs = 4;
  const maxFWDs = 6;

  const defPlayers = selectedPlayers.filter(
    (player) => player.position === "DEF",
  );
  const fwdPlayers = selectedPlayers.filter(
    (player) => player.position === "FWD",
  );
  const gkPlayers = selectedPlayers.filter(
    (player) => player.position === "GK",
  );

  const defPlaceholders = maxDEFs - defPlayers.length;
  const fwdPlaceholders = maxFWDs - fwdPlayers.length;
  const gkPlaceholders = maxGKs - gkPlayers.length;

  return (
    <div className="my-6">
      <div className="flex w-full items-center justify-end gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "secondary"}
          className="flex items-center justify-center border-0 p-2"
          onClick={() => setViewMode("list")}
        >
          <ListIcon size={30} />
        </Button>

        <Button
          variant={viewMode === "field" ? "default" : "secondary"}
          className="flex items-center justify-center border-0 p-2"
          onClick={() => setViewMode("field")}
        >
          <LandPlot size={30} />
        </Button>
      </div>

      {viewMode === "field" ? (
        <div className="text-center text-lg font-semibold">
          <p>tady bude Field View</p>
          <p>xdd</p>
        </div>
      ) : (
        <div>
          <div>
            <h3 className="my-5 text-lg font-semibold">Forwards</h3>
            <div className="grid auto-rows-fr grid-cols-2 gap-3 gap-y-8 md:flex md:justify-start md:gap-4">
              {isLoading ? (
                Array.from({ length: maxFWDs }).map((_, index) => (
                  <LoadingPlayer key={`fwd-loading-${index}`} />
                ))
              ) : (
                <>
                  {fwdPlayers.map((player) => (
                    <SelectedPlayer
                      key={player.id}
                      rank={player.rank}
                      points={player.points}
                      name={player.name}
                      state={player.state}
                      position={player.position}
                      value={player.value}
                      league={player.league}
                      team={player.team}
                      id={player.id}
                      onSelect={() => handleSelect(player)}
                      isSelected={true}
                      isCaptain={captainId === player.id}
                      onSetCaptain={() => setCaptainId(player)}
                      currentMatchday={currentMatchday}
                      selectedMatchday={selectedMatchday}
                      teamName={teams[player.team]?.short_name}
                    />
                  ))}
                  {Array.from({ length: fwdPlaceholders }).map((_, index) => (
                    <PlaceholderPlayer
                      currentMatchday={currentMatchday}
                      key={`fwd-placeholder-${index}`}
                      onOpenDialog={() => setDialogOpen(true)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="my-5 text-lg font-semibold">Defenders</h3>
            <div className="grid grid-cols-2 gap-3 gap-y-8 md:flex md:justify-start">
              {isLoading ? (
                Array.from({ length: maxDEFs }).map((_, index) => (
                  <LoadingPlayer key={`def-loading-${index}`} />
                ))
              ) : (
                <>
                  {defPlayers.map((player) => (
                    <SelectedPlayer
                      key={player.id}
                      rank={player.rank}
                      points={player.points}
                      name={player.name}
                      state={player.state}
                      position={player.position}
                      value={player.value}
                      league={player.league}
                      team={player.team}
                      id={player.id}
                      onSelect={() => handleSelect(player)}
                      isSelected={true}
                      isCaptain={captainId === player.id}
                      onSetCaptain={() => setCaptainId(player)}
                      currentMatchday={currentMatchday}
                      selectedMatchday={selectedMatchday}
                      teamName={teams[player.team]?.short_name}
                    />
                  ))}
                  {Array.from({ length: defPlaceholders }).map((_, index) => (
                    <PlaceholderPlayer
                      currentMatchday={currentMatchday}
                      key={`def-placeholder-${index}`}
                      onOpenDialog={() => setDialogOpen(true)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="my-5 text-lg font-semibold">Goalkeeper</h3>
            <div className="grid grid-cols-2 gap-4">
              {isLoading ? (
                <LoadingPlayer />
              ) : (
                <>
                  {gkPlayers.map((player) => (
                    <SelectedPlayer
                      key={player.id}
                      rank={player.rank}
                      points={player.points}
                      name={player.name}
                      state={player.state}
                      position={player.position}
                      value={player.value}
                      league={player.league}
                      team={player.team}
                      id={player.id}
                      onSelect={() => handleSelect(player)}
                      isSelected={true}
                      isCaptain={captainId === player.id}
                      onSetCaptain={() => setCaptainId(player)}
                      currentMatchday={currentMatchday}
                      selectedMatchday={selectedMatchday}
                      teamName={teams[player.team]?.short_name}
                    />
                  ))}
                  {Array.from({ length: gkPlaceholders }).map((_, index) => (
                    <PlaceholderPlayer
                      currentMatchday={currentMatchday}
                      key={`gk-placeholder-${index}`}
                      onOpenDialog={() => setDialogOpen(true)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedPlayersList;
