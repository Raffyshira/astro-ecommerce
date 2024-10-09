"use client";
import React from "react";
import ModalDetailProduk from "@/features/product/ModalDetailProduct.tsx";
import { ProductCarousel } from "@/features/product/ProductCarousel.tsx";
import { useCartStore } from "@/features/cart/CartStore.ts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button.tsx";
import {
   Heart,
   Star,
   Camera,
   MessagesSquare,
   ChevronRight,
   Clock3
} from "lucide-react";

interface PropsProduct {
   id: number;
   price?: number;
   discount?: number | null;
   name: string;
   rating?: number;
   reviews?: number;
   desc?: string;
   brand: string;
   thumbnail: string | any;
}

export const ProductDetailMobile: React.FC<PropsProduct> = ({
   id,
   price,
   discount,
   title,
   rating,
   reviews,
   desc,
   brand,
   thumbnail
}) => {
   const addToCart = useCartStore(state => state.addToCart);
   const { toast } = useToast();
   const handleNotWork = () => {
      toast({
         title: "Maaf, Masih Tahap Development :)",
         variant: "destructive"
      });
   };
   const handleAddToCart = () => {
      addToCart({
         id,
         name: title,
         price,
         quantity: 1,
         brand,
         thumbnail,
         discount
      });
      toast({
         title: "Yeay, Product Mu Sudah Di Keranjang"
      });
   };
   return (
      <>
         <ProductCarousel dataImage={thumbnail} />
         <div className="max-w-full w-full h-full overflow-hidden bg-slate-100">
            <section className="bg-white px-5 py-5">
               <div className="flex items-center gap-x-3">
                  <h1 className="font-bold text-xl">${price}</h1>
                  <p className="text-sm line-through text-slate-500">
                     Rp.299.000
                  </p>
                  <p className="text-sm text-red-500 font-bold">{discount}%</p>
               </div>
               <div className="w-full flex justify-between items-center mt-1">
                  <h3 className="text-xl font-SatoshiBold">{title}</h3>
                  <span>
                     <Heart className="w-5 h-5 hover:fill-red-500" />
                  </span>
               </div>
               <div className="flex justify-start items-center gap-x-3 mt-2.5">
                  <p className="text-sm">Terjual 4 rb+</p>
                  <div className="flex p-1 items-center border border-slate-300 rounded-lg space-x-1">
                     <Star className="w-4 h-4 fill-yellow-500 stroke-0" />
                     <p>
                        {rating} <span className="text-slate-500">(1 rb)</span>
                     </p>
                  </div>
                  <div className="flex p-1 items-center border border-slate-300 rounded-lg space-x-1">
                     <Camera className="w-4 h-4" />
                     <p>200</p>
                  </div>
                  <div className="flex p-1 items-center border border-slate-300 rounded-lg space-x-1">
                     <MessagesSquare className="w-4 h-4" />
                     <p>{reviews.length}</p>
                  </div>
               </div>
            </section>
            <ModalDetailProduk description={desc} />

            <div
               className="flex justify-between  items-center fixed bottom-0 left-0 right-0 z-50 px-5 py-3 bg-white shadow gap-x-4
            "
            >
               <Button
                  onClick={handleNotWork}
                  variant="outline"
                  className="w-fit"
               >
                  <MessagesSquare className="w-4 h-4" />
               </Button>
               <Button
                  className="font-SatoshiBold w-full"
                  onClick={handleAddToCart}
               >
                  Masukkan Keranjang
               </Button>
            </div>
         </div>
      </>
   );
};
