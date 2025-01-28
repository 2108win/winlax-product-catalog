"use client";
import { ExternalLink, Minus, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Currency from "@/components/ui/currency";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCart from "@/hooks/useCart";
import { Product } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItemProps {
  data: Product;
  size: string;
  color: string;
}

const CartItem: React.FC<CartItemProps> = ({ data, size, color }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(true);
  const [sizeItem, setSizeItem] = useState(size);
  const [colorItem, setColorItem] = useState(color);
  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) return;
    setQuantity(Number(e.target.value));
  };
  const handleChecked = () => {
    setIsChecked(!isChecked);
    cart.checkedItem(data.id, isChecked);
  };
  useEffect(() => {
    setTotalPrice(quantity * data.item_price);
  }, [data.id, cart, quantity, data.item_price, totalPrice]);

  const onRemove = () => {
    cart.removeItem(data.id, true);
  };

  return (
    <li className="relative -mx-1 sm:-mx-0">
      <label
        htmlFor={"check" + data.id}
        className={cn(
          "relative flex cursor-pointer gap-4 rounded-lg border bg-background p-2 shadow-sm transition-all duration-300 hover:shadow-xl sm:p-4 lg:p-6",
          {
            "border-green-500 shadow-xl": data.checked,
          },
        )}
      >
        <Checkbox
          id={"check" + data.id}
          checked={data.checked}
          onCheckedChange={handleChecked}
          className="z-10 h-5 w-5"
        />
        <Button
          size="icon"
          variant="destructive"
          onClick={onRemove}
          className="absolute bottom-2 left-2 z-10 p-1 sm:bottom-auto sm:left-auto sm:right-4 sm:top-4 sm:p-2"
        >
          <Trash className="h-5 w-5" />
        </Button>
        <div className="relative w-[100px] overflow-hidden rounded-md sm:w-[150px] md:w-[250px]">
          <Image
            src={data.item_images[0]?.url || "/logo.svg"}
            alt={data.item_name}
            width={250}
            height={200}
            className="my-auto h-auto max-h-[150px] w-auto rounded-md border object-contain object-center shadow-md"
          />
        </div>
        <div className="relative flex h-auto flex-1 flex-col justify-between sm:ml-6">
          <div className="flex h-full w-full flex-col justify-between gap-4">
            <div className="group flex w-fit flex-col gap-4 sm:pr-12">
              <Link
                href={`/shop/${data.id}`}
                className="flex items-center hover:underline"
              >
                <p className="text-md line-clamp-2 font-medium sm:text-2xl">
                  {data.item_name}
                  <span className="inline-flex">
                    <ExternalLink
                      className="ml-2 opacity-0 group-hover:opacity-100"
                      size={16}
                    />
                  </span>
                </p>

                {/* {data.productName} */}
              </Link>
              <div className="flex items-center gap-2 font-bold">
                <Currency value={data.item_price} /> -
                <Select value={sizeItem} onValueChange={setSizeItem}>
                  <SelectTrigger className="h-fit w-fit min-w-fit space-x-2 px-2 py-1 text-sm font-bold">
                    <SelectValue defaultValue={size} />
                  </SelectTrigger>
                  <SelectContent>
                    {data.item_size.map((size) => (
                      <SelectItem key={size.id} value={size.id.toString()}>
                        {size.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                -
                <Select value={colorItem} onValueChange={setColorItem}>
                  <SelectTrigger className="h-fit w-fit min-w-fit space-x-2 p-2 text-sm font-medium">
                    <SelectValue defaultValue={color} />
                  </SelectTrigger>
                  <SelectContent>
                    {data.item_color.map((color) => (
                      <SelectItem key={color.id} value={color.id.toString()}>
                        <div
                          className="h-4 w-8 rounded-full"
                          style={{ backgroundColor: color.value }}
                        />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center rounded-lg border border-gray-200 p-[1px]">
                <Button
                  variant="ghost"
                  disabled={quantity === 1}
                  size="icon"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      cart.updateItem(data.id, quantity - 1);
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
                      cart.updateItem(data.id, quantity + 1);
                    }
                  }}
                >
                  <Plus size={20} />
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Currency
                  value={totalPrice}
                  className="hidden text-xl font-bold sm:block"
                />
              </div>
            </div>
          </div>
        </div>
      </label>
    </li>
  );
};

export default CartItem;
