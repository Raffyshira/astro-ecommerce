import { Home, Bell, User, Mail } from "lucide-react";
import { useDev } from "@/hooks/use-dev.ts";

type NavItem = {
   name: string;
   href: string;
   icon: React.ElementType;
};

const navItems: NavItem[] = [
   { name: "Home", href: "/", icon: Home },
   { name: "Mail", href: "#", icon: Mail },
   { name: "Notifications", href: "#", icon: Bell },
   { name: "Profile", href: "/user", icon: User }
];

export default function BottomNav() {
   const { handleNotWork } = useDev();

   return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
         <ul className="flex justify-around items-center h-14">
            {navItems.map(item => (
               <li key={item.name} className="w-full">
                  <a
                     href={item.href}
                     className="flex flex-col items-center justify-center h-full
                     text-muted-foreground"
                     onClick={
                        !item.href || item.href === "#"
                           ? handleNotWork
                           : undefined
                     }
                  >
                     <item.icon className="w-5 h-5" />
                     <span className="text-xs">{item.name}</span>
                  </a>
               </li>
            ))}
         </ul>
      </nav>
   );
}
