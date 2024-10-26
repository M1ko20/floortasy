"use server";

import supabase from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface FantasyTeam {
  name?: string;
  league?: string;
  user?: number;
  season?: string;
}

export async function createFantasyTeam({ values }: { values: FantasyTeam }) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    const { data: duplicateData } = await supabase
      .from("fantasy_teams")
      .select()
      .eq("name", values.name)
      .eq("league", values.league)
      .eq("season", values.season)
      .single();

    if (duplicateData) {
      return {
        error: true,
        message: "Creation failed. Name is already in use.",
      };
    }

    const { data, error } = await supabase.from("fantasy_teams").insert({
      name: values.name,
      league: values.league,
      user: user.data.user.id,
      season: values.season,
    });

    if (error) {
      return {
        error: true,
        message: "Failed. Please try again later.",
      };
    } else {
      const { data: competitionsData } = await supabase
        .from("competitions")
        .select()
        .eq("code", values.league)
        .eq("season", values.season)
        .single();

      if (competitionsData) {
        const { error: competitionsError } = await supabase
          .from("competitions")
          .update({ teams_count: competitionsData.teams_count + 1 })
          .eq("id", competitionsData.id);
      }

      revalidatePath("/fantasy/");

      return {
        error: false,
        message: "Fantasy team created successfully!",
      };
    }
  }

  return {
    error: true,
    message: "Failed. Please try again later.",
  };
}

export async function getFantasyTeam({ league, season }: FantasyTeam) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    if (league == "all") {
      const { data, error } = await supabase
        .from("fantasy_teams")
        .select()
        .eq("user", user.data.user.id)
        .eq("season", season);

      if (data) return data;
    } else {
      const { data } = await supabase
        .from("fantasy_teams")
        .select()
        .eq("user", user.data.user.id)
        .eq("league", league)
        .eq("season", season)
        .single();

      if (data) return data.name;
    }
  }

  return "";
}
