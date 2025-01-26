"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/interfaces";
import { getListProduct } from "@/utils/fetchProducts";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
// import ProductCard from "./ProductCard";

function ShopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      const res = await getListProduct(30);
      console.log("fetchPosts ~ res:", res);
      setProducts(res);
    }
    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.item_images[0].url}
            name={product.item_name}
            price={product.item_price}
          />
        ))}
      </div>
      <Button
        variant="outline"
        size="lg"
        className="w-full max-w-60 text-lg font-medium"
      >
        Load more products
      </Button>
    </div>
  );
}

export default ShopProducts;
