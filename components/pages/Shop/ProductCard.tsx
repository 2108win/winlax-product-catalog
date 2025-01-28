import Currency from "@/components/ui/currency";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";

type ProductCardProps = {
  image: string;
  name: string;
  price: number;
  size: string;
};

export function ProductCardLoading() {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Skeleton className="aspect-square w-full rounded-md" />
      <div className="flex w-full justify-between gap-4">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-7 w-20" />
      </div>
      <Skeleton className="h-7 w-20" />
    </div>
  );
}

function ProductCard({ image, name, price, size }: ProductCardProps) {
  return (
    <Suspense
      fallback={<Skeleton className="aspect-square w-full rounded-md" />}
    >
      <div className="flex h-full w-full flex-col gap-2">
        {image ? (
          <Image
            src={image}
            alt={name}
            className="aspect-square w-full rounded-md"
            width={1000}
            height={1000}
          />
        ) : (
          <Skeleton className="aspect-square w-full rounded-md" />
        )}
        <div className="flex w-full justify-between gap-4">
          <span className="line-clamp-2 w-full text-lg font-bold">
            {name ? name : <Skeleton className="h-7 w-40" />}
          </span>
          <div className="text-lg">{size}</div>
        </div>
        <div className="mt-auto text-lg font-black">
          {price ? (
            <Currency value={price} />
          ) : (
            <Skeleton className="h-7 w-20" />
          )}
        </div>
      </div>
    </Suspense>
  );
}

export default ProductCard;
