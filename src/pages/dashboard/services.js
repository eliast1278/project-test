import http from "../../utils/useAxios";
import { makeAuthHeader } from "../../utils/authHeader";
const opt = makeAuthHeader();
export async function get_products(productQuery) {
  return await http.get("/products", opt);
}
