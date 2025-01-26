import Currency from "@/components/ui/currency";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

type ProductCardProps = {
  image: string;
  name: string;
  price: number;
};

function ProductCard({ image, name, price }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-2">
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
          Jacket werwerrwerwerwerwerwerwerwer
        </span>
        <div className="text-lg">M</div>
      </div>
      <div className="mt-auto text-lg font-black">
        {price ? <Currency value={price} /> : <Skeleton className="h-7 w-20" />}
      </div>
    </div>
  );
}

export default ProductCard;
