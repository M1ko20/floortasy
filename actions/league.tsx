"use server";

import supabase from "@/lib/supabase/server";

interface LeagueProps {
  code?: string;
  season: string;
}

export async function getLeague({ code, season }: LeagueProps) {
  const user = await supabase.auth.getUser();

  if (user.data.user != null) {
    if (code) {
      const { data } = await supabase
        .from("competitions")
        .select()
        .eq("code", code)
        .eq("season", season)
        .single();

      if (data) return data;
    } else {
      const { data } = await supabase
        .from("competitions")
        .select()
        .eq("season", season);

      if (data) return data;
    }
  }

  return "";
}
