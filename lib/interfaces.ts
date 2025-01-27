export interface NavList {
  name: string;
  href: string;
}

export interface Product {
  // id	item_id	item_name	item_description	item_price	item_color	item_size	item_brand	item_material	item_category	item_stock_quantity	item_release_date	item_images
  id: string;
  item_id: string;
  item_name: string;
  item_description: string;
  item_price: number;
  item_color: ItemMore[];
  item_size: ItemMore[];
  item_brand: string;
  item_material: string;
  item_category: string;
  item_stock_quantity: number;
  item_release_date: string;
  item_images: ImageProduct[];
  quantity: number;
  checked: boolean;
}

export interface ImageProduct {
  url: string;
  thumbnails: {
    tiny: {
      url: string;
      width: number | null;
      height: number | null;
    };
    small: {
      url: string;
      width: number | null;
      height: number | null;
    };
    card_cover: {
      url: string;
      width: number | null;
      height: number | null;
    };
  };
  visible_name: string;
  name: string;
  size: number;
  mime_type: string;
  is_image: true;
  image_width: number | null;
  image_height: number | null;
  uploaded_at: Date;
}

export interface User {
  id: string;
  fullName: string;
  emailAddresses: string;
  image: string;
  phoneNumbers: string;
  cart: Product[];
}
export interface ItemMore {
  id: number;
  value: string;
  order?: number;
}
