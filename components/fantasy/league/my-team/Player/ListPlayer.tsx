import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Player } from "../Lists/PlayersList";

interface CanAddResult {
  canAdd: boolean;
  reason?: string;
}

interface PlayerProps {
  player: Player;
  onSelect: () => void;
  isSelected: boolean;
  isCaptain?: boolean;
  onSetCaptain?: () => void;
  canAddPlayer: (player: Player) => CanAddResult;
  showBuyable: boolean;
}

const MAX_NAME_LENGTH = 13;

const ListPlayer = ({
  player,
  onSelect,
  isSelected,
  canAddPlayer,
  showBuyable,
}: PlayerProps) => {
  const { canAdd, reason } = canAddPlayer(player);

  if (showBuyable && !canAdd) return null;

  const shortenPlayerName = (name: string) => {
    const nameParts = name.split(" ");
    const lastName = nameParts.slice(0, 1);
    const firstNameParts = nameParts;
    let formattedName = `${lastName} ${firstNameParts.join(" ")}`;
    if (formattedName.length > MAX_NAME_LENGTH) {
      const shortenedFirstName = `${firstNameParts[1][0]}.`;
      formattedName = `${lastName} ${shortenedFirstName}`;
    }

    return formattedName;
  };

  return (
    <Card className={`my-1 border-0 bg-gray-900 shadow-none`}>
      <CardContent className="flex flex-col gap-1 p-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10">
              <img
                src="/images/teams/nemecek.png"
                className="rounded-full object-contain"
                alt={player.name}
              />
            </div>
            <div className="flex w-[120px] flex-col gap-1">
              <div className="text-sm leading-none">
                {shortenPlayerName(player.name)}
              </div>
              <div className="text-xs font-medium text-gray-400">
                {player.teamShortName} &#x2022; {player.position}{" "}
              </div>
            </div>
          </div>
          <div className="">
            <span className="text-md mr-0.5">{player.value.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">m</span>
          </div>
          <Button
            variant="outline"
            onClick={onSelect}
            disabled={!canAdd ? (isSelected ? false : true) : false}
            className={`ml-1 flex items-center gap-2 ${
              isSelected ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            {isSelected ? (
              <Trash2 className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            {isSelected ? "Sell" : "Buy"}
          </Button>
        </div>
        {!canAdd && reason && !isSelected && (
          <div className="mt-1 self-end text-xs text-red-500">{reason}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ListPlayer;
