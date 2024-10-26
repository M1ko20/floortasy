"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import TopPlayersPlayer from "./Player";

const BestValue = () => {
  return (
    <CarouselItem className="basis-4/5 pl-2">
      <div className="p-1">
        <Card className="border-t-0">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="w-full rounded-t-lg bg-gray-900 p-3">
              <div className="mb-4 text-xl">Best value (pts per $)</div>
              <TopPlayersPlayer
                rank="1"
                points={5.2}
                name="Karničnik"
                state="Slovenia"
                position="FWD"
                pointsClass="text-2xl font-bold"
              />
            </div>
            <div className="flex w-full flex-col gap-5 p-3">
              <TopPlayersPlayer
                rank="2"
                points={4.7}
                name="Karničnik"
                state="Slovenia"
                position="FWD"
                pointsClass="text-xl font-semibold"
              />
              <TopPlayersPlayer
                rank="3"
                points={4.5}
                name="Karničnik"
                state="Slovenia"
                position="FWD"
                pointsClass="text-lg font-semibold"
              />
              <TopPlayersPlayer
                rank="="
                points={4.2}
                name="Karničnik"
                state="Slovenia"
                position="FWD"
                pointsClass="text-lg font-semibold"
              />
              <TopPlayersPlayer
                rank="="
                points={4.2}
                name="Karničnik"
                state="Slovenia"
                position="FWD"
                pointsClass="text-lg font-semibold"
              />
            </div>
            <div className="self-start p-3 text-sm font-semibold underline">
              Show more
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default BestValue;
