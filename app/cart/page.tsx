"use client";

import CartItem from "@/components/pages/cart/CartItem";
import Summary from "@/components/pages/cart/Summary";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import { useEffect, useState } from "react";

// import AuthSignIn from "@/components/auth-sign-in";
import AuthSignIn from "@/components/auth-sign-in";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SignedIn, SignedOut } from "@clerk/nextjs";
const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllChecked, setIsAllChecked] = useState(false);
  // const { user } = useUser();
  const cart = useCart();

  // useEffect(() => {
  //   if (user && cart.items.length > 0) {
  //     const body = {
  //       CusToken: user.id || "",
  //       CusName: user.fullName || "",
  //       ItemsId: cart.items.map((item) => {
  //         return {
  //           Id: item.id,
  //           Qty: item.quantity,
  //         };
  //       }),
  //     };
  //     const syncCart = async () => {
  //       const res = await addToCart(body);
  //     };
  //     syncCart();
  //   }
  // }, [user, cart.items]);

  useEffect(() => {
    setIsLoading(cart.isLoading);
  }, [cart]);

  const cartItemCheckAll = useCart((state) => {
    const allItemsChecked = state.items.every((item) => item.checked === true);
    return allItemsChecked;
  });
  useEffect(() => {
    setIsAllChecked(cartItemCheckAll);
  }, [cartItemCheckAll]);

  const removeAll = useCart((state) => state.removeAll);

  const handleCheckedAll = (checked: boolean) => {
    setIsAllChecked(checked);
    cart.items.forEach((item) => {
      cart.checkedItem(item.id, !isAllChecked);
    });
  };
  useEffect(() => {}, []);
  return (
    <div className="relative z-[5] mx-auto mb-14 flex h-full w-full max-w-7xl flex-col items-center gap-6 px-4 md:mb-16 lg:mb-20 lg:px-8">
      <h1 className="bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-3xl font-bold !leading-relaxed text-transparent dark:from-neutral-700 dark:to-neutral-100 md:text-5xl lg:text-6xl">
        Shopping Cart
      </h1>
      <SignedIn>
        {isLoading ? (
          <div className="mt-14 flex h-full w-full animate-pulse items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : cart.items.length <= 0 ? (
          <div className="mt-14 flex h-full w-full flex-col items-center gap-4">
            <div className="text-balance bg-gradient-to-l from-neutral-900 via-neutral-500 via-70% to-neutral-200 bg-clip-text text-center text-4xl font-bold !leading-normal text-transparent dark:from-neutral-50 dark:to-neutral-800 md:text-5xl lg:text-6xl">
              Your cart is empty
            </div>
            <div className="text-4xl font-bold text-neutral-500 dark:text-neutral-300">
              😢
            </div>
            {/* back to Product */}
            <div className="flex gap-2 text-3xl font-bold text-neutral-500 dark:text-neutral-300">
              <Link
                href={"/shop"}
                className={buttonVariants({
                  size: "lg",
                  className: "text-inherit",
                })}
              >
                👉 Go to shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="relative mt-6 grid w-full gap-10 lg:grid-cols-8">
              <div className="lg:col-span-5">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="all"
                      className="h-6 w-6"
                      checked={isAllChecked}
                      onCheckedChange={(isAllChecked: boolean) => {
                        handleCheckedAll(isAllChecked);
                      }}
                    />
                    <label
                      htmlFor="all"
                      className="cursor-pointer text-2xl font-bold"
                    >
                      All
                    </label>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger
                      className={buttonVariants({
                        size: "sm",
                        variant: "link",
                        className: "px-0 !text-lg hover:text-red-500",
                      })}
                    >
                      Delete all
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete all items?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            removeAll();
                          }}
                        >
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <ul className="space-y-6">
                  {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-3">
                <Summary />
              </div>
            </div>
            <div className="mt-6 flex gap-2 text-2xl font-bold text-neutral-500 dark:text-neutral-300">
              <Link
                href={"/shop"}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "mx-auto w-fit text-inherit",
                })}
              >
                👉 Continue shopping
              </Link>
            </div>
          </>
        )}
      </SignedIn>
      <SignedOut>
        <div className="z-10 grid w-full max-w-md items-center">
          <AuthSignIn className="space-y-6 rounded-lg border bg-card text-card-foreground shadow-sm" />
        </div>
      </SignedOut>
    </div>
  );
};

export default CartPage;
