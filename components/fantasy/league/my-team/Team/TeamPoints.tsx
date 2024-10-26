import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface TeamNameProps {
  points: number;
  loading: boolean;
}

const TeamPoints = ({ points, loading }: TeamNameProps) => {
  return (
    <div className="flex h-full w-full">
      {loading ? (
        <Skeleton className="h-full w-full rounded-lg" />
      ) : (
        <div className="flex h-full w-full items-center justify-center gap-1 rounded-lg bg-gray-600 px-10 py-1">
          <span className="text-2xl font-bold">{points}</span>
          <span className="text-xs leading-none">pts</span>
        </div>
      )}
    </div>
  );
};

export default TeamPoints;
