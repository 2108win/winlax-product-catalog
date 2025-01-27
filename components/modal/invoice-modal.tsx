"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";
import { Product } from "@/lib/interfaces";
import { useState } from "react";
import { toast } from "sonner";
import Currency from "../ui/currency";

const apiInvoiceUrl = process.env.NEXT_PUBLIC_SERVER_URL + "/Invoice";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  total: number;
  information: {
    name: string;
    email: string | unknown;
    phone: string | unknown;
    address: string;
    note: string;
  };
  payment: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  products,
  total,
  information: information,
  payment,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const cart = useCart();

  const onConfirm = async () => {
    const body = {
      ProductIds: products.map(() => {
        return {
          //   Id: item.id,
          //   ProductName: item.productName,
          //   Brand: item.brand,
          //   Model: item.model,
          //   Count: item.quantity,
          //   Price: item.price.toString(),
        };
      }),
      LocaltionUser: information.address,
      PhoneNumber: information.phone,
      // email: information.email,
      UserName: information.name,
      Note: information.note || "(non)",
      TotalPrice: total.toString(),
    };
    const res = await fetch(`${apiInvoiceUrl}/addInvoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      isOpen = false;
      const hasToast = false;
      for (const item of products) {
        cart.removeItem(item.id, hasToast);
      }
      toast.success("Order completely.", {
        description: "Have good day!!!",
      });
    } else {
      const response = await res.json();
      toast.error(`Status: ${res.status}`, {
        description: response.title,
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Ecommerce</DialogTitle>
          <DialogDescription>Invoice.</DialogDescription>
        </DialogHeader>
        <Card className="max-h-full">
          <ScrollArea className="h-[50dvh]">
            <CardHeader className="p-4">
              <CardTitle>Information delivery:</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="grid lg:grid-cols-3">
                <p className="col-span-1">Customer name: </p>
                <span className="col-span-2 text-wrap font-bold">
                  {information.name}
                </span>
              </div>
              <div className="grid lg:grid-cols-3">
                <p className="col-span-1">Email: </p>
                <span className="col-span-2 text-wrap font-bold">
                  {typeof information.email === "string"
                    ? information.email
                    : ""}
                </span>
              </div>
              <div className="grid lg:grid-cols-3">
                <p className="col-span-1">Phone number: </p>
                <span className="col-span-2 text-wrap font-bold">
                  {typeof information.phone === "string"
                    ? information.phone
                    : ""}
                </span>
              </div>
              <div className="grid lg:grid-cols-3">
                <p className="col-span-1">Address: </p>
                <span className="col-span-2 text-wrap font-bold">
                  {information.address}
                </span>
              </div>
            </CardContent>
            <CardHeader className="p-4">
              <CardTitle>
                Information:(
                {products.reduce((acc, item) => acc + item.quantity, 0)})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-4">
              {products.map((product) => (
                <div key={product.id}>
                  <div className="flex flex-wrap items-center justify-between">
                    <p className="col-span-1">{product.item_name}</p>
                    <div className="col-span-1 ml-auto flex gap-2">
                      {product.quantity} x{" "}
                      <Currency value={product.item_price} />
                    </div>
                  </div>
                  <Separator className="mt-2" />
                </div>
              ))}
              <div className="grid grid-cols-2">
                <p className="col-span-1 font-bold">Sum:</p>
                <div className="col-span-1 ml-auto">{total}</div>
              </div>
              <p className="font-bold">Payment method: {payment}</p>
            </CardContent>
            <CardFooter className="p-4">
              <div className="grid grid-cols-3">
                <p className="col-span-1">Note: </p>
                <span className="col-span-2 italic">
                  {information.note || "(non)"}
                </span>
              </div>
            </CardFooter>
          </ScrollArea>
        </Card>
        <div className="flex flex-col gap-4">
          <div className="flex !flex-row items-center space-x-2 sm:!justify-start">
            <Input
              onChange={() => {
                if (isChecked) {
                  setIsChecked(false);
                } else {
                  setIsChecked(true);
                }
              }}
              type="checkbox"
              name="confirm"
              id="confirm"
              className="h-4 w-4"
            />
            <Label htmlFor="confirm">Confirm done!</Label>
          </div>
          <Button
            disabled={!isChecked}
            onClick={() => {
              onConfirm();
            }}
            size={"lg"}
            className="w-full text-lg"
          >
            Buy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
