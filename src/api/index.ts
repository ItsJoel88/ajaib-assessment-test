import { ApiMethod } from "../types";

export function fetchApi(
  url: string = "",
  requestParams: string = "",
  method: ApiMethod = "GET"
): Promise<any> {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return fetch(BASE_URL + url + requestParams, { method })
    .then((res) => res.json())
    .then((resp) => resp)
    .catch((err) => err);
}
