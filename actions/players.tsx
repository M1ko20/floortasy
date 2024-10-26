"use server";

import supabase from "@/lib/supabase/server";

// Function to fetch players
export async function getPlayers(league: string) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    const { data: playersData } = await supabase
      .from("players")
      .select("*")
      .eq("league", league);

    if (playersData) {
      const { data: teamsData } = await supabase.from("teams").select();

      if (teamsData) {
        const teamsMap = new Map(
          teamsData.map((team) => [team.id, team.short_name]),
        );

        const playersWithTeamShortName = playersData.map((player) => ({
          ...player,
          teamShortName: teamsMap.get(player.team) || player.team,
        }));

        return playersWithTeamShortName;
      }
    }
  }

  return null;
}
