"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyTeam({ params }: { params: { league: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/fantasy/${params.league}/overview `);
  }, []);

  return null;
}
