"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Match, { MatchSkeleton, Team } from "./Match";
import { getMatchDetails, getMatches } from "@/actions/matches";
import { getCurrentMatchDay } from "@/actions/matchdays";
import { Skeleton } from "@/components/ui/skeleton";

export interface Match {
  id: number;
  home_team: Team;
  away_team: Team;
  start: string;
  status: string;
  matchday: number;
  home_score: [];
  away_score: [];
  info: string;
  cf_url?: string;
  index?: number;
}

const MatchList = ({ league }: { league: string }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMatchday, setCurrentMatchday] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchday = await getCurrentMatchDay({
          season: "2024/2025",
          league,
        });
        setCurrentMatchday(matchday ? matchday.toString() : null);

        const data = await getMatchDetails({ league, season: "2024/2025" });
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [league]);

  const matchdays = Array.from(
    new Set(matches.map((match) => match.matchday)),
  ).sort((a, b) => a - b);

  return (
    <>
      {loading ? (
        <div className="w-full">
          <div className="flex flex-row space-x-3 py-5">
            <Skeleton className="h-[32px] w-[120px] rounded-full" />
            <Skeleton className="h-[32px] w-[120px] rounded-full" />
            <Skeleton className="h-[32px] w-[120px] rounded-full" />
          </div>
          <div className="flex w-full flex-col">
            <MatchSkeleton />
            <MatchSkeleton />
            <MatchSkeleton />
            <MatchSkeleton />
          </div>
        </div>
      ) : (
        <Tabs
          defaultValue={currentMatchday || matchdays[0]?.toString()}
          className="my-0 w-full"
        >
          <TabsList className="no-scrollbar flex h-full w-full justify-start space-x-3 overflow-x-scroll border-0 bg-transparent py-5">
            {matchdays.map((day) => (
              <TabsTrigger
                key={day}
                value={day.toString()}
                className="rounded-full bg-gray-800 data-[state=active]:bg-gray-400 data-[state=active]:text-black"
              >
                <div className="text-md">Matchday {day}</div>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex flex-col">
            {matchdays.map((day) => (
              <TabsContent key={day} value={day.toString()} className="">
                <div>
                  {matches
                    .filter((match) => match.matchday === day)
                    .map((match, index) => (
                      <Match
                        key={index}
                        index={index}
                        id={match.id}
                        home_team={match.home_team}
                        away_team={match.away_team}
                        start={match.start}
                        status={match.status}
                        home_score={match.home_score}
                        away_score={match.away_score}
                        info={match.info}
                        cf_url={match.cf_url}
                        matchday={match.matchday}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      )}
    </>
  );
};

export default MatchList;
