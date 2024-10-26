"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Equal } from "lucide-react";
import { CardSkeleton } from "../my-team/Team/TeamInfo";
import {
  getLastMatchDayLeaderboard,
  getLeaderboard,
} from "@/actions/leaderboards";

interface Leaderboard {
  rank: number;
  points: number;
  last_rank: number;
}

interface MatchdayLeaderboard {
  rank: number;
  points: number;
  matchday: number;
}

const Ranking = ({ league }: { league: string }) => {
  const [loading, setLoading] = useState(true);
  const [rankingData, setRankingData] = useState<Leaderboard | null>(null);
  const [matchdayRankingData, setmatchdayRankingData] =
    useState<MatchdayLeaderboard | null>(null);

  useEffect(() => {
    const fetchRankingData = async () => {
      setLoading(true);
      try {
        const result = await getLeaderboard({
          league: league,
          season: "2024/2025",
        });

        const resultMachday = await getLastMatchDayLeaderboard({
          league: league,
          season: "2024/2025",
        });

        setmatchdayRankingData(resultMachday);
        setRankingData(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchRankingData();
  }, [league]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Your ranking</CardTitle>
          </CardHeader>
          <CardContent className="px-5">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getChevronIcon = () => {
    if (rankingData) {
      if (rankingData.rank === rankingData.last_rank)
        return <Equal className="text-gray-400" />;
      return rankingData.rank < rankingData.last_rank ? (
        <ChevronUp className="text-green-500" />
      ) : (
        <ChevronDown className="text-red-500" />
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Your ranking</CardTitle>
        </CardHeader>
        <CardContent className="px-5">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              {rankingData && (
                <>
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div className="relative flex flex-row items-end gap-1 px-5 text-4xl font-bold">
                          {rankingData.rank}
                          {getChevronIcon() && (
                            <div className="absolute -right-1 bottom-0">
                              {getChevronIcon()}
                            </div>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          total rank
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div className="flex flex-row items-end gap-1 px-5 text-4xl font-bold">
                          {rankingData.points}
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          total points
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {matchdayRankingData && (
                <>
                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div className="flex flex-row items-end gap-1 px-5 text-4xl font-bold">
                          {matchdayRankingData.rank}
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          {matchdayRankingData.matchday} MD rank
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-[120px] border-0 bg-gray-900">
                    <CardContent className="h-full py-5">
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                        <div className="flex flex-row items-end gap-1 px-5 text-4xl font-bold">
                          {matchdayRankingData.points}
                        </div>
                        <div className="text-xs font-semibold text-gray-400">
                          MD points
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ranking;
