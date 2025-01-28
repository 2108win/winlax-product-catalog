"use client";
import Currency from "@/components/ui/currency";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Product } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";
import { ProductCardAction } from "./ProductCardAction";

type ProductDetailProps = {
  product: Product;
};

function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSizes] = useState<string>();
  const listColors = product?.item_color || [];
  const listSizes = product?.item_size || [];
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">{product?.item_name}</h2>
      <Currency
        value={product?.item_price || 0}
        className="text-2xl font-bold text-neutral-700 dark:text-neutral-300"
      />
      <p className="">{product?.item_description}</p>
      <ToggleGroup
        type="single"
        variant="outline"
        className="flex-wrap justify-start gap-2"
        value={selectedColor}
        onValueChange={(value) => setSelectedColor(value)}
      >
        {listColors.map((color) => (
          <ToggleGroupItem
            key={color.id}
            value={color.id.toString()}
            className="h-8 w-fit cursor-pointer gap-0 rounded-full border-2 px-0 data-[state=on]:bg-transparent data-[state=on]:ring-2 data-[state=on]:ring-primary"
            style={{ backgroundColor: color.value }}
          >
            <X
              className={cn(
                "ml-10 mr-1 hidden !h-5 !w-5 rounded-full bg-muted text-muted-foreground",
                selectedColor === color.id.toString() && "inline-block",
              )}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup
        type="single"
        variant="outline"
        className="flex-wrap justify-start gap-2"
        value={selectedSize}
        onValueChange={(value) => setSelectedSizes(value)}
      >
        {listSizes.map((size) => (
          <ToggleGroupItem
            key={size.id}
            value={size.id.toString()}
            className="h-8 w-fit cursor-pointer gap-0 rounded-full border-2 data-[state=on]:bg-transparent data-[state=on]:ring-2 data-[state=on]:ring-primary"
          >
            {size.value}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ProductCardAction
        isMain={true}
        color={selectedColor || listColors[0]?.id.toString()}
        size={selectedSize || listSizes[0]?.id.toString()}
        product={product}
      />
    </div>
  );
}

export default ProductDetail;
