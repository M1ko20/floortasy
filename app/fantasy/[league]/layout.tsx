"use client";

import Menu from "@/components/fantasy/inc/Menu";
import LeagueName from "@/components/fantasy/inc/LeagueName";

import supabase from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/inc/Loading";
import { getLeague } from "@/actions/league";
import { getFantasyTeam } from "@/actions/fantasy";

export default function MyTeamLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { league: string };
}>) {
  const router = useRouter();

  const [leagueExist, setLeagueExist] = useState(false);
  const [leagueName, setLeagueName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeague({
        code: params.league,
        season: "2024/2025",
      });
      if (data) {
        setLeagueExist(true);
        setLeagueName(data.name);
      } else router.push(`/fantasy/`);
    };

    const checkFantasyTeam = async () => {
      const fantasyTeam = await getFantasyTeam({
        league: params.league,
        season: "2024/2025",
      });

      if (!fantasyTeam) {
        router.push("/fantasy");
      }
    };

    checkFantasyTeam();

    fetchData();
  }, [params.league]);

  return (
    <div>
      {leagueExist ? (
        <div className="flex flex-col">
          <LeagueName name={leagueName} />
          <Menu league={params.league} />
          <div className="container mx-auto">{children}</div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
