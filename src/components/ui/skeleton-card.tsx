import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <Card className={`w-full p-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <Skeleton className="w-16 h-16 rounded-md bg-muted " />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 bg-muted rounded " />
          <Skeleton className="h-4 bg-muted rounded  w-4/5" />
        </div>
      </div>
    </Card>
  );
}

export default SkeletonCard;
