"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavList } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavActions, { NavigationList } from "../NavActions";
const navList: NavList[] = [
  { name: "Shop", href: "/shop" },
  { name: "Stories", href: "/stories" },
  { name: "About", href: "/about" },
];

export function OnTopHeader() {
  return (
    <div className="flex w-full items-center bg-foreground">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 text-background">
        <Button className="text-background">USD</Button>
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee w-full whitespace-nowrap text-center">
            FREE SHIPPING ON ALL HERMAN MILLER! FEB. 25–28.
          </div>
        </div>
        <Button variant="link" className="text-background">
          Support
        </Button>
      </div>
    </div>
  );
}

function Header() {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "flex border-b-2 py-4",
        pathname === "/shop" && "bg-foreground text-background",
      )}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="text-xl font-bold">
            Ecommerce
          </Link>
          {/* nav list */}

          <NavigationList
            links={navList}
            className={cn(
              "hidden text-lg md:flex",
              pathname === "/shop" && "!text-background",
            )}
          />
          {/* Search bar */}
          <div
            className={cn(
              "hidden overflow-hidden rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-opacity-50 md:flex",
              pathname === "/shop" && "md:hidden",
            )}
          >
            <Button variant="ghost" className="p-2">
              <Search className="!h-5 !w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Input
              placeholder="Search ..."
              className="border-none text-lg outline-none focus-visible:ring focus-visible:ring-transparent"
            />
          </div>
        </div>

        <NavActions links={navList} />
      </div>
    </div>
  );
}

export default Header;
