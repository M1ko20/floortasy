"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface LeagueNameProps {
  name: string;
}

const LeagueName = ({ name }: LeagueNameProps) => {
  return (
    <div>
      <div className="mx-2 mb-2 flex h-full flex-row items-center">
        <Link href="/fantasy" className="flex items-center">
          <ChevronLeft height={15} width={15} />
        </Link>
        <span className="text-sm font-semibold">all competitions</span>
      </div>
      <div className="w-full bg-red-500 py-4">
        <div className="container mx-auto flex h-full flex-col items-start justify-center gap-1">
          <span className="pl-1 text-xl font-semibold tracking-wide">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeagueName;
