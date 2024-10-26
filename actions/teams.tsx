"use server";

import supabase from "@/lib/supabase/server";

interface Team {
  id: string;
  short_name: string;
}

export async function getTeams(
  ids: string[],
): Promise<{ [key: string]: Team }> {
  const validIds = ids.filter((id) => id && !isNaN(Number(id)));

  if (validIds.length === 0) {
    console.warn("No valid team IDs provided");
    return {};
  }

  const { data: teams, error: teamError } = await supabase
    .from("teams")
    .select()
    .in("id", validIds);

  if (teamError) {
    console.error("Error fetching teams:", teamError);
    return {};
  }

  const teamDict = teams.reduce((acc: { [key: string]: Team }, team) => {
    acc[team.id] = team;
    return acc;
  }, {});

  return teamDict;
}

export async function getTeamsSimple(
  league: string,
  season: string,
): Promise<Team[]> {
  const { data: teams, error } = await supabase
    .from("teams")
    .select()
    .eq("league", league)
    .eq("season", season);

  if (error) {
    console.error("Error fetching teams:", error);
    return [];
  }

  return teams;
}
