"use server";

import supabase from "@/lib/supabase/server";
import { equal } from "assert";

interface LeaderboardProps {
  league: string;
  season: string;
  matchday?: number;
}

export async function getLeaderboard({ league, season }: LeaderboardProps) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    if (league) {
      const { data, error } = await supabase
        .from("leaderboards")
        .select()
        .eq("league", league)
        .eq("season", season)
        .eq("user", user.data.user.id)
        .single();

      if (data) return data;
    }
  }

  return null;
}

export async function getLastMatchDayLeaderboard({
  league,
  season,
}: LeaderboardProps) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    if (league) {
      const { data: matchdayData, error: matchdayError } = await supabase
        .from("matchdays")
        .select("matchday")
        .eq("league", league)
        .eq("season", season)
        .eq("finished", true)
        .order("matchday", { ascending: false })
        .single();

      if (matchdayData) {
        const { data, error } = await supabase
          .from("leaderboards_matchdays")
          .select()
          .eq("league", league)
          .eq("season", season)
          .eq("user", user.data.user.id)
          .eq("matchday", matchdayData.matchday)
          .single();
    

        if (data) return data;
      } else {
        const { data: matchdayData, error: matchdayError } = await supabase
          .from("matchdays")
          .select("matchday")
          .eq("league", league)
          .eq("season", season)
          .eq("current", true)
          .single();

        if (matchdayData) {
          const { data, error } = await supabase
            .from("leaderboards_matchdays")
            .select()
            .eq("league", league)
            .eq("season", season)
            .eq("user", user.data.user.id)
            .eq("matchday", matchdayData.matchday)
            .single();

        
          if (data) return data;
        }
      }
    }
  }

  return null;
}

export async function getMatchDayLeaderboard({
  league,
  season,
  matchday,
}: LeaderboardProps) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    if (league) {
      const { data, error } = await supabase
        .from("leaderboards")
        .select()
        .eq("league", league)
        .eq("season", season)
        .eq("user", user.data.user.id)
        .eq("matchday", matchday)
        .single();

      if (data) return data;
    }
  }

  return null;
}
