import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PrivateRankCardProps {
  name: string;
  rank: number;
  members: number;
  position: "up" | "down";
}

const PrivateRankCard = ({
  name,
  members,
  rank,
  position,
}: PrivateRankCardProps) => {
  return (
    <Card className="border-0 bg-gray-900">
      <CardContent className="h-full py-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-md font-semibold">{name}</div>
            <div className="text-xs font-semibold text-gray-400">
              {members} members
            </div>
          </div>
          <div>
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex flex-row items-center gap-1 text-xl font-bold">
                {rank}

                {position == "down" ? (
                  <ChevronDown
                    height={20}
                    width={20}
                    className="text-red-500"
                  />
                ) : (
                  <ChevronUp
                    height={20}
                    width={20}
                    className="text-green-500"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivateRankCard;
