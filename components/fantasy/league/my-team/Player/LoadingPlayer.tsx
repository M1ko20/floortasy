import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPlayer = () => {
  return (
    <Card className="h-[272px] w-full max-w-[171px] cursor-pointer border-0 bg-gray-900 md:w-[200px] md:max-w-full">
      <CardContent className="flex flex-col items-center rounded-lg p-0 text-white">
        <div className="relative h-[150px] w-full md:w-[171px]">
          {/* Image placeholder */}
          <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 transform">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </div>

        <div className="mt-2 flex w-full flex-col">
          <div className="flex w-full flex-col items-center justify-center">
            <Skeleton className="h-4 w-24 rounded" />

            <Skeleton className="mt-2 h-5 w-28 rounded" />
          </div>
          <div className="mb-3 mt-3 px-2">
            <Skeleton className="h-[45px] w-full rounded-xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingPlayer;
