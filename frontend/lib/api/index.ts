import createClient from "openapi-fetch";
import type {paths} from "./v1";
import {cookies} from "next/headers";

// const client = createClient<paths>({ baseUrl: process.env.API_BASE_URL, headers: { Authorization: `Bearer ${cookies().get("access_token")?.value}` } });
// export default client;

export default function initiateClient() {
  const client = createClient<paths>({
    baseUrl: process.env.API_BASE_URL,
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  return client;
}
