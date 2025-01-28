import { ItemMore, Order } from "@/lib/interfaces";
import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_BASEROW_API_URL || "http://localhost:3000";
const baserowToken = process.env.NEXT_PUBLIC_BASEROW_TOKEN;
const idListOrdersTable = process.env.NEXT_PUBLIC_BASEROW_TABLE_ID_ORDER;

export async function getListOrder() {
  const res = await axios({
    method: "GET",
    url: `${baseUrl}/database/rows/table/${idListOrdersTable}/?user_field_names=true`,
    headers: {
      Authorization: "Token " + baserowToken,
    },
  });
  return res.data.results as ItemMore[];
}

export async function createOrder(data: Order) {
  const res = await axios({
    method: "POST",
    url: `${baseUrl}/database/rows/table/${idListOrdersTable}/?user_field_names=true`,
    headers: {
      Authorization: "Token " + baserowToken,
      "Content-Type": "application/json",
    },
    data: data,
  });

  return res;
}
