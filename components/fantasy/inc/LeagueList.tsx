"use client";

import { useState, useEffect } from "react";
import { getFantasyTeam } from "@/actions/fantasy";
import LeagueCard, { LeagueSkeleton } from "./LeagueCard";
import { getLeague } from "@/actions/league";
import { getLeaderboard } from "@/actions/leaderboards";

const LeagueList = () => {
  const [leaguesData, setLeaguesData] = useState<any[]>([]);
  const [fantasyTeamsData, setFantasyTeamsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRanks, setUserRanks] = useState<Record<string, number | null>>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const leaguesData = await getLeague({ season: "2024/2025" });
        const fantasyTeamsData = await getFantasyTeam({
          season: "2024/2025",
          league: "all",
        });

        // Fetch rank data for leagues where the user has a team
        const rankData: Record<string, number> = {};
        await Promise.all(
          fantasyTeamsData.map(async (team: any) => {
            const leaderboardData = await getLeaderboard({
              league: team.league,
              season: "2024/2025",
            });
            rankData[team.league] = leaderboardData
              ? leaderboardData.rank
              : null;
          }),
        );

        setLeaguesData(leaguesData || []);
        setFantasyTeamsData(fantasyTeamsData || []);
        setUserRanks(rankData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <LeagueSkeleton />
        <LeagueSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {leaguesData.map((league) => {
        const fantasyTeam = fantasyTeamsData.find(
          (team) => league.code === team.league,
        );
        const hasTeam = Boolean(fantasyTeam);
        const teamName = hasTeam ? fantasyTeam.name : "";
        const rank = userRanks[league.code] || 0;

        return (
          <LeagueCard
            key={league.id}
            league={league.code}
            name={league.name}
            season={league.season}
            team={hasTeam}
            image={league.image}
            players={league.teams_count}
            rank={rank}
            matchday={league.next_matchday}
            teamName={teamName}
          />
        );
      })}
    </div>
  );
};

export default LeagueList;
