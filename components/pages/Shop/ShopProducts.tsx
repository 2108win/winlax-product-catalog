"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/interfaces";
import { getListProduct } from "@/utils/fetchProducts";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard, { ProductCardLoading } from "./ProductCard";

type ShopProductsProps = {
  size?: number;
  page?: number;
  order_by?: string;
  color?: string;
  category?: string;
  search?: string;
};

function ShopProducts({
  size = 30,
  page = 1,
  order_by,
  color,
  category,
  search,
}: ShopProductsProps) {
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(page);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  const fetchProducts = async (currentPage: number, reset: boolean = false) => {
    setLoading(true);
    if (reset) setIsFilterLoading(true);

    try {
      const res = await getListProduct(
        size,
        currentPage,
        order_by,
        color,
        category,
        debouncedSearch,
      );

      if (reset) {
        setListProducts(res?.results || []);
      } else {
        setListProducts((prev) => [...prev, ...(res?.results || [])]);
      }

      setHasMore(!!res?.next);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      if (reset) setIsFilterLoading(false);
    }
  };

  useEffect(() => {
    setPageCount(1);
    fetchProducts(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, color, order_by, debouncedSearch]);

  const handleLoadMore = () => {
    const nextPage = pageCount + 1;
    setPageCount(nextPage);
    fetchProducts(nextPage);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {isFilterLoading && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          <ProductCardLoading />
          <ProductCardLoading />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {!isFilterLoading && listProducts.length > 0
          ? listProducts.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id}>
                <ProductCard
                  image={product.item_images?.[0]?.url || "/logo.svg"}
                  name={product.item_name}
                  price={product.item_price}
                  size={product.item_size[0]?.value}
                />
              </Link>
            ))
          : !isFilterLoading && (
              <div className="col-[none] text-center text-2xl font-bold">
                No products found
              </div>
            )}
      </div>
      {hasMore && listProducts.length > 0 && (
        <Button
          variant="outline"
          size="lg"
          className="w-full max-w-60 text-lg font-medium"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Load more products"}
        </Button>
      )}
    </div>
  );
}

export default ShopProducts;
