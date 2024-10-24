import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
   Sheet,
   SheetTrigger,
   SheetContent,
   SheetTitle
} from "@/components/ui/sheet";
import { useCartStore } from "@/features/cart/CartStore";
import SearchForm from "@/features/search/SearchForm.tsx";
import { ShoppingCart, Menu, Search } from "lucide-react";

export default function Navbar() {
   const cart = useCartStore(state => state.cart);
   const [cartCount, setCartCount] = useState(0);

   useEffect(() => {
      const total = cart.length;
      setCartCount(total);
   }, [cart]);

   return (
      <header className="fixed top-0 z-50 w-full bg-white border-b transition-all duration-300 data-[scrolled=true]:bg-white data-[scrolled=true]:shadow-lg">
         <div className="container max-w-full w-full flex h-16 items-center justify-between px-4 md:px-6">
            <a href="/" className="flex items-center gap-2">
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
               <a href="/" className="transition-colors hover:text-primary">
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
            <div className="space-x-2 flex justify-end items-center">
               <Sheet>
                  <SheetTrigger asChild>
                     <Button
                        className="sm:hidden"
                        variant="outline"
                        size="icon"
                        aria-label="search-button"
                     >
                        <Search className="w-5 h-5" />
                     </Button>
                  </SheetTrigger>
                  <SheetContent className="h-full" side="top">
                     <SheetTitle className="mb-5">Cari Di Acme Inc</SheetTitle>
                     <SearchForm />
                  </SheetContent>
               </Sheet>
               <div className="indicator">
                  <Button size="icon" variant="outline" asChild>
                     <a href="/cart">
                        <ShoppingCart className="w-5 h-5" />
                        <div className="indicator-item px-1.5 bg-black text-sm text-white rounded-full font-SatoshiMedium">
                           {cartCount}
                        </div>
                     </a>
                  </Button>
               </div>
               <div className="hidden sm:flex">
                  <SearchForm />
               </div>
               <Button className="hidden md:inline-flex md:items-center">
                  Get Started
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
                              href="/"
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
