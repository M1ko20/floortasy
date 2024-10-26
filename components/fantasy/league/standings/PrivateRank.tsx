import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import LeagueRanks from "./LeaguesRanks";
import { Button } from "@/components/ui/button";

const PrivateRank = () => {
  return (
    <div className="flex flex-col gap-4">
      <LeagueRanks />

      <Card className="w-full bg-gray-900">
        <CardContent className="p-5">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-0">
                <CardContent className="h-full p-4">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                    <div className="text-center text-xs font-medium">
                      Do you have a league code?
                    </div>
                    <Button className="h-8 w-full p-0" variant="secondary">
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0">
                <CardContent className="h-full p-4">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                    <div className="text-center text-xs font-medium">
                      Looking to start a league?
                    </div>
                    <Button className="h-8 w-full p-0" variant="secondary">
                      Create
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivateRank;
