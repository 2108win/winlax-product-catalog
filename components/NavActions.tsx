"use client";
import CartButton from "@/components/CartButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavList } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthAction from "./AuthAction";

type NavActionsProps = {
  className?: string;
  links: NavList[];
  onClick?: () => void;
};

export function NavigationList({ className, links }: NavActionsProps) {
  const pathname = usePathname();
  return (
    <div className={cn("flex gap-2", className)}>
      {links.map((link: NavList) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            buttonVariants({
              variant: pathname === link.href ? "outline" : "link",
            }),
            "w-fit text-lg text-inherit",
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

function NavActions({ className, links }: NavActionsProps) {
  return (
    <div className={cn("flex items-center gap-4 md:gap-6", className)}>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <SheetContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <AuthAction className="w-fit text-lg" />
              <CartButton />
            </div>
            <NavigationList links={links} className="flex-col" />
          </SheetContent>
        </SheetContent>
      </Sheet>
      <div className="hidden items-center gap-4 md:flex">
        <CartButton />
        <AuthAction className="text-lg" />
      </div>
    </div>
  );
}

export default NavActions;
