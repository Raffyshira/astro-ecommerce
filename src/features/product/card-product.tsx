import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ProductProps {
   id: number;
   name: string;
   price: number;
   description?: string;
   image: string;
   discount?: number;
   rating: number;
}

const CardProduct: React.FC<ProductProps> = ({
   id,
   name,
   price,
   description,
   image,
   discount,
   rating
}) => {
   return (
      <>
         <Card className="max-w-sm w-50 h-fit border-none overflow-hidden shrink-0">
            <a href={`/product/${id}`}>
               <img
                  alt={name}
                  className="h-56 w-full aspect-square object-cover bg-gray-100"
                  src={image}
               />
            </a>
            <CardContent className="p-3">
               <Badge variant="destructive">{discount}% Off</Badge>
               <h2 className="text-base mt-2 font-semibold">{name}</h2>
               <div className="mt-2 flex items-baseline justify-between space-x-1">
                  <span className="text-base font-SatoshiBold">${price}</span>
                  <div className="flex">
                     <p className="text-base text-gray-500 line-through">
                        Rp299.000
                     </p>
                  </div>
               </div>
            </CardContent>
            <CardFooter className="flex justify-between items-start -ml-2.5">
               <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm">{rating} • 3rb+ terjual</span>
               </div>
            </CardFooter>
         </Card>
      </>
   );
};

export default CardProduct;
