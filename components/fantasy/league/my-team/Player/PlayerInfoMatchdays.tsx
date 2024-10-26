import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

const matchdays = [
  { md: "MD12", points: 1 },
  { md: "MD11", points: 0 },
  { md: "MD10", points: 8 },
  { md: "MD9", points: 12 },
  { md: "MD8", points: 2 },
  { md: "MD7", points: 6 },
  { md: "MD6", points: 8 },
  { md: "MD5", points: 2 },
  { md: "MD4", points: 8 },
  { md: "MD3", points: 12 },
  { md: "MD2", points: 0 },
  { md: "MD1", points: 1 },
];

const matchData = {
  teamA: "Spain",
  teamB: "England",
  scoreA: 2,
  scoreB: 1,
  stats: [
    { description: "61 minutes played", points: 2 },
    { description: "1 yellow card", points: -1 },
    { description: "1 ball recovered", points: 0 },
  ],
  totalPoints: 1,
};

const maxPoints = matchdays.reduce((max, matchday) => {
  return matchday.points > max ? matchday.points : max;
}, 0);

const PlayerInfoMatchdays = () => {
  const initialTab = matchdays[0].md;

  const [activeTab, setActiveTab] = useState(initialTab);

  const handleBarClick = (day: any) => {
    setActiveTab(day.md);
  };

  return (
    <Card>
      <CardContent className="max-w-[308px] rounded bg-gray-900 p-0">
        <div className="no-scrollbar flex h-[150px] max-w-[308px] overflow-x-auto pb-10 pt-5">
          <div className="flex items-end p-0">
            {matchdays.map((matchday) => (
              <div
                className={cn("flex h-full w-[60px] items-end px-1")}
                onClick={() => handleBarClick(matchday)}
                key={matchday.md}
              >
                <div
                  key={matchday.md}
                  className={cn(
                    "relative flex w-[60px] cursor-pointer items-center justify-center rounded",
                    activeTab == matchday.md ? "bg-red-500" : "bg-blue-600",
                  )}
                  style={{
                    height: `${100 * (matchday.points / maxPoints) + 10}%`,
                  }}
                >
                  {matchday.points > 2 ? (
                    <div className="absolute top-0">{matchday.points}</div>
                  ) : (
                    <div className="absolute -top-7">{matchday.points}</div>
                  )}
                  <div className="absolute -bottom-7 text-[12px] text-muted-foreground">
                    {matchday.md}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="MD1" value={activeTab} className="p-4">
          {matchdays.map((matchday) => (
            <TabsContent value={matchday.md} key={matchday.md}>
              <div className="mb-4 flex w-full items-center justify-center">
                <div className="flex items-center gap-2">
                  <span>{matchData.teamA}</span>
                  <span>{matchData.scoreA}</span>
                  <span>-</span>
                  <span>{matchData.scoreB}</span>
                  <span>{matchData.teamB}</span>
                </div>
              </div>

              <div className="space-y-2">
                {matchData.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-800"
                  >
                    <span>{stat.description}</span>
                    <span>{stat.points} pts</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between font-bold">
                <span>Total points</span>
                <span>{matchData.totalPoints} pts</span>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlayerInfoMatchdays;
