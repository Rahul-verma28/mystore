// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Menu, Search, User } from "lucide-react";
// import Link from "next/link";
// import { Cart } from "@/components/cart";
// import logo from "@/app/public/logo.png";
// import Image from "next/image";

// export function Navbar() {
//   return (
//     <TooltipProvider>
//       <header className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4">
//           <div className="mr-7 flex items-center">
//             <Sidebar />
//             <Image src={logo} alt="Logo" className="h-20 w-20" />
//             <Link
//               href="/"
//               className="flex items-center text-xl font-bold tracking-tighter"
//             >
//               ShopEase
//             </Link>
//           </div>
//           <nav className="text-muted-foreground hover:[&_a]:text-foreground hidden items-center gap-6 text-sm font-medium md:flex [&_a]:transition-colors">
//             <Link href="#">Women</Link>
//             <Link href="#">Men</Link>
//             <Link href="#">Kids</Link>
//             <Link href="#">Accessories</Link>
//           </nav>
//           <div className="ml-auto flex items-center gap-2">
//             <SearchBar className="hidden sm:block" />
//             <Cart />
//             <Link href="/login">
//               <Button className="hidden sm:flex" variant="outline">
//                 Sign in
//               </Button>
//             </Link>
//             <Link href="/signup">
//               <Button className="hidden sm:flex">Sign up</Button>
//             </Link>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Link href="/profile">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="border-border size-8 shrink-0 border rounded-full p-2"
//                   >
//                     <User className="size-4 " />
//                     <span className="sr-only">Profile</span>
//                   </Button>
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent align="end">Profile</TooltipContent>
//             </Tooltip>
//           </div>
//         </div>
//       </header>
//     </TooltipProvider>
//   );
// }

// function SearchBar({ className }: { className?: string }) {
//   return (
//     <form className={cn("relative max-w-lg lg:max-w-xs", className)}>
//       <Search className="text-muted-foreground absolute left-2 top-2 size-4" />
//       <Input
//         type="search"
//         placeholder="Search products..."
//         className="h-8 rounded-lg pl-8 text-sm sm:w-[200px] md:w-[200px] lg:w-[200px]"
//       />
//     </form>
//   );
// }

// function Sidebar() {
//   return (
//     <Sheet>
//       <TooltipProvider>
//         <Tooltip>
//           <SheetTrigger asChild>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="border-border size-8 shrink-0 border md:hidden"
//               >
//                 <Menu className="size-4" />
//                 <span className="sr-only">Menu</span>
//               </Button>
//             </TooltipTrigger>
//           </SheetTrigger>
//           <TooltipContent align="start">Menu</TooltipContent>
//           <SheetContent
//             side="left"
//             className="flex w-full flex-col p-4 pt-12 md:w-3/4"
//           >
//             <SearchBar className="w-full sm:hidden" />
//             <Button className="justify-start" variant="ghost">
//               <Link href="#">Women</Link>
//             </Button>
//             <Button className="justify-start" variant="ghost">
//               <Link href="#">Men</Link>
//             </Button>
//             <Button className="justify-start" variant="ghost">
//               <Link href="#">Kids</Link>
//             </Button>
//             <Button className="justify-start" variant="ghost">
//               <Link href="#">Accessories</Link>
//             </Button>
//           </SheetContent>
//         </Tooltip>
//       </TooltipProvider>
//     </Sheet>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu, Search, User } from "lucide-react";
import Image from "next/image";
import logo from "@/app/public/logo.png";
import { Cart } from "@/components/cart";


export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
        setIsLoggedIn(false); // Assume not logged in on error
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4">
          <div className="mr-7 flex items-center">
            <Sidebar />
            <Image src={logo} alt="Logo" className="h-20 w-20" />
            <Link
              href="/"
              className="flex items-center text-xl font-bold tracking-tighter"
            >
              ShopEase
            </Link>
          </div>
          <nav className="text-muted-foreground hover:[&_a]:text-foreground hidden items-center gap-6 text-sm font-medium md:flex [&_a]:transition-colors">
            <Link href="#">Women</Link>
            <Link href="#">Men</Link>
            <Link href="#">Kids</Link>
            <Link href="#">Accessories</Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <SearchBar className="hidden sm:block" />
            <Cart />
            {isLoggedIn ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border-border size-8 shrink-0 border rounded-full p-2"
                    >
                      <User className="size-4" />
                      <span className="sr-only">Profile</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent align="end">Profile</TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Link href="/login">
                  <Button className="hidden sm:flex" variant="outline">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="hidden sm:flex">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}

function SearchBar({ className }: { className?: string }) {
  return (
    <form className={cn("relative max-w-lg lg:max-w-xs", className)}>
      <Search className="text-muted-foreground absolute left-2 top-2 size-4" />
      <Input
        type="search"
        placeholder="Search products..."
        className="h-8 rounded-lg pl-8 text-sm sm:w-[200px] md:w-[200px] lg:w-[200px]"
      />
    </form>
  );
}

function Sidebar() {
  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <SheetTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border-border size-8 shrink-0 border md:hidden"
              >
                <Menu className="size-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </TooltipTrigger>
          </SheetTrigger>
          <TooltipContent align="start">Menu</TooltipContent>
          <SheetContent
            side="left"
            className="flex w-full flex-col p-4 pt-12 md:w-3/4"
          >
            <SearchBar className="w-full sm:hidden" />
            <Button className="justify-start" variant="ghost">
              <Link href="#">Women</Link>
            </Button>
            <Button className="justify-start" variant="ghost">
              <Link href="#">Men</Link>
            </Button>
            <Button className="justify-start" variant="ghost">
              <Link href="#">Kids</Link>
            </Button>
            <Button className="justify-start" variant="ghost">
              <Link href="#">Accessories</Link>
            </Button>
          </SheetContent>
        </Tooltip>
      </TooltipProvider>
    </Sheet>
  );
}
