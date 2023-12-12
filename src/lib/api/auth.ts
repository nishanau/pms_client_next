import { getDefaultHeaders } from "../helpers";
import { LoginCredentials } from "../types";
import { API_URL } from "../variables/urls";

const AUTH_URL = new URL("auth/local/", API_URL);

export async function login(LoginCredentials: LoginCredentials) {
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: getDefaultHeaders(false),
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(LoginCredentials),
  });
  const json = await res.json();
  if (res.status === 400) throw new Error("Login fail");
  else if (!res.ok) throw new Error(res.statusText);
  return json;
}
