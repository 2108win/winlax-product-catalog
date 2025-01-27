import { ProductCardAction } from "@/components/pages/Shop/ProductCardAction";
import ProductImage from "@/components/pages/Shop/ProductImage";
import Currency from "@/components/ui/currency";
import { Product } from "@/lib/interfaces";
import { getOneProduct } from "@/utils/fetchProducts";

async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product: Product = await getOneProduct(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="w-full">
        <div className="grid gap-8 lg:grid-cols-5">
          <ProductImage product={product} className="lg:col-span-3" />
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h2 className="text-3xl font-bold">{product?.item_name}</h2>
            <p className="">{product?.item_description}</p>
            <Currency
              value={product?.item_price || 0}
              className="text-2xl font-bold text-neutral-700 dark:text-neutral-300"
            />

            <ProductCardAction
              isMain={true}
              className="mt-5"
              size="lg"
              product={product}
            />
          </div>
        </div>
        {/* Assuming 'adapter' is the intended property for displaying update date */}
      </div>
    </div>
  );
}

export default ProductDetailPage;
