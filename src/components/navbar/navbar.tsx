import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useCartStore } from "@/features/cart/CartStore";

import { ShoppingCart, Menu } from "lucide-react";

export default function Navbar() {
   const cart = useCartStore(state => state.cart);
   const [cartCount, setCartCount] = useState(0);

   useEffect(() => {
      const total = cart.length;
      setCartCount(total);
   }, [cart]);

   return (
      <header className="fixed top-0 z-50 w-full bg-background shadow-sm transition-all duration-300 data-[scrolled=true]:bg-background data-[scrolled=true]:shadow-lg">
         <div className="container max-w-full w-full flex h-16 items-center justify-between px-4 md:px-6">
            <a href="#" className="flex items-center gap-2">
               <img
                  className="w-10 h-full invert dark:brightness-0"
                  src="/assets/logo-baru.png"
                  alt="logo"
                  width="100"
                  height="100"
               />
               <span className="text-lg font-SatoshiBold">Acme Inc</span>
            </a>
            <nav className="hidden gap-6 text-sm font-medium md:flex">
               <a href="#" className="transition-colors hover:text-primary">
                  Home
               </a>
               <a href="#" className="transition-colors hover:text-primary">
                  About
               </a>
               <a href="#" className="transition-colors hover:text-primary">
                  Services
               </a>
               <a href="#" className="transition-colors hover:text-primary">
                  Contact
               </a>
            </nav>
            <div className="space-x-3.5 flex justify-end items-center">
               <Button className="hidden md:inline-flex md:items-center">
                  Get Started
               </Button>
               <Button size="icon" variant="outline" asChild>
                  <a href="/cart">
                     <div className="indicator">
                        <ShoppingCart className="w-5 h-5" />
                        <div className="indicator-item badge badge-secondary-content">
                           {cartCount}
                        </div>
                     </div>
                  </a>
               </Button>
               <Sheet>
                  <SheetTrigger asChild>
                     <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                     >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation</span>
                     </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="md:hidden">
                     <div className="grid gap-6 p-6">
                        <a href="#" className="flex items-center gap-2">
                           <img
                              className="w-10 h-full invert dark:brightness-0"
                              src="/assets/logo-baru.png"
                              alt="logo"
                              width="100"
                              height="100"
                           />
                           <span className="text-lg font-SatoshiMedium">
                              Acme Inc
                           </span>
                        </a>
                        <nav className="grid gap-4">
                           <a
                              href="#"
                              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                           >
                              Home
                           </a>
                           <a
                              href="#"
                              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                           >
                              About
                           </a>
                           <a
                              href="#"
                              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                           >
                              Services
                           </a>
                           <a
                              href="#"
                              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                           >
                              Contact
                           </a>
                        </nav>
                        <Button className="w-full">Get Started</Button>
                     </div>
                  </SheetContent>
               </Sheet>
            </div>
         </div>
      </header>
   );
}
