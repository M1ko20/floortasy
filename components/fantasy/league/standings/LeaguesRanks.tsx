import PrivateRankCard from "./PrivateRankCard";

const LeagueRanks = () => {
  return (
    <div className="flex flex-col gap-4">
      <PrivateRankCard
        name="Liga mistrů"
        members={6}
        rank={100}
        position="down"
      />

      <PrivateRankCard
        name="Evropská liga"
        members={2}
        rank={20}
        position="up"
      />
    </div>
  );
};

export default LeagueRanks;
