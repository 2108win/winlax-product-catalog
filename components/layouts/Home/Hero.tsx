import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 py-8 text-center">
      <h1 className="text-4xl font-semibold lg:text-6xl">
        Better clothing for the planet
      </h1>
      <p>
        Create screens directly in Method or add your images from Sketch or
        Figma. You can even sync designs from your cloud storage!
      </p>
      <Link
        href="/shop"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "border-2 text-xl font-bold",
        )}
      >
        Shop all
      </Link>
      <Image
        src="/logo.svg"
        width={800}
        height={800}
        alt="LOGO_HERO"
        className="mx-auto w-full max-w-xl"
      />
    </div>
  );
}

export default Hero;
