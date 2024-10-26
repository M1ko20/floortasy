"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface MenuProps {
  league: string;
}

const Menu = ({ league }: MenuProps) => {
  const selectedSegment = useSelectedLayoutSegment();

  const links = [
    { href: `/fantasy/${league}/overview`, label: "Overview" },
    { href: `/fantasy/${league}/my-team`, label: "My team" },
    { href: `/fantasy/${league}/matches`, label: "Matches" },
    /*  { href: `/fantasy/${league}/statistics`, label: "Statistics" },
    { href: `/fantasy/${league}/standings`, label: "Standings" },
    { href: `/fantasy/${league}/news`, label: "News" },
    { href: `/fantasy/${league}/rules`, label: "Rules" },
    { href: `/fantasy/${league}/settings`, label: "Settings" }, */
  ];

  return (
    <div className="no-scrollbar flex h-[45px] bg-gray-900">
      <div className="no-scrollbar flex items-center space-x-4 overflow-x-auto whitespace-nowrap md:container md:mx-auto">
        {links.map((link) => {
          const isActive = selectedSegment === link.href.split("/").pop();
          return (
            <Link key={link.href} href={link.href} className="h-full">
              <div
                className={`flex h-full items-center justify-center px-3 text-sm font-semibold tracking-wide ${
                  isActive
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-white"
                }`}
              >
                {link.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
