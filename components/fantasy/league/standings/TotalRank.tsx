import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const TotalRank = () => {
  return (
    <Card className="border-0 bg-gray-900">
      <CardContent className="h-full py-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-md font-semibold">Total rank</div>
            <div className="text-xs font-semibold text-gray-400">
              500k+ members
            </div>
          </div>

          <div>
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex flex-row items-center gap-1 text-xl font-bold">
                100
                <ChevronDown height={20} width={20} className="text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalRank;
