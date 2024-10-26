import Deadline from "@/components/fantasy/league/overview/Deadline";
import PlayersInAction from "@/components/fantasy/league/overview/PlayersInAction";
import Ranking from "@/components/fantasy/league/overview/Ranking";
import TopPlayers from "@/components/fantasy/league/overview/TopPlayers";

export default async function Overview({
  params,
}: {
  params: { league: string };
}) {
  return (
    <div className="my-8 flex flex-col gap-5">
      <Deadline league={params.league} />
      <PlayersInAction />
      <Ranking league={params.league} />
      <TopPlayers />
    </div>
  );
}
