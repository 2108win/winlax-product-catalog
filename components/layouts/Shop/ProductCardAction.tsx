"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/useCart";
import { Product } from "@/lib/interfaces";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import AuthModal from "@/components/modal/auth-modal";
// import useSessionUser from "@/hooks/useSession";
// import { useSession } from "@clerk/nextjs";
// import { addToCart } from "@/utils/cart";

type Props = {
  product: Product;
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
  isMain?: boolean;
};

export const ProductCardAction = ({
  product,
  size,
  className,
  isMain,
}: Props) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const cart = useCart();
  //   const { isSignedIn, isLoaded } = useSession();

  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) return;
    setQuantity(Number(e.target.value));
    cart.updateItem(product.id, Number(e.target.value));
  };

  const onAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    cart.addItem(product, quantity, () => {
      router.push("/cart");
      cart.checkedItem(product.id, true);
    });
  };

  const handleBuyNow = () => {
    if (isMain) {
      cart.addItem(product, 1);
      router.push(`/cart`);
    } else {
      router.push(`/shop/${product.id}`);
    }
  };
  return (
    <div className={className}>
      {isMain && (
        <div className="flex w-fit items-center rounded-lg border border-gray-200 p-[1px]">
          <Button
            variant="ghost"
            disabled={quantity === 1}
            size="icon"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <Minus size={20} />
          </Button>
          <Input
            value={quantity}
            onChange={onChangeQuantity}
            className="max-w-10 border-none text-center font-semibold focus:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
            min={1}
            max={100}
            step={1}
            pattern="[0-9]*"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (quantity < 100) {
                setQuantity(quantity + 1);
              }
            }}
          >
            <Plus size={20} />
          </Button>
        </div>
      )}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        {/* {isSignedIn ? ( */}
        <Button onClick={onAddToCart} size={size} className="w-full">
          Thêm vào giỏ hàng
          <ShoppingCart className="ml-4" size={20} />
        </Button>
        {/* ) : (
          <AuthModal
            trigger={
              <Button size={size} className="w-full">
                Thêm vào giỏ hàng
                <ShoppingCart className="ml-4" size={20} />
              </Button>
            }
          />
        )} */}

        {/* {isSignedIn ? ( */}
        <Button
          onClick={handleBuyNow}
          className="w-full bg-[linear-gradient(290deg,#e5e5e5,25%,#3d444e,55%,#e5e5e5)] bg-[length:200%_100%] transition-all hover:bg-[length:100%_150%] dark:bg-[linear-gradient(110deg,#000000,25%,#3d444e,55%,#000000)]"
          size={size}
          variant={"outline"}
        >
          Mua ngay
        </Button>
        {/* ) : (
          <AuthModal
            trigger={
              <Button
                className="w-full bg-[linear-gradient(290deg,#e5e5e5,25%,#3d444e,55%,#e5e5e5)] bg-[length:200%_100%] transition-all hover:bg-[length:100%_150%] dark:bg-[linear-gradient(110deg,#000000,25%,#3d444e,55%,#000000)]"
                size={size}
                variant={"outline"}
              >
                Mua ngay
              </Button>
            }
          />
        )} */}
      </div>
    </div>
  );
};
