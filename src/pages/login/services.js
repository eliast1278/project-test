import http from "../../utils/useAxios";

export async function password_login(data) {
  return await http.post("/login", data);
}
