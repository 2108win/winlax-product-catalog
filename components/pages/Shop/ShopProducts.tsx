"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/interfaces";
import { getListProduct } from "@/utils/fetchProducts";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type ShopProductsProps = {
  size?: number;
  page?: number;
  order_by?: string;
  color?: string;
  category?: string;
};

function ShopProducts({
  size = 30,
  page,
  order_by,
  color,
  category,
}: ShopProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(page);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await getListProduct(
          size,
          pageCount,
          order_by,
          color,
          category,
        );
        setProducts(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchPosts();
  }, [category, color, order_by, pageCount, size]);
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {products ? (
          products.map((product) => (
            <Link href={`/shop/${product.id}`} key={product.id}>
              <ProductCard
                image={
                  product.item_images
                    ? product.item_images[0]?.url
                    : "/logo.svg"
                }
                name={product.item_name}
                price={product.item_price}
                size={product.item_size[0].value}
              />
            </Link>
          ))
        ) : (
          <div className="text-2xl font-bold">No products found</div>
        )}
      </div>
      <Button
        variant="outline"
        size="lg"
        className="w-full max-w-60 text-lg font-medium"
        onClick={() => {
          setPageCount((prev) => (prev ?? 0) + 1);
        }}
      >
        Load more products
      </Button>
    </div>
  );
}

export default ShopProducts;
