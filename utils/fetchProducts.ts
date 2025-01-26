import { Product } from "@/lib/interfaces";
import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_BASEROW_API_URL || "http://localhost:3000";
const baserowToken = process.env.NEXT_PUBLIC_BASEROW_TOKEN;
const idListProductsTable = process.env.NEXT_PUBLIC_BASEROW_TABLE_ID_PRODUCTS;

export async function getListProduct(
  size?: number,
  page?: number,
  search?: string,
  order_by?: string,
) {
  const res = await axios({
    method: "GET",
    url: `${baseUrl}/database/rows/table/${idListProductsTable}/?user_field_names=true&size=${size}&page=${page}&search=${search}&order_by=${order_by}`,
    headers: {
      Authorization: "Token " + baserowToken,
    },
  });
  console.log("res:", res);

  return res.data.results as Product[];
}

export async function getOneProduct(slug: string) {
  const res = await fetch(`${baseUrl}/Product/getOneSlug/${slug}?type=server`);

  return res.json() as Promise<Product>;
}

// export async function getImageProduct(slug: string) {
//   const data = await getOneProduct(slug);
//   return data.images[0] || "";
// }
