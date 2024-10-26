"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayerInfo } from "./PlayerInfo";
import { useState } from "react";
import { Star } from "lucide-react";

interface PlayerProps {
  id: number;
  name: string;
  team: string;
  position: "DEF" | "FWD" | "GK";
  rank: number;
  points: number;
  state: string;
  value: number;
  league: string;
  onSelect: () => void;
  isSelected: boolean;
  isCaptain?: boolean;
  onSetCaptain?: () => void;
  currentMatchday: boolean;
  selectedMatchday: number;
  teamName?: string;
}

const SelectedPlayer = ({
  id,
  name,
  team,
  position,
  points,
  state,
  value,
  onSelect,
  isCaptain = false,
  onSetCaptain,
  currentMatchday,
  selectedMatchday,
  teamName,
}: PlayerProps) => {
  const [open, setOpen] = useState(false);

  const [firstName, lastName] = name.split(" ");

  return (
    <>
      <Card
        className="w-full max-w-[171px] cursor-pointer border-0 bg-gray-900 md:w-[200px] md:max-w-full"
        onClick={() => setOpen(true)}
      >
        <CardContent className="flex flex-col items-center p-0 text-white">
          <div className="relative h-[150px] w-full md:w-[171px]">
            <img
              src="/images/teams/nemecek.png"
              className="absolute -top-5 left-1/2 max-w-full -translate-x-1/2 transform object-contain"
              alt={`${name} image`}
            />
            <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 transform">
              <Badge className="whitespace-nowrap">{teamName}</Badge>
            </div>
            {isCaptain && (
              <Star
                color="#fde047"
                fill="#fde047"
                className="absolute right-2 top-3"
              />
            )}
          </div>
          <div className="mt-2 flex w-full flex-col">
            <div className="flex w-full flex-col items-center justify-center">
              <span className="text-sm uppercase leading-none tracking-wider">
                {lastName}
              </span>
              <span className="leading-1 text-lg font-bold uppercase tracking-wider">
                {firstName}
              </span>
            </div>
            <div className="mb-4 mt-3 px-2">
              <div className="flex w-full items-center justify-center gap-1 rounded-xl bg-gray-600 py-1">
                <span className="text-3xl font-bold">{points}</span>
                <span className="text-xs leading-none">pts</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PlayerInfo
        name={name}
        open={open}
        setOpen={setOpen}
        onSelect={onSelect}
        isSelected={true}
        isCaptain={isCaptain}
        onSetCaptain={onSetCaptain}
        points={points}
        state={state}
        position={position}
        value={value}
        team={team}
        id={id}
        currentMatchday={currentMatchday}
        selectedMatchday={selectedMatchday}
        teamName={teamName}
      />
    </>
  );
};

export default SelectedPlayer;
