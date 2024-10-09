import React from "react";
import { useCartStore } from "@/features/cart/CartStore.ts";
import { Heart, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Cart: React.FC = () => {
   const cart = useCartStore(state => state.cart);
   const removeFromCart = useCartStore(state => state.removeFromCart);
   const clearCart = useCartStore(state => state.clearCart);
   const updateQuantity = useCartStore(state => state.updateQuantity);

   const increaseQuantity = (productId: number, currentQuantity: number) => {
      updateQuantity(productId, currentQuantity + 1);
   };

   const decreaseQuantity = (productId: number, currentQuantity: number) => {
      if (currentQuantity > 1) {
         updateQuantity(productId, currentQuantity - 1);
      }
   };

   return (
      <div className="mt-14">
         {cart.length === 0 ? (
            <p>Your cart is empty.</p>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {cart.map(item => (
                  <div key={item.id}>
                     <Card className="max-w-md mx-auto">
                        <CardContent className="p-4">
                           <div className="flex items-center space-x-2 mb-4">
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                 <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path d="M5 13l4 4L19 7"></path>
                                 </svg>
                              </div>
                              <span className="font-semibold text-lg">
                                 {item.brand}
                              </span>
                           </div>
                           <div className="flex space-x-4">
                              <div className="relative w-24 h-24">
                                 <img
                                    src={item.thumbnail}
                                    alt={item.name}
                                    className="rounded object-cover"
                                 />
                              </div>
                              <div className="flex-1">
                                 <h3 className="font-semibold text-lg leading-tight">
                                    {item.name}
                                 </h3>
                                 <p className="font-bold text-lg">
                                    ${item.price}
                                 </p>
                                 <p className="text-sm text-gray-500 line-through">
                                    {item.discount}
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center justify-between mt-4">
                              <div className="inline-flex items-center gap-x-3">
                                 <Button
                                    variant="destructive"
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
                                       decreaseQuantity(item.id, item.quantity)
                                    }
                                 >
                                    -
                                 </Button>
                                 <span className="mx-2">{item.quantity}</span>
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() =>
                                       increaseQuantity(item.id, item.quantity)
                                    }
                                 >
                                    +
                                 </Button>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               ))}
               {cart.length > 0 && (
                  <Button className="font-SatoshiBold" variant="destructive" onClick={clearCart}>
                     Clear Cart
                  </Button>
               )}
            </div>
         )}
      </div>
   );
};

export default Cart;
