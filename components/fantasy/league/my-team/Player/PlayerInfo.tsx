"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { useState } from "react";
import PlayerInfoMatchdays from "./PlayerInfoMatchdays";
import { CardSkeleton } from "../Team/TeamInfo";

interface PlayerInfoProps {
  name: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelect: () => void;
  isSelected: boolean;
  isCaptain?: boolean;
  onSetCaptain?: () => void;
  id: number;
  team: string;
  position: "DEF" | "FWD" | "GK";
  points: number;
  state: string;
  value: number;
  currentMatchday: boolean;
  selectedMatchday: number;
  teamName?: string;
}

const positions = {
  DEF: "Defender",
  FWD: "Forward",
  GK: "Goalkeeper",
};

export function PlayerInfo({
  name,
  open,
  setOpen,
  onSelect,
  onSetCaptain,
  isCaptain,
  isSelected,
  team,
  points,
  value,
  position,
  currentMatchday,
  selectedMatchday,
  teamName,
}: PlayerInfoProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="my-3 max-w-[360px] sm:max-w-[425px]">
        <DialogTitle></DialogTitle>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-row">
            <div className="max-w-[150px]">
              <img
                src="/images/teams/nemecek.png"
                className="rounded-full object-contain"
                alt={`${name} image`}
              />
            </div>
            <div className="flex flex-col gap-1 px-5">
              <span className="text-lg font-semibold">{name}</span>
              <Badge className="whitespace-nowrap">{teamName}</Badge>
              <span>{positions[position]}</span>
            </div>
          </div>

          {currentMatchday && (
            <div className="flex flex-col items-center justify-center gap-2">
              {onSetCaptain && (
                <Button
                  onClick={onSetCaptain}
                  className="w-full bg-yellow-500 text-white"
                  disabled={isCaptain}
                >
                  {isCaptain ? "Already Captain" : "Make Captain"}
                </Button>
              )}
              <Button
                className={cn(
                  "w-full",
                  isSelected
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white",
                )}
                onClick={onSelect}
              >
                {isSelected ? "Sell" : "Buy"}
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {loading ? (
              <CardSkeleton />
            ) : (
              <>
                <Card className="h-[120px] border-0 bg-gray-900">
                  <CardContent className="h-full py-5">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                      <div className="text-4xl font-bold">{points}</div>
                      <div className="text-xs font-semibold text-gray-400">
                        Total Points
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="h-[120px] border-0 bg-gray-900">
                  <CardContent className="h-full py-5">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                      <div className="text-4xl font-bold">
                        {value.toFixed(1)}m
                      </div>
                      <div className="text-xs font-semibold text-gray-400">
                        Price
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <PlayerInfoMatchdays />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerInfo;
