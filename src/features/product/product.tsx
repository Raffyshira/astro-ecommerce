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
   Clock3,
   StarIcon,
   ClockIcon
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
   images: [];
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
   thumbnail,
   images,
   category
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
      <div className="max-w-full w-full grid grid-cols-1 md:grid-cols-3 gap-5 md:mt-20 md:px-5 overflow-hidden">
         <ProductCarousel className="md:col-span-1" dataImage={images} />
         <div className="w-full h-full overflow-hidden bg-slate-100 md:col-span-2 sm:bg-white">
            <div className="bg-white px-5 py-5">
               <div className="flex items-center gap-x-3">
                  <h1 className="font-SatoshiBold text-xl">${price}</h1>
                  <p className="text-sm line-through text-slate-500 sm:text-base">
                     Rp.299.000
                  </p>
                  <p className="text-sm sm:text-base text-red-500 font-bold">
                     {discount}%
                  </p>
               </div>
               <div className="w-full flex justify-between items-center mt-1">
                  <h3 className="text-xl font-SatoshiBold sm:text-2xl">
                     {title}
                  </h3>
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
            </div>
            <div className="bg-white px-5 py-5 mt-2.5">
               <h3 className="text-xl font-bold">Detail produk</h3>
               <div className="grid gap-4 mt-3.5">
                  <div className="grid grid-cols-2 gap-2 ">
                     <h4 className="text-sm font-medium text-muted-foreground sm:text-base ">
                        Tipe Garansi
                     </h4>
                     <h4 className="text-sm sm:text-base">Garansi Toko</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-b py-2">
                     <h4 className="text-sm font-medium text-muted-foreground sm:text-base">
                        Tahun Rilis
                     </h4>
                     <h4 className="text-sm sm:text-base">2024</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                     <h4 className="text-sm font-medium text-muted-foreground sm:text-base">
                        Etalase
                     </h4>
                     <h4 className="text-sm text-green-600 sm:text-base">
                        Acme Inc
                     </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-b py-2">
                     <h4 className="text-sm font-medium text-muted-foreground sm:text-base">
                        Kategori
                     </h4>
                     <h4 className="flex items-center text-sm text-green-600 sm:text-base capitalize">
                        Home
                        <ChevronRight className="h-4 w-4" />
                        {category}
                     </h4>
                  </div>
                  <div className="mt-4">
                     <h3 className="mb-2 text-xl font-bold">
                        Deskripsi produk
                     </h3>
                     <p className="mb-3.5">{desc}</p>
                     <a className="text-green-500" href="/">
                        Baca Selengkapnya
                     </a>
                  </div>
               </div>
            </div>
            <div className="bg-white px-5 py-5 mt-2.5">
               <div className="flex justify-between items-center ">
                  <div className="flex space-x-4 items-center">
                     <div className="flex shrink-0">
                        <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
                           <span className="text-white text-xl font-bold">
                              S
                           </span>
                        </div>
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center">
                           <h2 className="text-xl font-semibold text-gray-800">
                              SmartClick
                           </h2>
                        </div>
                        <div className="flex items-center">
                           <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                           <span className="text-green-500 text-sm font-medium">
                              Online
                           </span>
                        </div>
                        <p className="text-gray-600 text-sm">Kota Tangerang</p>
                     </div>
                  </div>
                  <Button
                     variant="outline"
                     className="text-green-600 border-green-600 font-SatoshiMedium hover:bg-green-50"
                  >
                     Follow
                  </Button>
               </div>
               <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                     <div className="flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                           4.6
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                           (1 rb)
                        </span>
                     </div>
                     <div className="flex items-center">
                        <ClockIcon className="w-5 h-5 text-gray-400" />
                        <span className="ml-1 text-sm text-gray-600">
                           ± 32 menit pesanan diproses
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="bg-white px-5 py-5 mt-2.5">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-SatoshiBold">Ulasan pembeli</h2>
                  <a href="#" className="text-green-600 hover:underline">
                     Lihat Semua
                  </a>
               </div>
               <div className="flex items-center mb-4">
                  <span className="text-lg font-bold mr-2">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-600 ml-2">
                     {reviews.length} rating • 20 ulasan
                  </span>
               </div>
               <div className="border-t pt-4">
                  {reviews.map((review, index) => (
                     <div key={index} className="mb-4">
                        <div className="flex items-center mb-2">
                           <div className="w-10 h-10 bg-blue-300 rounded-full mr-3"></div>
                           <div>
                              <h3 className="font-semibold">
                                 {review.reviewerName}
                              </h3>
                              <div className="flex items-center">
                                 {[...Array(5)].map((_, i) => (
                                    <Star
                                       key={i}
                                       className={`w-4 h-4 ${
                                          i < review.rating
                                             ? "text-yellow-400 fill-current"
                                             : "text-gray-300"
                                       }`}
                                    />
                                 ))}
                                 <span className="text-gray-600 text-sm ml-2">
                                    {review.date}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                           Varian: Lorem
                        </p>
                        <p className="mb-2 sm:text-lg">{review.comment}</p>
                        <button className="text-sm text-gray-600 hover:underline">
                           10 terbantu
                        </button>
                     </div>
                  ))}
               </div>
            </div>
            {/* <div
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
            </div>*/}
         </div>
      </div>
   );
};
