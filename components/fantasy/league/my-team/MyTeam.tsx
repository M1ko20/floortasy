"use client";

import { useState, useEffect } from "react";
import { getPlayers } from "@/actions/players";
import {
  getFantasyTeamPlayerIds,
  saveCaptain,
  saveFantasyTeamPlayers,
} from "@/actions/fantasy_teams_players";
import SelectedPlayersList from "./Lists/SelectedPlayersList";
import TeamValidator from "./Team/TeamValidator";
import TeamInfo from "./Team/TeamInfo";
import PlayersListDialog from "./Lists/PlayersListDialog";
import { getMatchdays, getMatchdaysNoFuture } from "@/actions/matchdays";

import TeamName from "./Team/TeamPoints";
import { toast } from "sonner";
import MatchdaySelect, { Matchday } from "./Matchdays/MatchdaySelect";
import { getTeamsSimple } from "@/actions/teams";
import { getMatchDayLeaderboard } from "@/actions/leaderboards";
import { SearchSlashIcon } from "lucide-react";

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

interface MyTeamProps {
  league: string;
}

const MyTeam = ({ league }: MyTeamProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string | null>("value");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [matchdays, setMatchDays] = useState<Matchday[]>([]);
  const [selectedMatchday, setSelectedMatchday] = useState<Matchday>();
  const [selectedMatchdayNumber, setSelectedMatchdayNumber] =
    useState<number>(1);
  const [currentMatchday, setCurrentMatchday] = useState<boolean>(false);
  const [loadingMatchday, setLoadingMatchday] = useState<boolean>(true);
  const [showBuyable, setShowBuyable] = useState<boolean>(false);
  const [teams, setTeams] = useState<{
    [key: string]: { id: string; short_name: string };
  }>({});
  const [teamPoints, setTeamPoints] = useState<number>(0);

  useEffect(() => {
    const fetchMatchdays = async () => {
      const matchdaysData = await getMatchdaysNoFuture({
        season: "2024/2025",
        league: league,
      });

      if (matchdaysData) {
        setMatchDays(matchdaysData);
        setLoadingMatchday(false);
      }
    };

    const fetchData = async () => {
      if (selectedMatchday) {
        setLoading(true);
        const allPlayers = await getPlayers(league);
        if (allPlayers) {
          setPlayers(allPlayers);
          const { playerIds, captainId } = await getFantasyTeamPlayerIds({
            league,
            matchday: selectedMatchday.matchday,
          });
          if (playerIds.length > 0) {
            const selected = allPlayers.filter((player) =>
              playerIds.includes(player.id),
            );
            setSelectedPlayers(selected);
            setCaptainId(captainId);
          } else {
            setSelectedPlayers([]);
            setCaptainId(null);
          }
          setLoading(false);
        }
      }
    };

    const fetchTeams = async () => {
      const teamsData = await getTeamsSimple(league, "2024/2025");
      const teamsDict = teamsData.reduce(
        (acc: { [key: string]: { id: string; short_name: string } }, team) => {
          acc[team.id] = { id: team.id, short_name: team.short_name };
          return acc;
        },
        {},
      );
      setTeams(teamsDict);
    };

    fetchMatchdays();
    fetchData();
    fetchTeams(); // Fetch teams
  }, [league, selectedMatchday]);

  useEffect(() => {
    if (selectedMatchday) {
      setCurrentMatchday(selectedMatchday.current);
      setSelectedMatchdayNumber(selectedMatchday.matchday);

      const fetchTeamPoints = async () => {
        const leaderboardData = await getMatchDayLeaderboard({
          league,
          season: "2024/2025",
          matchday: selectedMatchday.matchday,
        });

        if (leaderboardData && leaderboardData.points) {
          setTeamPoints(leaderboardData.points);
        }
      };

      fetchTeamPoints();
    } else if (matchdays.length > 0) {
      const currentMatchday = matchdays.find((m) => m.current);

      if (currentMatchday) {
        setSelectedMatchday(currentMatchday);
        setCurrentMatchday(true);
      } else {
        setCurrentMatchday(false);
      }
    }
  }, [selectedMatchday, matchdays]);

  const handleSelect = async (player: Player) => {
    const isSelected = selectedPlayers.some((p) => p.id === player.id);

    setSelectedPlayers((prevSelected) => {
      if (isSelected) {
        if (captainId === player.id) {
          setCaptainId(null);
        }
        return prevSelected.filter((p) => p.id !== player.id);
      } else {
        return [...prevSelected, player];
      }
    });

    if (selectedMatchday) {
      const updatedSelectedPlayers = selectedPlayers.filter(
        (p) => p.id !== player.id,
      );

      if (!isSelected) {
        updatedSelectedPlayers.push(player);
      }

      const playerIds = updatedSelectedPlayers.map((p) => p.id);
      const response = await saveFantasyTeamPlayers({
        players_id: playerIds,
        league,
        captainId,
      });

      if (response.error) {
        toast.error(
          isSelected
            ? "Failed to remove the player."
            : "Failed to add the player.",
        );
      } else {
        toast.success(
          isSelected
            ? `${player.name} has been removed from the team.`
            : `${player.name} has been added to the team.`,
        );
      }
    }
  };

  const handleCaptain = async (player: Player) => {
    setCaptainId(player.id);
    const response = await saveCaptain({
      league,
      captainId: player.id,
    });

    if (response.error) {
      toast.error("Failed to update captain.");
      setCaptainId(null);
    } else {
      toast.success(`${player.name} has been set as the new captain.`);
    }
  };

  const canAddPlayer = (
    player: Player,
  ): { canAdd: boolean; reason?: string } => {
    const teamCount = selectedPlayers.filter(
      (p) => p.team === player.team,
    ).length;
    const fwdCount = selectedPlayers.filter((p) => p.position === "FWD").length;
    const defCount = selectedPlayers.filter((p) => p.position === "DEF").length;
    const gkCount = selectedPlayers.filter((p) => p.position === "GK").length;
    const isSelected = selectedPlayers.some((p) => p.id === player.id);
    const totalValue =
      selectedPlayers.reduce((sum, p) => sum + p.value, 0) + player.value;

    if (isSelected) {
      return { canAdd: false, reason: "Already selected" };
    } else {
      if (teamCount >= 3) {
        return {
          canAdd: false,
          reason: "Max 3 players from the same team",
        };
      }
      if (player.position === "FWD" && fwdCount >= 6) {
        return {
          canAdd: false,
          reason: "Already 6 forwards selected",
        };
      }
      if (player.position === "DEF" && defCount >= 4) {
        return {
          canAdd: false,
          reason: "Already 4 defenders selected",
        };
      }
      if (player.position === "GK" && gkCount >= 1) {
        return { canAdd: false, reason: "Goalkeeper already selected" };
      }
      if (totalValue > 100) {
        return {
          canAdd: false,
          reason: "Not enough funds",
        };
      }
      return { canAdd: true, reason: "" };
    }
  };

  const handleSort = (order: string) => {
    if (sortOrder === order) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setSortOrder(order);
      setSortDirection("asc");
    }
  };

  const filteredPlayers = players.filter((player) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      player.name.toLowerCase().includes(query) ||
      player.team.toLowerCase().includes(query);

    if (!filter || filter === "ALL") {
      return matchesSearch;
    }
    if (filter === "FWD" || filter === "DEF" || filter === "GK") {
      return player.position === filter && matchesSearch;
    }
    return player.state === filter && matchesSearch;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (!sortOrder) {
      return 0;
    }
    const order = sortDirection === "asc" ? 1 : -1;
    if (sortOrder === "state") {
      return order * a.state.localeCompare(b.state);
    }
    if (sortOrder === "points") {
      return order * (b.points - a.points);
    }
    if (sortOrder === "name") {
      return order * a.name.localeCompare(b.name);
    }
    if (sortOrder === "value") {
      return order * (b.value - a.value);
    }
    if (sortOrder === "rank") {
      return order * (a.rank - b.rank);
    }
    return 0;
  });

  const totalValue = selectedPlayers.reduce(
    (sum, player) => sum + player.value,
    0,
  );

  return (
    <div>
      <div className="mb-5 grid min-h-[40px] grid-cols-2 gap-5">
        <TeamName points={teamPoints} loading={loading} />

        <MatchdaySelect
          matchdays={matchdays}
          selectedMatchday={selectedMatchday}
          setSelectedMatchday={setSelectedMatchday}
          loading={loadingMatchday}
        />
      </div>

      <TeamInfo
        selectedPlayers={selectedPlayers}
        captainId={captainId}
        totalValue={totalValue}
        loading={loading}
        matchday={selectedMatchday}
        league={league}
      />

      <SelectedPlayersList
        selectedPlayers={selectedPlayers}
        handleSelect={handleSelect}
        captainId={captainId}
        setCaptainId={handleCaptain}
        isLoading={loading}
        setDialogOpen={setDialogOpen}
        currentMatchday={currentMatchday}
        selectedMatchday={selectedMatchdayNumber}
        teams={teams}
      />

      <PlayersListDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        players={sortedPlayers}
        handleSelect={handleSelect}
        selectedPlayers={selectedPlayers}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        sortOrder={sortOrder}
        sortDirection={sortDirection}
        handleSort={handleSort}
        canAddPlayer={canAddPlayer}
        setShowBuyable={setShowBuyable}
        showBuyable={showBuyable}
      />

      {/* 
        <TeamValidator
        selectedPlayers={selectedPlayers}
        league={league}
        captainId={captainId}
      />
      */}
    </div>
  );
};

export default MyTeam;
