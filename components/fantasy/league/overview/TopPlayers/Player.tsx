"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlayerProps {
  rank: string;
  points: number;
  name: string;
  state: string;
  position: "DEF" | "FWD" | "GK";
  pointsClass?: string;
}

const TopPlayersPlayer = ({
  rank,
  pointsClass,
  position,
  name,
  state,
  points,
}: PlayerProps) => {
  return (
    <Card className="my-1 border-0 bg-transparent shadow-none">
      <CardContent className="flex flex-col items-center justify-center p-0">
        <div className="flex w-full flex-row items-center justify-between px-1">
          <div className="flex w-full flex-row items-center gap-3">
            <div className="text-xs">{rank}</div>
            <div className="h-[40px] w-[40px]">
              <img
                src="https://img.uefa.com/imgml/TP/players/3/2024/324x324/250103527.jpg?v=0.06"
                className="rounded-full object-contain"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-md leading-none">{name}</div>
              <div className="text-xs font-medium text-gray-400">
                {state} &#x2022; {position}
              </div>
            </div>
          </div>
          <div className={cn(pointsClass)}>{points}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPlayersPlayer;
