import { FC } from "react";
import { saveFantasyTeamPlayers } from "@/actions/fantasy_teams_players";

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
}

interface TeamValidatorProps {
  selectedPlayers: Player[];
  league: string;
  captainId: number | null;
}

const TeamValidator: FC<TeamValidatorProps> = ({
  selectedPlayers,
  league,
  captainId,
}) => {
  const checkTeam = async () => {
    const fwdCount = selectedPlayers.filter(
      (player) => player.position === "FWD",
    ).length;
    const defCount = selectedPlayers.filter(
      (player) => player.position === "DEF",
    ).length;
    const gkCount = selectedPlayers.filter(
      (player) => player.position === "GK",
    ).length;

    if (fwdCount === 6 && defCount === 4 && gkCount === 1) {
      const playerIds = selectedPlayers.map((player) => player.id);
      const response = await saveFantasyTeamPlayers({
        players_id: playerIds,
        league,
        captainId,
      });
      if (response.error) {
        console.error(response.message);
      } else {
        console.log(response.message);
      }
    } else {
      console.log("Team composition is incorrect.");
    }
  };

  return (
    <button
      onClick={checkTeam}
      className="bg-gray rounded border p-2 text-white"
    >
      Save Team
    </button>
  );
};

export default TeamValidator;
