"use server";

import supabase from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface FantasyTeamPlayersParams {
  league: string;
  matchday: number;
}

interface FantasyTeamPlayersResponse {
  playerIds: number[];
  captainId: number | null;
}

export async function getFantasyTeamPlayerIds({
  league,
  matchday,
}: FantasyTeamPlayersParams): Promise<FantasyTeamPlayersResponse> {
  try {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User Authentication Error:", userError);
      return { playerIds: [], captainId: null };
    }

    if (user.user?.id) {
      const { data: fantasyTeamData, error: fetchError } = await supabase
        .from("fantasy_teams")
        .select("id")
        .eq("user", user.user.id)
        .eq("league", league)
        .single();

      if (fetchError || !fantasyTeamData) {
        console.error("Fetch Fantasy Team Error:", fetchError);
        return { playerIds: [], captainId: null };
      }

      const fantasy_team_id = fantasyTeamData.id;

      const { data: fantasyTeamPlayers, error: playersError } = await supabase
        .from("fantasy_teams_players")
        .select("players_ids, captain")
        .eq("fantasy_team_id", fantasy_team_id)
        .eq("matchday", matchday)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (playersError) {
        //console.error("Fetch Players Error:", playersError);
        return { playerIds: [], captainId: null };
      }

      return {
        playerIds: fantasyTeamPlayers?.players_ids || [],
        captainId: fantasyTeamPlayers?.captain || null,
      };
    }

    return { playerIds: [], captainId: null };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { playerIds: [], captainId: null };
  }
}

interface SaveFantasyTeamPlayersParams {
  players_id: number[];
  league: string;
  captainId: number | null;
}

export async function saveFantasyTeamPlayers({
  players_id,
  league,
  captainId,
}: SaveFantasyTeamPlayersParams) {
  try {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User Authentication Error:", userError);
      return { error: true, message: "Authentication failed" };
    }

    if (user.user?.id) {
      const { data: fantasyTeamData, error: fetchFantasyTeamError } =
        await supabase
          .from("fantasy_teams")
          .select("id")
          .eq("user", user.user.id)
          .eq("league", league)
          .single();

      if (fetchFantasyTeamError || !fantasyTeamData) {
        console.error("Fetch Fantasy Team Error:", fetchFantasyTeamError);
        return { error: true, message: "Failed to fetch fantasy team" };
      }

      const fantasy_team_id = fantasyTeamData.id;

      const { data: matchdayData, error: fetchMatchdayError } = await supabase
        .from("matchdays")
        .select("matchday")
        .eq("league", league)
        .eq("current", true)
        .single();

      if (fetchMatchdayError || !matchdayData) {
        console.error("Fetch Matchday Error:", fetchMatchdayError);
        return { error: true, message: "Failed to fetch current matchday" };
      }

      const current_matchday = matchdayData.matchday;

      const { data: existingRecord, error: fetchExistingRecordError } =
        await supabase
          .from("fantasy_teams_players")
          .select("id")
          .eq("fantasy_team_id", fantasy_team_id)
          .eq("matchday", current_matchday)
          .single();

      if (
        fetchExistingRecordError &&
        fetchExistingRecordError.code !== "PGRST116"
      ) {
        console.error("Fetch Existing Record Error:", fetchExistingRecordError);
        return { error: true, message: "Failed to check existing record" };
      }

      let upsertError;
      if (existingRecord) {
        const { error: updateError } = await supabase
          .from("fantasy_teams_players")
          .update({
            players_ids: players_id,
            captain: captainId,
          })
          .eq("id", existingRecord.id);

        upsertError = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("fantasy_teams_players")
          .insert({
            fantasy_team_id,
            matchday: current_matchday,
            players_ids: players_id,
            captain: captainId,
          });

        upsertError = insertError;
      }

      if (upsertError) {
        console.error("Upsert Fantasy Team Players Error:", upsertError);
        return { error: true, message: "Failed to save fantasy team players" };
      }

      return {
        error: false,
        message: "Fantasy team players saved successfully",
      };
    }

    return { error: true, message: "User not authenticated" };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { error: true, message: "Unexpected error occurred" };
  }
}

export async function saveCaptain({
  league,
  captainId,
}: {
  league: string;
  captainId: number;
}) {
  try {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User Authentication Error:", userError);
      return { error: true, message: "Authentication failed" };
    }

    if (user.user?.id) {
      const { data: fantasyTeamData, error: fetchFantasyTeamError } =
        await supabase
          .from("fantasy_teams")
          .select("id")
          .eq("user", user.user.id)
          .eq("league", league)
          .single();

      if (fetchFantasyTeamError || !fantasyTeamData) {
        console.error("Fetch Fantasy Team Error:", fetchFantasyTeamError);
        return { error: true, message: "Failed to fetch fantasy team" };
      }

      const fantasy_team_id = fantasyTeamData.id;

      const { data: matchdayData, error: fetchMatchdayError } = await supabase
        .from("matchdays")
        .select("matchday")
        .eq("league", league)
        .eq("current", true)
        .single();

      if (fetchMatchdayError || !matchdayData) {
        console.error("Fetch Matchday Error:", fetchMatchdayError);
        return { error: true, message: "Failed to fetch current matchday" };
      }

      const current_matchday = matchdayData.matchday;

      const { data: existingRecord, error: fetchExistingRecordError } =
        await supabase
          .from("fantasy_teams_players")
          .select("id")
          .eq("fantasy_team_id", fantasy_team_id)
          .eq("matchday", current_matchday)
          .single();

      if (
        fetchExistingRecordError &&
        fetchExistingRecordError.code !== "PGRST116"
      ) {
        console.error("Fetch Existing Record Error:", fetchExistingRecordError);
        return { error: true, message: "Failed to check existing record" };
      }

      let upsertError;
      if (existingRecord) {
        const { error: updateError } = await supabase
          .from("fantasy_teams_players")
          .update({
            captain: captainId,
          })
          .eq("id", existingRecord.id);

        upsertError = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("fantasy_teams_players")
          .insert({
            fantasy_team_id,
            matchday: current_matchday,
            captain: captainId,
          });

        upsertError = insertError;
      }

      if (upsertError) {
        console.error("Upsert Fantasy Team Captain Error:", upsertError);
        return { error: true, message: "Failed to save fantasy team captain" };
      }

      return {
        error: false,
        message: "Fantasy team captain saved successfully",
      };
    }

    return { error: true, message: "User not authenticated" };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { error: true, message: "Unexpected error occurred" };
  }
}
