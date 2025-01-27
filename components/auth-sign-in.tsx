"use client";

import { buttonVariants } from "@/components/ui/button";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import Link from "next/link";
import Loading from "./ui/loading";
function AuthSignIn({ className }: { className?: string }) {
  return (
    <SignIn.Root fallback={<Loading className="loading-lg" />}>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <SignIn.Step name="start" className={cn("md:min-w-96", className)}>
            <CardHeader className="items-center">
              <Image src="/logo.svg" alt="logo" width={50} height={50} />
              <CardTitle>Welcome back</CardTitle>
            </CardHeader>
            <Clerk.GlobalError className="block text-sm text-red-400" />
            <div className="space-y-4 p-6 pt-0">
              <Clerk.Connection
                name="google"
                className={buttonVariants({ className: "w-full font-medium" })}
                disabled={isGlobalLoading}
              >
                Continue with Google
              </Clerk.Connection>
              <Clerk.Connection
                name="facebook"
                className={buttonVariants({ className: "w-full font-medium" })}
                disabled={isGlobalLoading}
              >
                Continue with Facebook
              </Clerk.Connection>
              <Clerk.Connection
                name="github"
                className={buttonVariants({ className: "w-full font-medium" })}
                disabled={isGlobalLoading}
              >
                Continue with Github
              </Clerk.Connection>
            </div>
            <CardFooter className="items-center justify-center gap-2">
              <Link href="/sign-up" className="hover:underline">
                {" "}
                Or create an account
              </Link>
            </CardFooter>
          </SignIn.Step>
        )}
      </Clerk.Loading>
    </SignIn.Root>
  );
}

export default AuthSignIn;
