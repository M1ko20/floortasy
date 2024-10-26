import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlaceholderPlayerProps {
  onOpenDialog: () => void;
  currentMatchday: boolean;
}

const PlaceholderPlayer: React.FC<PlaceholderPlayerProps> = ({
  onOpenDialog,
  currentMatchday,
}) => {
  const handleClick = () => {
    if (currentMatchday) {
      onOpenDialog();
    }
  };

  return (
    <Card
      className="h-[272px] w-full max-w-[171px] cursor-pointer border-0 bg-gray-900"
      onClick={handleClick}
    >
      <CardContent className="flex h-full w-full flex-col items-center justify-center p-0 text-white">
        <Button disabled={!currentMatchday}>Buy player</Button>
      </CardContent>
    </Card>
  );
};

export default PlaceholderPlayer;
