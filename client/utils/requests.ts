import axios from "axios";
import { stringify } from "query-string";
interface RequestOptions {
  method: "get" | "post" | "put";
  headers?: HeadersInit;
  body?: BodyInit;
}

// Todo: accomodate non-JSON requests
const request = async (url: string, options: RequestOptions) => {
  const ops: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  if (options.body) {
    ops.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, ops);
  try {
    const data: any = await response.json();
    return response.ok ? data : Promise.reject(data);
  } catch (e) {
    console.log(e);
  }
};

export const get = async (url: string, params?: any) => {
  const query = params ? `?${stringify(params)}` : "";
  return request(`${url}${query}`, { method: "get" });
};

export const post = async (url: string, body?: any) => {
  // axios post
  const response = await axios.post(url, body);
  return response.data;
};
