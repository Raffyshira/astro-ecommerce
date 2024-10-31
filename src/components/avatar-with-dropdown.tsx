import { useState } from "react";
import { SignOutButton } from "@clerk/astro/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, LayoutDashboard } from "lucide-react";

export default function AvatarWithDropdown({
   nameUser = "Anonymous",
   emailUser = "No email provided",
   avatarUrl = ""
}: {
   nameUser?: string;
   emailUser?: string;
   avatarUrl?: string;
}) {
   const [open, setOpen] = useState(false);

   return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
               <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl} alt={nameUser} />
                  <AvatarFallback>
                     {nameUser
                        .split(" ")
                        .map(n => n[0])
                        .join("")
                        .toUpperCase()}
                  </AvatarFallback>
               </Avatar>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-sm font-SatoshiMedium leading-none">
                     {nameUser}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                     {emailUser}
                  </p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <a href="/user">
               <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
               </DropdownMenuItem>
            </a>
            <a href="/dashboard">
               <DropdownMenuItem>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  <span>Dashboard</span>
               </DropdownMenuItem>
            </a>
            <DropdownMenuItem>
               <Settings className="mr-2 h-4 w-4" />
               <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <SignOutButton>
               <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
               </DropdownMenuItem>
            </SignOutButton>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
