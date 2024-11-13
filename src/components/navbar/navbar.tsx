import { useEffect, useState } from "react";
import { SignedIn, SignedOut } from "@clerk/astro/react";

import AvatarWithDropdown from "@/components/avatar-with-dropdown.tsx";

import { Button } from "@/components/ui/button";
import {
   Sheet,
   SheetTrigger,
   SheetContent,
   SheetTitle,
   SheetFooter,
   SheetHeader,
   SheetDescription
} from "@/components/ui/sheet";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";


import { useCartStore } from "@/features/cart/CartStore";
import SearchForm from "@/features/search/SearchForm.tsx";
import {
   ShoppingCart,
   Menu,
   Search,
   Info,
   Briefcase,
   Mail,
   Home,
   Heart,
   ReceiptText,
   Star,
   ScanQrCode
} from "lucide-react";

interface NavbarReactProps {
   initialEmail?: string | any;
   name?: string | any;
   userImage?: string | any;
}
type NestedChild = {
   id: string; // Mengubah ini menjadi string untuk mendukung angka desimal
   title: string;
   href: string;
};

type NavbarItems = {
   id: number;
   title: string;
   href: string;
   icon: React.ElementType;
   nestedChildren?: NestedChild[];
};

const listItem: NavbarItems[] = [
   {
      id: 1,
      title: "Home",
      href: "/",
      icon: Home
   },
   {
      id: 2,
      title: "Services",
      href: "#",
      icon: Briefcase
   },
   {
      id: 3,
      title: "Contact",
      href: "#",
      icon: Mail
   },
   {
      id: 4,
      title: "About",
      href: "#",
      icon: Info,
      nestedChildren: [
         {
            id: "4.1",
            title: "Our Story",
            href: "#"
         },
         {
            id: "4.3",
            title: "Team",
            href: "#"
         }
      ]
   },
   {
      id: 5,
      title: "Wishlist",
      href: "#",
      icon: Heart
   },
   {
      id: 6,
      title: "Beli Lagi",
      href: "#",
      icon: ShoppingCart
   },
   {
      id: 7,
      title: "Daftar Transaksi",
      href: "#",
      icon: ReceiptText
   },
   {
      id: 8,
      title: "Ulasan",
      href: "#",
      icon: Star
   },
   {
      id: 9,
      title: "Complain",
      href: "#",
      icon: Info,
      nestedChildren: [
         {
            id: "9.1",
            title: "Our Story",
            href: "#"
         },
         {
            id: "9.3",
            title: "Team",
            href: "#"
         }
      ]
   },
   {
      id: 10,
      title: "Scan Kode QR",
      href: "#",
      icon: ScanQrCode
   }
];

const navList = () => {
   
   return (
      <>
         {[
            listItem.slice(0, 4),
            listItem.slice(4, 8),
            listItem.slice(8, 10)
         ].map((slicedItems, idx) => (
            <div className="border-t pt-5" key={idx}>
               {slicedItems.map(item => (
                  <div key={item.id}>
                     {item.nestedChildren ? (
                        <Accordion type="single" collapsible className="w-full">
                           <AccordionItem
                              className="border-none"
                              value={item.title}
                           >
                              <AccordionTrigger className="nav_links items-center">
                                 <div className="flex items-center gap-2">
                                    <item.icon className="w-4 h-4" />
                                    {item.title}
                                 </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                 <div className="pl-6 grid gap-2">
                                    {item.nestedChildren.map(subItem => (
                                       <a
                                          href={subItem.href}
                                          key={subItem.id}
                                          className="nav_links"
                                       >
                                          {subItem.title}
                                       </a>
                                    ))}
                                 </div>
                              </AccordionContent>
                           </AccordionItem>
                        </Accordion>
                     ) : (
                        <a
                           href={item.href}
                           className="nav_links"
                           
                        >
                           <item.icon className="w-4 h-4" />
                           {item.title}
                        </a>
                     )}
                  </div>
               ))}
            </div>
         ))}
      </>
   );
};

export default function Navbar({
   initialEmail,
   name,
   userImage
}: NavbarReactProps) {
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
            <nav className="hidden gap-3 text-sm font-medium md:flex items-center">
               <Button variant="linkHover2" asChild>
                  <a
                     href="/"
                     className="transition-colors hover:text-primary
               font-SatoshiMedium"
                  >
                     Home
                  </a>
               </Button>
               <Button variant="linkHover2" asChild>
                  <a
                     href="#"
                     className="transition-colors hover:text-primary
               font-SatoshiMedium"
                  >
                     About
                  </a>
               </Button>
               <Button variant="linkHover2" asChild>
                  <a
                     href="#"
                     className="transition-colors hover:text-primary
               font-SatoshiMedium"
                  >
                     Services
                  </a>
               </Button>
               <Button variant="linkHover2" asChild>
                  <a
                     href="#"
                     className="transition-colors hover:text-primary
               font-SatoshiMedium"
                  >
                     Contact
                  </a>
               </Button>
            </nav>
            <div className="space-x-2 flex justify-end items-center">
               <Sheet>
                  <SheetTrigger asChild>
                     <Button
                        className="sm:hidden border-none"
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
               <div className="hidden sm:flex">
                  <SearchForm />
               </div>
               <div className="indicator">
                  <Button
                     className="border-none"
                     size="icon"
                     variant="outline"
                     asChild
                  >
                     <a href="/cart">
                        <ShoppingCart className="w-5 h-5" />
                        <div className="indicator-item px-1.5 bg-black text-sm text-white rounded-full font-SatoshiMedium">
                           {cartCount}
                        </div>
                     </a>
                  </Button>
               </div>
               <div className="hidden sm:flex">
                  <SignedIn>
                     <AvatarWithDropdown
                        nameUser={name}
                        emailUser={initialEmail}
                        avatarUrl={userImage}
                     />
                  </SignedIn>
                  <SignedOut>
                     <Button>Get Started</Button>
                  </SignedOut>
               </div>
               <Sheet>
                  <SheetTrigger asChild>
                     <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden border-none"
                        aria-label="Open navigation menu"
                     >
                        <Menu className="h-6 w-6" />
                     </Button>
                  </SheetTrigger>
                  <SheetContent
                     side="left"
                     className="w-[300px] flex flex-col  h-full sm:w-[350px] md:hidden"
                  >
                     <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                           <img
                              className="w-10 h-full invert dark:brightness-0"
                              src="/assets/logo-baru.png"
                              alt="Acme Inc logo"
                              width={100}
                              height={100}
                           />
                           <span className="text-lg font-SatoshiMedium">
                              Acme Inc
                           </span>
                        </SheetTitle>
                        <SheetDescription className="-ml-5">
                           Navigate through our site with ease
                        </SheetDescription>
                     </SheetHeader>
                     <ScrollArea className="h-[calc(100vh-180px)] mt-6 pb-8 pr-4">
                        <nav className="grid gap-2">{navList()}</nav>
                     </ScrollArea>
                     <SheetFooter
                        className="sticky bottom-0 items-stretch gap-2
                     sm:flex-row sm:gap-0 border-t pt-3.5"
                     >
                        <SignedIn>
                           <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                 <AvatarWithDropdown
                                    nameUser={name}
                                    emailUser={initialEmail}
                                    avatarUrl={userImage}
                                 />
                                 <div className="flex flex-col">
                                    <span className="text-sm font-medium">
                                       {name || "John Dae"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                       {initialEmail}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </SignedIn>
                        <SignedOut>
                           <div
                              className="w-full flex justify-around
                           items-center gap-4"
                           >
                              <Button className="w-full" asChild>
                                 <a
                                    className="font-SatoshiMedium"
                                    href="/signin"
                                 >
                                    Login
                                 </a>
                              </Button>
                              <Button variant="outline" asChild>
                                 <a
                                    className="font-SatoshiMedium"
                                    href="/register"
                                 >
                                    Sign Up
                                 </a>
                              </Button>
                           </div>
                        </SignedOut>
                     </SheetFooter>
                  </SheetContent>
               </Sheet>
            </div>
         </div>
      </header>
   );
}
