import { ProductCardAction } from "@/components/layouts/Shop/ProductCardAction";
import ProductImage from "@/components/layouts/Shop/ProductImage";
import Currency from "@/components/ui/currency";
import { Product } from "@/lib/interfaces";

async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product: Product = {
    //     id	item_id	item_name	item_description	item_price	item_color	item_size	item_brand	item_material	item_category	item_stock_quantity	item_release_date	item_images
    // 1	1	Sauce Tomato Pouch	Sed ante. Vivamus tortor. Duis mattis egestas metus.	$26.76 	Black,Yellow,White	XS,S,M,L,XL,XXL,3XL	Vinte	polyester	Jackets	818	10/23/2022	73ec207c18cc7b8e413d1596c7a7867b.jpg (https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/luEq0aj3msvLz7c5hipJDTu8kG78EyKq_ad496245b17a0c0f54a909532dbc99d49a0d4e71e820838523b591fa41b3942f.jpg),c06e8a7c96faf5fd6600b49512875aeb.jpg (https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/fC9eJcWxYiLsPbVcnZgksCDovylb3cWn_356e5f3a328f6e21482f580b25a91dac4b74547a3a4828c1367657adfeb51c71.jpg),bc7b5532a789b577b786ce4ce2ffe8dd.jpg (https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/b6jGqe3tNwZ9XWhEdGbMlhZTZ9ZgWDKY_868cd28ba131fd65b9052cb1865d69bbbfa5fe7a9872e60c85cd2231cc32ad5b.jpg),e2d5024290203e4482f194773fb44f44.jpg (https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/IyqgheXYhspjTxSRVCUVsUHtaxQ2jvyi_c0e759f6674ee4baaf98a0762d59fe4a5ef131b297ad32cefa4d2dadf01c2987.jpg)
    id: "1",
    item_id: "1",
    item_name: "Sauce Tomato Pouch",
    item_description: "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    item_price: 26.76,
    item_color: "Black,Yellow,White",
    item_size: "XS,S,M,L,XL,XXL,3XL",
    item_brand: "Vinte",
    item_material: "polyester",
    item_category: "Jackets",
    item_stock_quantity: 818,
    item_release_date: "10/23/2022",
    item_images: [
      {
        url: "https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/luEq0aj3msvLz7c5hipJDTu8kG78EyKq_ad496245b17a0c0f54a909532dbc99d49a0d4e71e820838523b591fa41b3942f.jpg",
        thumbnails: {
          tiny: {
            url: "https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/fC9eJcWxYiLsPbVcnZgksCDovylb3cWn_356e5f3a328f6e21482f580b25a91dac4b74547a3a4828c1367657adfeb51c71.jpg",
            width: null,
            height: null,
          },
          small: {
            url: "https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/b6jGqe3tNwZ9XWhEdGbMlhZTZ9ZgWDKY_868cd28ba131fd65b9052cb1865d69bbbfa5fe7a9872e60c85cd2231cc32ad5b.jpg",
            width: null,
            height: null,
          },
          card_cover: {
            url: "https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/IyqgheXYhspjTxSRVCUVsUHtaxQ2jvyi_c0e759f6674ee4baaf98a0762d59fe4a5ef131b297ad32cefa4d2dadf01c2987.jpg",
            width: null,
            height: null,
          },
        },
        visible_name: "73ec207c18cc7b8e413d1596c7a7867b.jpg",
        name: "73ec207c18cc7b8e413d1596c7a7867b.jpg",
        size: 0,
        mime_type: "image/jpeg",
        is_image: true,
        image_width: null,
        image_height: null,
        uploaded_at: new Date(),
      },
    ],
    quantity: 0,
    checked: false,
  };
  return (
    <div>
      ProductDetailPage {id}
      <div className="w-full">
        <div className="grid gap-8 lg:grid-cols-5">
          <ProductImage product={product} className="lg:col-span-3" />
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h2 className="text-3xl font-bold">{product.item_name}</h2>
            <p className="">{product.item_description}</p>
            <Currency
              className="text-2xl font-bold text-neutral-700 dark:text-neutral-300"
              value={product.item_price || 0}
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
