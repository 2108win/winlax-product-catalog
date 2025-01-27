import { ItemMore } from "@/lib/interfaces";
import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_BASEROW_API_URL || "http://localhost:3000";
const baserowToken = process.env.NEXT_PUBLIC_BASEROW_TOKEN;
const idListColorsTable = process.env.NEXT_PUBLIC_BASEROW_TABLE_ID_COLORS;

export async function getListColors() {
  const res = await axios({
    method: "GET",
    url: `${baseUrl}/database/rows/table/${idListColorsTable}/?user_field_names=true`,
    headers: {
      Authorization: "Token " + baserowToken,
    },
  });
  return res.data.results as ItemMore[];
}
