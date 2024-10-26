import LeagueList from "@/components/fantasy/inc/LeagueList";
import Title from "@/components/fantasy/inc/Title";

export default function Leagues() {
  return (
    <div className="container mx-auto my-8">
      <div className="mb-8 flex flex-col">
        <Title text={"Competitions"} />
      </div>

      <LeagueList />
    </div>
  );
}
