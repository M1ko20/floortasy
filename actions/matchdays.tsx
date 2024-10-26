"use server";

import supabase from "@/lib/supabase/server";

interface MatchdayProps {
  league: string;
  season: string;
}

export async function getMatchdays({ season, league }: MatchdayProps) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    const { data, error } = await supabase
      .from("matchdays")
      .select()
      .eq("league", league)
      .eq("season", season)
      .order("matchday", { ascending: false });

    if (data) return data;
  }

  return null;
}

export async function getMatchdaysNoFuture({ season, league }: MatchdayProps) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    const { data, error } = await supabase
      .from("matchdays")
      .select()
      .eq("league", league)
      .eq("season", season)
      .or("current.eq.true,finished.eq.true,counting.eq.true")
      .order("matchday", { ascending: false });

    if (data) return data;
  }

  return null;
}

export async function getDeadline({ season, league }: MatchdayProps) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    const { data } = await supabase
      .from("matchdays")
      .select("deadline")
      .eq("league", league)
      .eq("season", season)
      .eq("current", true)
      .single();

    if (data) {
      return data.deadline;
    }
  }

  return null;
}

export async function getCurrentMatchDay({ season, league }: MatchdayProps) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    const { data } = await supabase
      .from("matchdays")
      .select("matchday")
      .eq("league", league)
      .eq("season", season)
      .eq("current", true)
      .single();

    if (data) {
      return data.matchday;
    }
  }

  return null;
}
