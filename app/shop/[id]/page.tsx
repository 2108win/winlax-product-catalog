import ProductDetail from "@/components/pages/Shop/ProductDetail";
import ProductImage from "@/components/pages/Shop/ProductImage";
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
          <div className="lg:col-span-2">
            <ProductDetail product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
