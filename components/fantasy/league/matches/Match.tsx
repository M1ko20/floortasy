import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Goal,
  Handshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatCzechDate } from "@/lib/utils";
import { getGoalsForMatch } from "@/actions/matches"; // Adjust import path as necessary
import Link from "next/link";
import { Match as MatchProps } from "./List";

export interface Team {
  id: string;
  short_name: string;
}

const formatPlayerName = (name: string) => {
  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0]; // Single word name
  }
  const lastName = parts.pop(); // Last word is the last name
  const firstNames = parts.map((part) => part.charAt(0).toUpperCase() + "."); // First names abbreviated
  return [...firstNames, lastName].join(" ");
};

const Match: React.FC<MatchProps> = ({
  index,
  id,
  home_team,
  away_team,
  start,
  status,
  home_score,
  away_score,
  info,
  cf_url,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [goalsData, setGoalsData] = useState<
    { goal: string; assist: string; team: string }[] | null
  >(null);
  const [playersData, setPlayersData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isExpanded && id) {
      (async () => {
        const data = await getGoalsForMatch(id);
        if (data) {
          setGoalsData(data.goals);
          const playersMap = data.players.reduce(
            (acc, player) => {
              acc[player.id] = formatPlayerName(player.name);
              return acc;
            },
            {} as { [key: string]: string },
          );
          setPlayersData(playersMap);
        } else {
          setGoalsData(null);
        }
      })();
    }
  }, [isExpanded, id]);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const lastHomeScore =
    home_score.length > 0 ? home_score[home_score.length - 1] : 0;
  const lastAwayScore =
    away_score.length > 0 ? away_score[away_score.length - 1] : 0;

  const countOccurrences = (key: "goal" | "assist", team: "home" | "away") => {
    if (!goalsData) return {};
    const counts: { [key: string]: number } = {};
    goalsData
      .filter((entry) => entry.team === team)
      .forEach((entry) => {
        if (entry[key]) {
          counts[entry[key]] = (counts[entry[key]] || 0) + 1;
        }
      });
    return counts;
  };

  const homeGoalsCount = countOccurrences("goal", "home");
  const awayGoalsCount = countOccurrences("goal", "away");
  const homeAssistsCount = countOccurrences("assist", "home");
  const awayAssistsCount = countOccurrences("assist", "away");

  return (
    <Card key={index} className="mb-3 w-full border-0 bg-gray-900 pb-3">
      <CardContent className="flex flex-col items-center p-0 pb-2 pt-5">
        <div className="flex w-full max-w-lg items-center justify-between">
          <div className="flex w-5/12 items-center justify-end gap-3">
            <span className="text-end text-sm font-semibold">
              {home_team?.short_name || "Unknown"}
            </span>
            {home_team.id ? (
              <div className="relative h-8 w-8">
                <Image
                  src={`/images/teams/${home_team.id}/logo.png`}
                  alt={`${home_team?.short_name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <CircleHelp className="h-8 w-8" />
            )}
          </div>
          <span className="text-lg font-bold">
            {lastHomeScore}:{lastAwayScore}
          </span>
          <div className="flex w-5/12 items-center justify-start gap-3">
            {away_team.id ? (
              <div className="relative h-8 w-8">
                <Image
                  src={`/images/teams/${away_team.id}/logo.png`}
                  alt={`${away_team?.short_name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <CircleHelp className="h-8 w-8" />
            )}

            <span className="text-start text-sm font-semibold">
              {away_team?.short_name || "Unknown"}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <span className="text-center text-xs text-gray-400">{info}</span>
          {status === "not_started" ? (
            <Badge>{formatCzechDate(start)}</Badge>
          ) : (
            <Badge>{formatStatus(status)}</Badge>
          )}
        </div>

        {status !== "not_started" && (
          <div className="mt-3 flex w-full justify-center">
            <div
              className="flex cursor-pointer flex-row items-center gap-1 text-xs"
              onClick={toggleDetails}
            >
              {isExpanded ? "Hide match details" : "Show match details"}{" "}
              {isExpanded ? (
                <ChevronUp height={15} width={15} />
              ) : (
                <ChevronDown height={15} width={15} />
              )}
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="animate-fade-in mt-3 flex w-full flex-col items-center p-2">
            <div>
              <span className="text-lg font-semibold text-gray-400">
                {lastHomeScore}:{lastAwayScore}
              </span>{" "}
              <span className="text-sm text-gray-400">(0:0, 0:0, 0:0)</span>
            </div>
            <div className="mt-3 flex w-full flex-col items-center border-t-2 pt-3">
              <span className="text-lg font-semibold">Goals</span>
              <div className="flex w-full py-2">
                <div className="flex w-5/12 flex-col items-end">
                  {goalsData ? (
                    Object.entries(homeGoalsCount).map(
                      ([playerId, count], index) => (
                        <div key={index} className="text-sm text-gray-300">
                          {playersData[playerId] || "Unknown"}
                          {count > 1 ? ` (${count})` : ""}
                        </div>
                      ),
                    )
                  ) : (
                    <div className="flex w-full flex-col gap-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  )}
                </div>
                <div className="flex w-2/12 justify-center">
                  <Goal size={25} />
                </div>
                <div className="flex w-5/12 flex-col items-start">
                  {goalsData ? (
                    Object.entries(awayGoalsCount).map(
                      ([playerId, count], index) => (
                        <div key={index} className="text-sm text-gray-300">
                          {playersData[playerId] || "Unknown"}
                          {count > 1 ? ` (${count})` : ""}
                        </div>
                      ),
                    )
                  ) : (
                    <div className="flex w-full flex-col gap-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 flex w-full flex-col items-center border-t-2 pt-3">
              <span className="text-lg font-semibold">Assists</span>
              <div className="flex w-full py-2">
                <div className="flex w-5/12 flex-col items-end">
                  {goalsData ? (
                    Object.entries(homeAssistsCount).map(
                      ([playerId, count], index) => (
                        <div key={index} className="text-sm text-gray-300">
                          {playersData[playerId] || "Unknown"}
                          {count > 1 ? ` (${count})` : ""}
                        </div>
                      ),
                    )
                  ) : (
                    <div className="flex w-full flex-col gap-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  )}
                </div>
                <div className="flex w-2/12 justify-center">
                  <Handshake size={25} />
                </div>
                <div className="flex w-5/12 flex-col items-start">
                  {goalsData ? (
                    Object.entries(awayAssistsCount).map(
                      ([playerId, count], index) => (
                        <div key={index} className="text-sm text-gray-300">
                          {playersData[playerId] || "Unknown"}
                          {count > 1 ? ` (${count})` : ""}
                        </div>
                      ),
                    )
                  ) : (
                    <div className="flex w-full flex-col gap-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {cf_url && (
              <div className="mt-3 flex w-full flex-col items-center border-t-2 pt-3">
                <Link
                  href={cf_url}
                  target="_blank"
                  className="text-sm underline"
                >
                  go to match page
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Match;

export const MatchSkeleton = () => {
  return (
    <Card className="mb-3 h-[100px] w-full border-0 bg-gray-900">
      <CardContent className="flex flex-col justify-center gap-4 p-0 pb-2 pt-5">
        <div className="flex items-center justify-center gap-5">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-24" />
        </div>
        <div className="flex w-full justify-center">
          <Skeleton className="h-5 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};
