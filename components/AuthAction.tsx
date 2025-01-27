import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
function AuthAction({ className }: { className?: string }) {
  return (
    <>
      <SignedOut>
        <Link
          className={cn(buttonVariants({ variant: "outline" }), className)}
          href={"/sign-in"}
        >
          Login
        </Link>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-2">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
                userButtonTrigger: { buttonVariants },
              },
            }}
          />
          <SignOutButton>
            <Button
              className="ml-2 inline-block w-fit md:hidden"
              variant="outline"
            >
              Sign out
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>
    </>
  );
}

export default AuthAction;
