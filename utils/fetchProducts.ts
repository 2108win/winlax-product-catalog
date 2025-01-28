import { Product, ResProduct } from "@/lib/interfaces";
import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_BASEROW_API_URL || "http://localhost:3000";
const baserowToken = process.env.NEXT_PUBLIC_BASEROW_TOKEN;
const idListProductsTable = process.env.NEXT_PUBLIC_BASEROW_TABLE_ID_PRODUCTS;

export async function getListProduct(
  size?: number,
  page?: number,
  order_by?: string,
  color?: string,
  category?: string,
  search?: string,
) {
  // const params = JSON.stringify({
  //   filter_type: "AND",
  //   filters: [],
  //   groups: [
  //     {
  //       filter_type: "AND",
  //       filters: [
  //         color
  //           ? {
  //               type: "link_row_has",
  //               field: "item_color",
  //               value: color ? color : "",
  //             }
  //           : {},
  //         category
  //           ? {
  //               type: "link_row_has",
  //               field: "item_category",
  //               value: category ? category : "",
  //             }
  //           : {},
  //       ],
  //       groups: [],
  //     },
  //   ],
  // });
  // const filter = new URLSearchParams(params).toString();
  const filter = `%7B%22filter_type%22%3A%22AND%22%2C%22filters%22%3A%5B%5D%2C%22groups%22%3A%5B%7B%22filter_type%22%3A%22AND%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22contains%22%2C%22field%22%3A%22item_name%22%2C%22value%22%3A%22${search ? search : ""}%22%7D%2C%7B%22type%22%3A%22link_row_has%22%2C%22field%22%3A%22item_color%22%2C%22value%22%3A%22${color ? color : ""}%22%7D%2C%7B%22type%22%3A%22link_row_has%22%2C%22field%22%3A%22item_category%22%2C%22value%22%3A%22${category ? category : ""}%22%7D%5D%2C%22groups%22%3A%5B%5D%7D%5D%7D`;

  const url = `${baseUrl}/database/rows/table/${idListProductsTable}/?user_field_names=true&size=${size}${page ? `&page=${page}` : ""}${order_by ? `&order_by=${order_by}` : ""}${color || category || search ? `&filters=${filter}` : ""}`;
  const res = await axios({
    method: "GET",
    url: url,
    headers: {
      Authorization: "Token " + baserowToken,
    },
  });
  return res.data as ResProduct;
}

export async function getOneProduct(id: string) {
  const res = await axios({
    method: "GET",
    url: `${baseUrl}/database/rows/table/${idListProductsTable}/${id}/?user_field_names=true`,
    headers: {
      Authorization: "Token " + baserowToken,
    },
  });

  return res.data as Product;
}
