import MatchList from "@/components/fantasy/league/matches/List";

export default function Matches({ params }: { params: { league: string } }) {
  return (
    <div className="flex items-start justify-start">
      <MatchList league={params.league} />
    </div>
  );
}
