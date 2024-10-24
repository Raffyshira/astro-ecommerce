import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils.ts";
import type { CardProductProps } from "@/types.d.ts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

const CardProduct: React.FC<CardProductProps> = ({
   id,
   name,
   price,
   discount,
   rating,
   children,
   className,
   isLineClamp = true
}) => {
   return (
      <>
         <Card
            className={cn(
               "max-w-md shadow-none w-50 h-fit border-none overflow-hidden",
               className
            )}
         >
            <a href={`/product/${id}`}>{children}</a>
            <CardContent className="p-3">
               <Badge variant="destructive">{discount}% Off</Badge>
               {isLineClamp ? (
                  <h2 className="text-base mt-2 font-semibold line-clamp-1">
                     {name}
                  </h2>
               ) : (
                  <h2 className="text-base mt-2 font-semibold">{name}</h2>
               )}
               <div className="mt-2 flex items-center justify-between space-x-1">
                  <span className="text-base font-SatoshiBold">${price}</span>
                  <div className="flex">
                     <p className="text-sm text-gray-500 line-through">
                        Rp299.000
                     </p>
                  </div>
               </div>
            </CardContent>
            <CardFooter className="w-full flex justify-start items-center px-3 pt-0">
               <Star className="h-4 w-4 fill-yellow-400 stroke-0" />
               <span className="ml-1 text-sm">{rating} • 3rb+ terjual</span>
            </CardFooter>
         </Card>
      </>
   );
};

export default CardProduct;
