"use client";

import { Carousel, CarouselContent } from "@/components/ui/carousel";
import TopPointsScorers from "./TopPlayers/TopPointsScorers";
import BestValue from "./TopPlayers/BestValue";
import Goals from "./TopPlayers/Goals";

const TopPlayers = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2">
        <TopPointsScorers />
        <BestValue />
        <Goals />
      </CarouselContent>
    </Carousel>
  );
};

export default TopPlayers;
