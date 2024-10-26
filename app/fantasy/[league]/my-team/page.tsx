import MyTeam from "@/components/fantasy/league/my-team/MyTeam";

export default function TeamPage({ params }: { params: { league: string } }) {
  return (
    <div className="my-5">
      <MyTeam league={params.league} />
    </div>
  );
}
