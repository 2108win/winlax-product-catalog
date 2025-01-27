"use client";
import AuthSignIn from "@/components/auth-sign-in";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  const { isSignedIn } = useSession();
  return (
    <div className="z-10 grid w-full items-center px-4 py-10 sm:justify-center md:my-auto">
      {isSignedIn ? (
        <>
          <Card className="p-8">
            <CardHeader className="text-xl font-bold">
              <CardTitle>Welcome back!!</CardTitle>
            </CardHeader>
            <CardContent className="my-2">You are already signin!</CardContent>
            <CardFooter className="flex flex-col items-center gap-4 md:flex-row">
              <Link
                href="/"
                className={buttonVariants({ className: "w-full font-medium" })}
              >
                Back to home page
              </Link>
            </CardFooter>
          </Card>
        </>
      ) : (
        <AuthSignIn className="space-y-6 rounded-lg border bg-card text-card-foreground shadow-sm" />
      )}
    </div>
  );
}
