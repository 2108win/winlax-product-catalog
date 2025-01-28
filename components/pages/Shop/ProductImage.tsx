"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageProduct, Product } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type Props = {
  product: Product;
  className?: string;
};

function ProductImage({ product, className }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex h-[300px] md:h-[450px]">
        {product.item_images[currentImage] ? (
          <Image
            src={product.item_images[currentImage].url}
            alt={product.item_name + " - " + currentImage}
            width={1000}
            height={1000}
            priority
            className="m-auto aspect-auto h-auto max-h-full w-auto rounded-lg border object-contain object-center shadow-lg transition-all duration-300"
          />
        ) : (
          <Skeleton className="aspect-square w-full" />
        )}
      </div>
      <div className="flex w-full flex-nowrap items-center gap-4 overflow-x-auto py-4">
        {product?.item_images.map((image: ImageProduct, index: number) => (
          <Image
            key={index}
            src={image.url}
            alt={product.item_name + " - " + index}
            width={150}
            height={150}
            onClick={() => setCurrentImage(index)}
            className={cn(
              "h-[100px] w-auto cursor-pointer rounded-md border object-contain transition-all duration-300 hover:shadow-lg",
              currentImage === index
                ? "border-spacing-3 border-4 border-red-500"
                : "",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImage;
