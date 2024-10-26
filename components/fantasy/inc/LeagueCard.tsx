import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreateFantasyTeam } from "./createTeam/CreateFantasyTeam";
import { formatCzechDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LeagueProps {
  league: string;
  name: string;
  season: string;
  team: boolean;
  image: string;
  players: number;
  rank: number;
  matchday: string;
  teamName: string;
}

const LeagueCard = ({
  league,
  name,
  season,
  team,
  image,
  rank,
  players,
  matchday,
  teamName,
}: LeagueProps) => {
  return (
    <Card className="m-0 w-full border-0 bg-gray-900">
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={image}
            alt={`${name} logo`}
            fill
            className="rounded-t-md object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{name}</span>
            <span className="text-sm font-semibold">{season}</span>
          </div>

          <div className="flex flex-col gap-1">
            {team && (
              <div className="flex w-full justify-between">
                <span className="text-md font-bold">{teamName}</span>
                <span className="text-md font-semibold">{rank}.</span>
              </div>
            )}
            <div className="flex w-full justify-between">
              <span className="text-xs">number of teams</span>
              <span className="text-xs font-semibold">{players}</span>
            </div>

            <div className="flex w-full justify-between">
              <span className="text-xs">next matchday</span>
              <span className="text-xs font-semibold">
                {formatCzechDate(matchday)}
              </span>
            </div>
          </div>

          {team ? (
            <Button asChild>
              <Link href={`/fantasy/${league}/overview`}>View team</Link>
            </Button>
          ) : (
            <CreateFantasyTeam league={league} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeagueCard;

export const LeagueSkeleton = () => {
  return (
    <Card className="m-0 w-full border-0 bg-gray-900">
      <CardContent className="p-0">
        <Skeleton className="relative h-40 w-full" />
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex w-full justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>

            <div className="flex w-full justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>

          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};
