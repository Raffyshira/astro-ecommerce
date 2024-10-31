import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card.tsx";

export const CardSkeletonProduct = () => {
   return (
      <>
         <Card className="flex bg-transparent flex-col max-w-sm w-50 h-fit border-none overflow-hidden space-y-3 my-3.5">
            <Skeleton className="h-[200px] w-50 rounded-xl" />
            <div className="space-y-2">
               <Skeleton className="h-4 w-[250px]" />
               <Skeleton className="h-4 w-[180px]" />
               <Skeleton className="h-4 w-[100px]" />
            </div>
         </Card>
      </>
   );
};
