import Title from "@/components/fantasy/inc/Title";
import LastMatchDayRank from "@/components/fantasy/league/standings/LastMatchDayRank";
import PrivateRank from "@/components/fantasy/league/standings/PrivateRank";
import TotalRank from "@/components/fantasy/league/standings/TotalRank";

export default function Rankings() {
  return (
    <div className="my-8 flex flex-col gap-8">
      <Title text={"Standings"} />

      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">Private leagues</div>
        <PrivateRank />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">Public leaderboard</div>
        <div className="flex flex-col gap-4">
          <TotalRank />
          <LastMatchDayRank />
        </div>
      </div>
    </div>
  );
}
