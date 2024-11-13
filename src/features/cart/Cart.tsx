import React, { useState, useEffect } from "react";
import { useCartStore } from "@/features/cart/CartStore.ts";
import { loadStripe } from "@stripe/stripe-js";

import { useToast } from "@/hooks/use-toast";
import { Heart, Trash2, Loader2 } from "lucide-react";
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

const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart: React.FC = () => {
   const cart = useCartStore(state => state.cart);
   const removeFromCart = useCartStore(state => state.removeFromCart);
   const clearCart = useCartStore(state => state.clearCart);
   const updateQuantity = useCartStore(state => state.updateQuantity);

   const [loading, setLoading] = useState(false);

   const { toast } = useToast();
   const handleNotWork = () => {
      toast({
         title: "Kalau mau beli di tokopedia atau shoppe, jangan disini :)",
         variant: "destructive"
      });
   };

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

   const handleCheckout = async () => {
      setLoading(true);

      try {
         const stripe = await stripePromise;

         // Call your server to create a Checkout session
         const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: cart })
         });

         const session = await response.json();

         // Redirect to Stripe Checkout
         const result = await stripe!.redirectToCheckout({
            sessionId: session.id
         });

         if (result.error) {
            console.error(result.error.message);
         }
      } catch (error) {
         console.error("Error:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="w-full h-full">
         {cart.length === 0 ? (
            <div
               className="w-full h-screen flex flex-col justify-center
            items-center"
            >
               <h4 className="text-center text-2xl font-SatoshiBold">
                  Ohh no, Your cart is empty
               </h4>
               <p className="text-sm sm:text-base">
                  It seems you dont have a items in your cart
               </p>
               <Button className="mt-3.5" variant="gooeyRight" asChild>
                  <a href="/">Explore our product</a>
               </Button>
            </div>
         ) : (
            <>
               <div className="mb-5 mt-14  ">
                  <h2 className="text-xl font-SatoshiBold">
                     Keranjang ({cart.length})
                  </h2>
               </div>
               <div className="w-full h-fit grid grid-cols-1 pb-20 sm:grid-cols-3 gap-4 ">
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
                                          onClick={() =>
                                             removeFromCart(item.id)
                                          }
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
                     <div
                        className="fixed bottom-0 left-0 right-0 z-30 px-5
                     py-3 bg-white shadow gap-x-4 sm:static sm:col-span-1
                     sm:max-h-52 sm:rounded-lg sm:flex sm:flex-col sm:justify-between
                     sm:items-start"
                     >
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
                           <Button
                              onClick={handleCheckout}
                              disabled={loading}
                              className="w-full font-SatoshiBold"
                           >
                              {loading ? (
                                 <span className="inline-flex items-center">
                                    <Loader2
                                       className="w-4 h-4 mr-2
                                    animate-spin duration-1000"
                                    />
                                    Processing
                                 </span>
                              ) : (
                                 "Checkout"
                              )}
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
