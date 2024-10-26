"use client";

import { getDeadline } from "@/actions/matchdays";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCzechDate } from "@/lib/utils";
import { time } from "console";
import Link from "next/link";
import { useEffect, useState } from "react";

const Deadline = ({ league }: { league: string }) => {
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    const fetchDeadline = async () => {
      try {
        const result = await getDeadline({
          league: league,
          season: "2024/2025",
        });

        if (result) {
          setDeadline(new Date(result));
        }
      } catch (error) {
        console.error("Failed to fetch deadline:", error);
      }
    };

    fetchDeadline();
  }, [league]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (deadline) {
        const now = new Date();
        const timeDiff = deadline.getTime() - now.getTime();

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60),
          );

          setTimeLeft({ days, hours, minutes });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        }
      }
    };

    calculateTimeLeft();

    // Update countdown every minute
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <>
      {!timeLeft ? (
        <Card className="w-full border-0 bg-gray-900">
          <CardHeader className="pt-4 text-center">
            <CardTitle className="text-lg font-bold">
              Transfer Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-start justify-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="text-5xl font-bold">
                    <Skeleton className="h-12 w-14" />
                  </div>

                  <div className="text-xs font-semibold text-gray-400">
                    days
                  </div>
                </div>
                <div className="text-5xl font-bold">:</div>

                <div className="flex flex-col items-end">
                  <div className="text-5xl font-bold">
                    <Skeleton className="h-12 w-14" />
                  </div>
                  <div className="text-xs font-semibold text-gray-400">
                    hours
                  </div>
                </div>
                <div className="text-5xl font-bold">:</div>

                <div className="flex flex-col items-end">
                  <div className="text-5xl font-bold">
                    <Skeleton className="h-12 w-14" />
                  </div>
                  <div className="text-xs font-semibold text-gray-400">
                    minutes
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex h-[20px] items-center justify-center rounded-full bg-gray-800 px-5 py-3">
                  <div className="text-xs font-semibold text-gray-400">
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              </div>

              <Button asChild>
                <Link href="/fantasy/my-team">View team</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full border-0 bg-gray-900">
          <CardHeader className="pt-4 text-center">
            <CardTitle className="text-lg font-bold">
              Transfer Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-start justify-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="text-5xl font-bold">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs font-semibold text-gray-400">
                    days
                  </div>
                </div>
                <div className="text-5xl font-bold">:</div>

                <div className="flex flex-col items-end">
                  <div className="text-5xl font-bold">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs font-semibold text-gray-400">
                    hours
                  </div>
                </div>
                <div className="text-5xl font-bold">:</div>

                <div className="flex flex-col items-end">
                  <div className="text-5xl font-bold">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs font-semibold text-gray-400">
                    minutes
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex h-[20px] items-center justify-center rounded-full bg-gray-800 px-5 py-3">
                  <div className="text-xs font-semibold text-gray-400">
                    {deadline && formatCzechDate(deadline.toString())}
                  </div>
                </div>
              </div>

              <Button asChild>
                <Link href="/fantasy/my-team">View team</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Deadline;
