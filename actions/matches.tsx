"use server";

import supabase from "@/lib/supabase/server";
import { getTeams } from "./teams";

interface MatchProps {
  league: string;
  season: string;
}

export async function getMatches({ league, season }: MatchProps) {
  const { data: matches, error: matchError } = await supabase
    .from("matches")
    .select(
      `
      id,
      home_team,
      away_team,
      home_score,
      away_score,
      start,
      info,
      matchday,
      status,
      cf_url
    `,
    )
    .eq("league", league)
    .eq("season", season)
    .order("start", { ascending: true });

  if (matchError) {
    console.error("Error fetching matches:", matchError);
    return [];
  }

  return matches;
}

export async function getMatchDetails({ league, season }: MatchProps) {
  const { data: matches, error: matchError } = await supabase
    .from("matches")
    .select(
      `
        id,
        home_team,
        away_team,
        home_team_temp,
        away_team_temp,
        home_score,
        away_score,
        start,
        info,
        matchday,
        status,
        cf_url
      `,
    )
    .eq("league", league)
    .eq("season", season)
    .order("start", { ascending: true });

  if (matchError) {
    console.error("Error fetching matches:", matchError);
    return [];
  }

  const teamIds = Array.from(
    new Set([
      ...matches.map((match) => match.home_team),
      ...matches.map((match) => match.away_team),
    ]),
  ).filter((id) => id);

  const teams = await getTeams(teamIds);

  const processedMatches = matches.map((match) => ({
    id: match.id,
    home_team: teams[match.home_team] || {
      short_name: match.home_team_temp || "Unknown",
    },
    away_team: teams[match.away_team] || {
      short_name: match.away_team_temp || "Unknown",
    },
    home_score: match.home_score,
    away_score: match.away_score,
    start: match.start,
    status: match.status,
    matchday: match.matchday,
    info: match.info,
    cf_url: match.cf_url,
  }));

  return processedMatches;
}

interface GoalData {
  match: string;
  goal: string;
  assist: string;
  team: string;
}

interface PlayerData {
  id: string;
  name: string;
}

export async function getGoalsForMatch(
  matchId: number,
): Promise<{ goals: GoalData[]; players: PlayerData[] } | null> {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    // Fetch goals for the given match
    const { data: goals, error: goalsError } = await supabase
      .from("goals")
      .select()
      .eq("match", matchId);

    if (goalsError || !goals) {
      console.error("Error fetching goals data:", goalsError);
      return null;
    }

    // Extract unique player IDs from goals and assists
    const playerIds = Array.from(
      new Set(
        goals.flatMap((goal) => [goal.goal, goal.assist].filter(Boolean)),
      ),
    );

    // Fetch player details
    const { data: players, error: playersError } = await supabase
      .from("players")
      .select("id, name")
      .in("id", playerIds);

    if (playersError || !players) {
      console.error("Error fetching player data:", playersError);
      return null;
    }

    return { goals, players };
  }

  return null;
}
