import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PlayersInAction = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">4 players in action</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Button>View team</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayersInAction;
