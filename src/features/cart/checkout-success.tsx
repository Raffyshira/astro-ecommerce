import React, { useEffect } from "react";
import { useCartStore } from "../cart/CartStore.ts";

import { Button } from "@/components/ui/button";

const CheckoutSuccess = () => {
   const clearCart = useCartStore(state => state.clearCart);

   useEffect(() => {
      // Kosongkan cart setelah halaman sukses diakses
      clearCart();
   }, [clearCart]);

   return (
      <div
         className="checkout-success h-screen flex flex-col justify-center
      items-center text-center"
      >
         <span className="text-red-500 uppercase font-SatoshiMedium text-xs">
            *Ini hanyalah simulasi
         </span>
         <h1 className="text-2xl font-SatoshiBold">Checkout Berhasil!</h1>
         <p>Terima kasih atas pembelian Anda. Pesanan Anda sedang diproses.</p>
         <Button variant="gooeyLeft" className="mt-3.5" asChild>
            <a href="/">Back to Homepage</a>
         </Button>
      </div>
   );
};

export default CheckoutSuccess;
