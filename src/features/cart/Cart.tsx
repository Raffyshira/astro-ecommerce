import React, { useState, useEffect } from "react";
import { useCartStore } from "@/features/cart/CartStore.ts";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge.tsx";

interface PropsTypes {
   key?: number;
   id: number;
   brand: string;
   thumbnail: string;
   name: string;
   price: number;
   sku: string;
   discountPercentage: number;
   quantity: number;
}

const Cart: React.FC = () => {
   const cart = useCartStore(state => state.cart);
   const removeFromCart = useCartStore(state => state.removeFromCart);
   const clearCart = useCartStore(state => state.clearCart);
   const updateQuantity = useCartStore(state => state.updateQuantity);

   const [totalHarga, setTotalHarga] = useState(0);

   const calculateDiscountedPrice = (
      price: number,
      discountPercentage: number
   ) => {
      return price - (price * discountPercentage) / 100;
   };

   const increaseQuantity = (productId: number, currentQuantity: number) => {
      updateQuantity(productId, currentQuantity + 1);
   };

   const decreaseQuantity = (productId: number, currentQuantity: number) => {
      if (currentQuantity > 1) {
         updateQuantity(productId, currentQuantity - 1);
      }
   };

   useEffect(() => {
      const total = cart.reduce((acc, product) => {
         const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discountPercentage || 0
         );
         return acc + discountedPrice * product.quantity;
      }, 0);
      setTotalHarga(total);
   }, [cart]);

   return (
      <div className="mt-14">
         {cart.length === 0 ? (
            <p className="text-center text-2xl font-SatoshiBold">
               Your cart is empty.
            </p>
         ) : (
         <>
                  <div className="mb-5">
            <h2 className="text-2xl font-SatoshiBold">Keranjang</h2>
         </div>
            <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-3 gap-4 ">
               <div className="w-full flex flex-col gap-4 sm:col-span-2">
                  {cart.map((item: PropsTypes) => (
                     <div
                        className="border-b px-5 pb-2 sm:shadow rounded-lg bg-white py-5"
                        key={item.id}
                     >
                        <div className="max-w-full w-full h-full mx-auto ">
                           <div className="">
                              <div className="flex items-center space-x-2 mb-4">
                                 {item.brand ? (
                                    <span className="font-semibold text-lg inline-flex items-center gap-x-1">
                                       <img
                                          className="w-6"
                                          src="/assets/icon/badge_os.png"
                                          alt="official store"
                                       />{" "}
                                       {item.brand}
                                    </span>
                                 ) : (
                                    <span className="font-semibold text-lg">
                                       Acme Inc
                                    </span>
                                 )}
                              </div>
                              <div className="flex space-x-4">
                                 <div className="relative w-24 h-24">
                                    <img
                                       src={item.thumbnail}
                                       alt={item.name}
                                       className="rounded object-cover bg-slate-100"
                                       loading="lazy"
                                       width="200"
                                       height="200"
                                    />
                                 </div>
                                 <div className="flex-1 space-y-2">
                                    <div className="sm:flex justify-between items-center">
                                       {" "}
                                       <h3 className="font-semibold text-lg leading-tight sm:text-xl">
                                          {item.name}
                                       </h3>
                                       <p className="font-bold text-lg sm:text-xl">
                                          ${item.price}
                                       </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                       {item.discountPercentage ? (
                                          <Badge variant="secondary">
                                             {item.discountPercentage}% Off
                                          </Badge>
                                       ) : null}
                                       {item.sku ? (
                                          <Badge variant="secondary">
                                             {item.sku}
                                          </Badge>
                                       ) : null}
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                 <div className="inline-flex items-center gap-x-3">
                                    <Button
                                       variant="outline"
                                       onClick={() => removeFromCart(item.id)}
                                       size="icon"
                                       className="rounded-full"
                                    >
                                       <Trash2 className="h-4 w-4" />
                                       <span className="sr-only">
                                          remove product from cart
                                       </span>
                                    </Button>
                                    <Button
                                       variant="outline"
                                       size="icon"
                                       className="rounded-full"
                                    >
                                       <Heart className="h-4 w-4 hover:fill-destructive hover:stroke-0" />
                                       <span className="sr-only">
                                          Add to favorites
                                       </span>
                                    </Button>
                                 </div>
                                 <div className="flex items-center border rounded-full">
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="rounded-full"
                                       onClick={() =>
                                          decreaseQuantity(
                                             item.id,
                                             item.quantity
                                          )
                                       }
                                    >
                                       -
                                    </Button>
                                    <span className="mx-2">
                                       {item.quantity}
                                    </span>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="rounded-full"
                                       onClick={() =>
                                          increaseQuantity(
                                             item.id,
                                             item.quantity
                                          )
                                       }
                                    >
                                       +
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               {cart.length > 0 && (
                  <div className="fixed bottom-0 left-0 right-0 z-50 px-5 py-3 bg-white shadow gap-x-4 sm:static sm:col-span-1 sm:h-full sm:rounded-lg sm:flex sm:flex-col sm:justify-between sm:items-start">
                     <h2 className="text-lg font-SatoshiBold sm:mb-5 hidden sm:flex">
                        Ringkasan Belanja
                     </h2>
                     <h3 className="w-full text-end mb-2.5 font-SatoshiMedium text-sm sm:text-lg sm:inline-flex sm:justify-between">
                        <span>Total Harga:</span> ${totalHarga.toFixed(2)}
                     </h3>
                     <div className="w-full flex justify-between gap-x-3 sm:mt-5  items-center">
                        <Button
                           className="font-SatoshiBold w-fit"
                           variant="outline"
                           onClick={clearCart}
                        >
                           <Trash2 className="w-4 h-4 mr-1" />
                           Clear Cart
                        </Button>
                        <Button className="w-full font-SatoshiBold">
                           Checkout ({cart.length})
                        </Button>
                     </div>
                  </div>
               )}
            </div>
            </>
         )}
      </div>
   );
};

export default Cart;
