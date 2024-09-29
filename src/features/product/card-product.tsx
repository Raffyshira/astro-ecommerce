import React from "react";
import { useCartStore } from "@/features/cart/CartStore.ts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ProductProps {
   id: number;
   name: string;
   price: number;
   description: string;
   image: string;
   discount?: number;
}

const CardProduct: React.FC<ProductProps> = ({
   id,
   name,
   price,
   description,
   image,
   discount
}) => {
   const addToCart = useCartStore(state => state.addToCart);

   const handleAddToCart = () => {
      addToCart({ id, name, price, quantity: 1 });
   };

   return (
      <>
         <Card className="w-full h-full border-none overflow-hidden">
            <div className="relative">
               <Badge className="absolute left-2 top-2 bg-red-500 text-white">
                  {discount}%
               </Badge>
               <img
                  alt={name}
                  className="h-48 w-full object-cover"
                  src={image}
               />
            </div>
            <CardContent className="p-4">
               <h2 className="text-sm font-semibold">{name}</h2>
               <div className="mt-2 flex items-baseline justify-start space-x-1">
                  <span className="text-sm font-bold">${price}</span>
                  <span className="text-sm text-gray-500 line-through">
                     Rp299.000
                  </span>
               </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start -ml-2">
               <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-xs">4.6 • 3rb+ terjual</span>
               </div>
               <span className="text-xs text-gray-500">Kota Tangerang</span>
            </CardFooter>
         </Card>
      </>
   );
};

export default CardProduct;
