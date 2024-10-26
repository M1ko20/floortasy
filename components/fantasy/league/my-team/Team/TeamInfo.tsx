import { Info, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger2,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Matchday } from "../Matchdays/MatchdaySelect";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getLastMatchDayLeaderboard,
  getLeaderboard,
} from "@/actions/leaderboards";
import { getCurrentMatchDay } from "@/actions/matchdays";

interface TeamInfoProps {
  selectedPlayers: { position: string }[];
  captainId: number | null;
  totalValue: number;
  loading: boolean;
  matchday: Matchday | undefined;
  league: string;
}

const TeamInfo: React.FC<TeamInfoProps> = ({
  selectedPlayers,
  captainId,
  totalValue,
  loading,
  matchday,
  league,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const [lastMatchdayPoints, setLastMatchdayPoints] = useState(0);
  const [lastMatchdayRank, setLastMatchdayRank] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalRank, setTotalRank] = useState(0);
  const [lastMatchday, setLastMatchday] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const leaderboard = await getLeaderboard({ league, season: "2024/2025" });
      const lastMatchdayLeaderboard = await getLastMatchDayLeaderboard({
        league,
        season: "2024/2025",
      });

      if (leaderboard) {
        setTotalPoints(leaderboard.points);
        setTotalRank(leaderboard.rank);
      }

      if (leaderboard) {
        setTotalPoints(leaderboard.points);
        setTotalRank(leaderboard.rank);
      }

      if (lastMatchdayLeaderboard) {
      
        setLastMatchdayPoints(lastMatchdayLeaderboard.points);
        setLastMatchdayRank(lastMatchdayLeaderboard.rank);
        setLastMatchday(lastMatchdayLeaderboard.matchday);
      }
    }

    fetchData();
  }, [league]);

  const handleAccordionChange = (value: string) => {
    setOpenAccordion(value);
  };

  const fwdCount = selectedPlayers.filter(
    (player) => player.position === "FWD",
  ).length;
  const defCount = selectedPlayers.filter(
    (player) => player.position === "DEF",
  ).length;
  const gkCount = selectedPlayers.filter(
    (player) => player.position === "GK",
  ).length;

  const maxMoney = 100;
  const remainingMoney = maxMoney - totalValue;

  const countdownToDeadline = (deadline: string): string => {
    const deadlineDate = new Date(deadline);
    const now = new Date();

    const timeDiff = deadlineDate.getTime() - now.getTime();

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m`;
  };

  const getDeadlineStatus = () => {
    if (!matchday) return "";

    const { finished, counting, current, deadline } = matchday;

    if (finished) {
      return "The matchday already ended";
    }

    if (counting) {
      return "The matchday points are counting";
    }

    if (current) {
      return `Deadline: ${countdownToDeadline(deadline)}`;
    }

    return "";
  };

  const isPlayerCountValid =
    fwdCount === 6 && defCount === 4 && gkCount === 1 && captainId !== null;

  const getTextColor = (count: number, max: number) => {
    return count < max ? "text-red-500" : "text-white";
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        value={openAccordion}
        onValueChange={handleAccordionChange}
        className="flex flex-col gap-2"
      >
        <AccordionItem value="team-info" className="border-0">
          <div className="flex w-full items-center justify-between gap-5">
            <div className="flex w-full flex-row items-center gap-2">
              {loading ? (
                <Skeleton className="h-7 w-full rounded-lg" />
              ) : (
                <div>{getDeadlineStatus()}</div>
              )}
            </div>
            <AccordionTrigger2 asChild>
              <Button
                variant={
                  openAccordion === "team-info" ? "default" : "secondary"
                }
                className="flex items-center justify-center border-0 p-2"
              >
                <Info size={30} />
              </Button>
            </AccordionTrigger2>
          </div>

          <AccordionContent className="pt-2">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                {loading ? (
                  <CardSkeleton />
                ) : (
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div className="flex flex-row items-end gap-1 px-5 text-4xl font-bold">
                          {totalPoints}
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          total points
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loading ? (
                  <CardSkeleton />
                ) : (
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div className="relative flex flex-row items-end gap-1 px-5 text-4xl font-bold">
                          {totalRank}
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          total rank
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loading ? (
                  <CardSkeleton />
                ) : (
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div className="relative flex flex-row items-end gap-1 px-5 text-4xl font-bold">
                          {lastMatchdayPoints}
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          {lastMatchday} MD points
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loading ? (
                  <CardSkeleton />
                ) : (
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div className="relative flex flex-row items-end gap-1 px-5 text-4xl font-bold">
                          {lastMatchdayRank}
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          {lastMatchday} MD rank
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="player-count" className="border-0">
          <div className="flex w-full items-center justify-between gap-5">
            {loading ? (
              <div className="flex w-full flex-row items-center gap-2">
                <Skeleton className="h-7 w-20 rounded" />
                <Skeleton className="h-7 w-full rounded" />
              </div>
            ) : (
              <div className="flex w-full flex-row items-center gap-2">
                <div className="font-semibold">{remainingMoney}/100M</div>
                <Progress value={remainingMoney} />
              </div>
            )}
            <AccordionTrigger2 asChild>
              <Button
                variant={
                  openAccordion === "player-count"
                    ? "default"
                    : isPlayerCountValid
                      ? "secondary"
                      : "destructive"
                }
                className="flex items-center justify-center border-0 p-2"
              >
                <Users size={30} />
              </Button>
            </AccordionTrigger2>
          </div>

          <AccordionContent className="pt-2">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                {loading ? (
                  <CardSkeleton />
                ) : (
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div
                          className={`relative flex flex-row items-end gap-1 px-5 text-4xl font-bold ${getTextColor(fwdCount, 6)}`}
                        >
                          {fwdCount}/6
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          forwards
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loading ? (
                  <CardSkeleton />
                ) : (
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div
                          className={`relative flex flex-row items-end gap-1 px-5 text-4xl font-bold ${getTextColor(defCount, 4)}`}
                        >
                          {defCount}/4
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          defenders
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loading ? (
                  <CardSkeleton />
                ) : (
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div
                          className={`relative flex flex-row items-end gap-1 px-5 text-4xl font-bold ${getTextColor(gkCount, 1)}`}
                        >
                          {gkCount}/1
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          goalkeepers
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loading ? (
                  <CardSkeleton />
                ) : (
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div
                          className={`relative flex flex-row items-end gap-1 px-5 text-4xl font-bold ${getTextColor(captainId ? 1 : 0, 1)}`}
                        >
                          {captainId ? 1 : 0}/1
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          captain
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TeamInfo;

export const CardSkeleton = () => {
  return (
    <Card className="h-[120px] border-0 bg-gray-900">
      <CardContent className="h-full py-5">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-1 px-5 text-4xl font-bold">
            <Skeleton className="h-10 w-14 rounded" />
          </div>

          <Skeleton className="h-5 w-24 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};
